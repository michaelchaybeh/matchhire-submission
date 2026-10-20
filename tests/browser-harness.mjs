import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as model from '../prototype/domain.mjs';
import {metrics,compare} from '../measurement/metrics.mjs';
import * as ui from '../prototype/ui.mjs';
import * as product from '../prototype/product.mjs';
// A dependency-free DOM adapter runs the actual app handlers in an isolated session.
// It tests control values and generated markup; native browser behavior is checked separately.
const decode=text=>text.replace(/&(?:amp|lt|gt|quot|#39);/g,s=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[s]));
export async function lab(){
  const elements=new Map(),listeners=new Map();let focused=null;
  class Element{
    constructor(id='',tag='div',attrs=''){this.id=id;this.tag=tag;this.dataset={};this.listeners=new Map();this.textContent='';this.value='';this.checked=/\bchecked\b/.test(attrs);this.hidden=/\bhidden\b/.test(attrs);this.open=/\bopen\b/.test(attrs);this.children=[];this.attributes=new Map();this.html='';for(const a of attrs.matchAll(/([\w-]+)="([^"]*)"/g)){this.attributes.set(a[1],decode(a[2]));if(a[1].startsWith('data-'))this.dataset[a[1].slice(5)]=decode(a[2]);}if(tag==='input')this.value=this.attributes.get('value')||'';}
    set innerHTML(html){
      for(const id of this.children)elements.delete(id);this.children=[];this.html=html;
      if(this.tag==='select'){const options=[...html.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/g)];const chosen=options.find(o=>/\bselected\b/.test(o[1]))||options[0];this.value=chosen?decode(chosen[1].match(/value="([^"]*)"/)?.[1]??chosen[2]):'';}
      if(this.tag==='textarea')this.value=decode(html);
      for(const match of html.matchAll(/<([a-z][\w-]*)\b([^>]*?\sid="([^"]+)"[^>]*)>/g)){
        const [whole,tag,attrs,id]=match,child=new Element(id,tag,attrs);elements.set(id,child);this.children.push(id);
        const start=match.index+whole.length,end=html.indexOf('</'+tag+'>',start);
        if(['select','textarea'].includes(tag))child.innerHTML=html.slice(start,end);
      }
    }
    get innerHTML(){return this.html;}
    addEventListener(type,fn){this.listeners.set(type,fn);}
    emit(type,event={}){this.listeners.get(type)?.({preventDefault(){},target:this,...event});}
    setAttribute(name,value){this.attributes.set(name,value);}
    removeAttribute(name){this.attributes.delete(name);}
    focus(options){focused={id:this.id,options};}
    showModal(){this.open=true;}
    close(){this.open=false;this.emit('close');}
  }
  for(const id of ['main','notice','identity','profile-options','facts','event-log','raw-live','ack','certificate','certificate-content','close-certificate','print-certificate','reset','brand','mode-indicator','accounts','sponsorship','kyc','discard'])elements.set(id,new Element(id));
  const tabs=['journey','queue','dashboard','switch'].map(action=>new Element('','button','data-action="'+action+'"'));
  const document={querySelector:selector=>elements.get(selector.slice(1)),querySelectorAll:()=>tabs,addEventListener:(type,fn)=>listeners.set(type,fn)};
  const fixture=JSON.parse(await readFile(new URL('../data/experiment.synthetic.json',import.meta.url),'utf8'));
  const app=(await readFile(new URL('../prototype/app.js',import.meta.url),'utf8')).replace(/^import .*;\r?\n/gm,'');
  await vm.runInNewContext('(async()=>{'+app+'\n})()',{document,model,metrics,compare,...ui,product,setTimeout:callback=>{queueMicrotask(callback);return 0;},window:{print(){}},fetch:async()=>({ok:true,json:async()=>fixture})});
  const get=id=>{assert(elements.has(id),'Missing control '+id);return elements.get(id);};
  const click=(action,id)=>listeners.get('click')({target:{closest:()=>({dataset:{action,id}})}});
  const change=(id,value)=>{get(id).value=value;get(['connect-outcome','ack-outcome'].includes(id)?'ack':'main').emit('change',{target:get(id)});};
  const submit=id=>get('main').emit('submit',{target:get(id)});
  const register=(alias='john-primary')=>{click('choose');click('register',alias);};
  const wallet=()=>{click('ack-proceed');if(get('sponsorship').open)click('without-kyc');};
  const save=(text='Who independently verifies monthly reports?',{wallet:enterWallet=true}={})=>{get('section').value='verification';get('question-text').value=text;submit('question-form');if(enterWallet&&get('ack').open)wallet();};
  return {get,click,change,submit,register,save,wallet,input:id=>get('main').emit('input',{target:get(id)}),focus:()=>focused,state:()=>JSON.parse(get('raw-live').textContent),html:()=>get('main').innerHTML,tabs};
}
export async function questionLab(alias,options){const l=await lab();l.register(alias);l.click('disclosure');l.click('question');l.save(undefined,options);return l;}
export function qualify(l){l.change('review-status','qualified');l.get('review-reason').value='specific_material_gap';l.get('review-note').value='A specific investigable reporting evidence gap.';for(const id of ['material','actionable','not-spam'])l.get(id).checked=true;l.submit('review-form');}
