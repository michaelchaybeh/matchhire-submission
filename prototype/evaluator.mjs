// Local presentation state only. No domain records, wall-clock timestamps or storage.
export function formatElapsed(milliseconds){const seconds=Math.floor(Math.max(0,milliseconds)/1000);return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,'0')).join(':');}
export function sessionClock(now){let started=now();return {text:()=>formatElapsed(now()-started),reset(){started=now();}};}
export function overflowing(scroll,desktop){return !!scroll&&desktop&&scroll.scrollHeight>scroll.clientHeight+1;}
export function mountDemoTools(root,env){
  const $=id=>root.querySelector('#'+id),clock=sessionClock(()=>env.performance.now());
  let interval=null,frame=null,card=null,observer=null,mutation=null,selectedHeight=null,drag=null,disposed=false;
  const desktop=()=>env.matchMedia('(min-width:1001px)').matches;
  const tick=()=>{$('demo-elapsed').textContent=clock.text();};
  const start=()=>{if(interval===null){tick();interval=env.setInterval(tick,1000);}};
  const stop=()=>{if(interval!==null)env.clearInterval(interval);interval=null;};
  const minimum=()=>{if(!card)return 0;const css=env.getComputedStyle(card);return Math.ceil($('participation-fixed').getBoundingClientRect().height+$('dashboard-resize-bar').getBoundingClientRect().height+parseFloat(css.paddingTop)+parseFloat(css.paddingBottom)+120);};
  function measure(){
    frame=null;if(disposed)return;const main=$('main'),scroll=$('participant-scroll'),hint=$('participation-scroll-hint');
    if(!card||!desktop()){main.style.height='';if(scroll)scroll.removeAttribute('aria-describedby');if(hint){hint.dataset.overflow='false';hint.setAttribute('aria-hidden','true');}return;}
    if(selectedHeight!==null){selectedHeight=Math.max(minimum(),selectedHeight);const height=selectedHeight+'px';if(main.style.height!==height)main.style.height=height;}else main.style.height='';
    const overflow=overflowing(scroll,true);hint.dataset.overflow=String(overflow);hint.setAttribute('aria-hidden',String(!overflow));if(overflow)scroll.setAttribute('aria-describedby','participation-scroll-hint');else scroll.removeAttribute('aria-describedby');
    const height=Math.round(card.getBoundingClientRect().height),description='Dashboard height: '+height+' pixels. '+(selectedHeight===null?'Default alignment.':'Manually adjusted.');
    if($('dashboard-height').textContent!==description)$('dashboard-height').textContent=description;
    $('dashboard-reset-height').disabled=selectedHeight===null;
  }
  function schedule(){if(!disposed&&frame===null)frame=env.requestAnimationFrame(measure);}
  function setHeight(height){if(!card||!desktop())return;selectedHeight=Math.max(minimum(),Math.round(height));measure();}
  function resetHeight(){selectedHeight=null;measure();$('dashboard-resize')?.focus({preventScroll:true});}
  function refresh(){
    const next=$('participant-dashboard');if(next!==card){observer?.disconnect();mutation?.disconnect();card=next;drag=null;$('main').style.height='';
      if(card){
        const handle=$('dashboard-resize'),scroll=$('participant-scroll');
        handle.addEventListener('pointerdown',event=>{if(event.button!==0||!desktop())return;event.preventDefault();handle.focus({preventScroll:true});drag={id:event.pointerId,y:event.clientY,height:card.getBoundingClientRect().height};handle.setPointerCapture(event.pointerId);});
        handle.addEventListener('pointermove',event=>{if(drag&&event.pointerId===drag.id)setHeight(drag.height+event.clientY-drag.y);});
        const end=event=>{if(drag&&event.pointerId===drag.id){if(handle.hasPointerCapture(event.pointerId))handle.releasePointerCapture(event.pointerId);drag=null;}};
        handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);handle.addEventListener('lostpointercapture',()=>{drag=null;});
        handle.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey)return;if(['ArrowDown','ArrowUp','Home'].includes(event.key)){event.preventDefault();if(event.key==='Home')resetHeight();else setHeight(card.getBoundingClientRect().height+(event.key==='ArrowDown'?40:-40));}});
        handle.addEventListener('click',event=>{if(event.detail===0)setHeight(card.getBoundingClientRect().height+40);});
        $('dashboard-reset-height').addEventListener('click',resetHeight);
        if(env.ResizeObserver){observer=new env.ResizeObserver(schedule);for(const node of [card,scroll,$('participation-fixed'),$('dashboard-resize-bar'),$('demo-companion'),...root.querySelectorAll('#participant-scroll>section')])observer.observe(node);}
        if(env.MutationObserver){mutation=new env.MutationObserver(schedule);mutation.observe(scroll,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['open']});}
      }
    }
    schedule();
  }
  function reset(){clock.reset();tick();selectedHeight=null;drag=null;refresh();}
  function destroy(){disposed=true;stop();if(frame!==null)env.cancelAnimationFrame(frame);frame=null;observer?.disconnect();mutation?.disconnect();env.removeEventListener('resize',schedule);env.removeEventListener('pagehide',stop);env.removeEventListener('pageshow',start);$('main').removeEventListener('toggle',schedule,true);}
  env.addEventListener('resize',schedule);env.addEventListener('pagehide',stop);env.addEventListener('pageshow',start);$('main').addEventListener('toggle',schedule,true);start();
  return {refresh,reset,resetHeight,destroy};
}
