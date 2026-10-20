import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as model from '../prototype/domain.mjs';
import {metrics,compare} from '../measurement/metrics.mjs';
import * as ui from '../prototype/ui.mjs';
import * as product from '../prototype/product.mjs';
import {mountDemoTools} from '../prototype/evaluator.mjs';
// A dependency-free DOM adapter runs the actual app handlers in an isolated session.
// It tests control values and generated markup; native browser behavior is checked separately.
const decode=text=>text.replace(/&(?:amp|lt|gt|quot|#39);/g,s=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[s]));
export async function lab(){
  const elements=new Map(),listeners=new Map();let focused=null,activeElement=null;
  class Element{
    constructor(id='',tag='div',attrs=''){this.nodes=[];this.connected=true;this.disabled=/\bdisabled\b/.test(attrs);this.tabIndex=['button','input','select','textarea','summary'].includes(tag)?0:-1;this.style={};this.clientHeight=200;this.scrollHeight=200;this.id=id;this.tag=tag;this.dataset={};this.listeners=new Map();this.textContent='';this.value='';this.checked=/\bchecked\b/.test(attrs);this.hidden=/\bhidden\b/.test(attrs);this.open=/\bopen\b/.test(attrs);this.children=[];this.attributes=new Map();this.html='';for(const a of attrs.matchAll(/([\w-]+)="([^"]*)"/g)){this.attributes.set(a[1],decode(a[2]));if(a[1].startsWith('data-'))this.dataset[a[1].slice(5)]=decode(a[2]);}if(tag==='input')this.value=this.attributes.get('value')||'';}
    set innerHTML(html){
      if(this.nodes.includes(activeElement))activeElement=null;for(const node of this.nodes)node.connected=false;this.nodes=[];for(const id of this.children)elements.delete(id);this.children=[];this.html=html;
      if(this.tag==='select'){const options=[...html.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/g)];const chosen=options.find(o=>/\bselected\b/.test(o[1]))||options[0];this.value=chosen?decode(chosen[1].match(/value="([^"]*)"/)?.[1]??chosen[2]):'';}
      if(this.tag==='textarea')this.value=decode(html);
      for(const match of html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/g)){
        const [whole,tag,attrs]=match,id=attrs.match(/\bid="([^"]+)"/)?.[1]||'',child=new Element(id,tag,attrs);child.parentElement=this;this.nodes.push(child);if(id){elements.set(id,child);this.children.push(id);}
        const start=match.index+whole.length,end=html.indexOf('</'+tag+'>',start);
        if(['select','textarea'].includes(tag))child.innerHTML=html.slice(start,end);
      }
    }
    get innerHTML(){return this.html;}
    addEventListener(type,fn){this.listeners.set(type,fn);}
    emit(type,event={}){this.listeners.get(type)?.({preventDefault(){},target:this,...event});}
    getBoundingClientRect(){return {height:600,width:800,top:0,bottom:600};}
    removeEventListener(type){this.listeners.delete(type);}
    setAttribute(name,value){this.attributes.set(name,value);if(name==='tabindex')this.tabIndex=Number(value);}
    removeAttribute(name){this.attributes.delete(name);}
    get isConnected(){return this.connected;}
    contains(node){return this===node||this.nodes.includes(node);}
    querySelector(selector){if(selector.startsWith('#'))return this.nodes.find(n=>n.id===selector.slice(1))||null;if(selector.startsWith('[data-action='))return this.nodes.find(n=>n.dataset.action===selector.match(/"([^"]+)"/)[1])||null;return this.nodes.find(n=>n.tag===selector)||null;}
    querySelectorAll(){return this.nodes.filter(n=>['button','input','select','textarea','summary'].includes(n.tag)||n.attributes.has('href')||n.attributes.has('tabindex'));}
    getClientRects(){return !this.connected||this.hidden||(['connect-outcome','ack-outcome'].includes(this.id)&&!elements.get('ack-scenarios')?.open)?[]:[this.getBoundingClientRect()];}
    focus(options){activeElement=this;focused={id:this.id,action:this.dataset.action,tag:this.tag,options};}
    showModal(){this.open=true;}
    close(){this.open=false;this.emit('close');}
  }
  for(const id of ['main','demo-elapsed','demo-companion','pending-review','notice','identity','profile-options','facts','event-log','raw-live','ack','certificate','certificate-content','close-certificate','print-certificate','reset','brand','mode-indicator','accounts','sponsorship','kyc','discard'])elements.set(id,new Element(id));
  const tabs=['journey','queue','dashboard','switch'].map(action=>new Element('','button','data-action="'+action+'"'));
  const document={get activeElement(){return activeElement;},querySelector:selector=>elements.get(selector.slice(1)),querySelectorAll:()=>tabs,addEventListener:(type,fn)=>listeners.set(type,fn)};
  const fixture=JSON.parse(await readFile(new URL('../data/experiment.synthetic.json',import.meta.url),'utf8'));
  const app=(await readFile(new URL('../prototype/app.js',import.meta.url),'utf8')).replace(/^import .*;\r?\n/gm,'');
  let elapsed=0;const intervals=new Map(),environmentEvents=new Map();const environment={print(){},performance:{now:()=>elapsed},setInterval:fn=>{const id={};intervals.set(id,fn);return id;},clearInterval:id=>intervals.delete(id),requestAnimationFrame:fn=>{queueMicrotask(fn);return 1;},cancelAnimationFrame(){},matchMedia:()=>({matches:true}),getComputedStyle:()=>({paddingTop:'24',paddingBottom:'24'}),addEventListener:(type,fn)=>environmentEvents.set(type,fn),removeEventListener:type=>environmentEvents.delete(type)};
  await vm.runInNewContext('(async()=>{'+app+'\n})()',{document,model,metrics,compare,...ui,product,mountDemoTools,setTimeout:callback=>{queueMicrotask(callback);return 0;},window:environment,fetch:async()=>({ok:true,json:async()=>fixture})});
  const get=id=>{assert(elements.has(id),'Missing control '+id);return elements.get(id);};
  const click=(action,id)=>listeners.get('click')({target:{closest:()=>({dataset:{action,id}})}});
  const change=(id,value)=>{get(id).value=value;get(['connect-outcome','ack-outcome'].includes(id)?'ack':'main').emit('change',{target:get(id)});};
  const submit=id=>get('main').emit('submit',{target:get(id)});
  const register=(alias='john-primary')=>{click('choose');click('register',alias);};
  const wallet=()=>{click('ack-proceed');if(get('sponsorship').open)click('without-kyc');};
  const save=(text='Who independently verifies monthly reports?',{wallet:enterWallet=true}={})=>{get('section').value='verification';get('question-text').value=text;submit('question-form');if(enterWallet&&get('ack').open)wallet();};
  return {get,click,change,submit,register,save,wallet,advance:ms=>{elapsed+=ms;for(const fn of intervals.values())fn();},intervalCount:()=>intervals.size,lifecycle:type=>environmentEvents.get(type)?.(),input:id=>get('main').emit('input',{target:get(id)}),focus:()=>focused,state:()=>JSON.parse(get('raw-live').textContent),html:()=>get('main').innerHTML,tabs};
}
export async function questionLab(alias,options){const l=await lab();l.register(alias);l.click('disclosure');l.click('question');l.save(undefined,options);return l;}
export function qualify(l){l.change('review-status','qualified');l.get('review-reason').value='specific_material_gap';l.get('review-note').value='A specific investigable reporting evidence gap.';for(const id of ['material','actionable','not-spam'])l.get(id).checked=true;l.submit('review-form');}
