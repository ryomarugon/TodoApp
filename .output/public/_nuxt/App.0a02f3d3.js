import{_ as l,k as n,l as a,m as s,f as u,t as k,F as T,z as g,A as h,v as p,x as w,y as E,q as d,B as I}from"./entry.4464f7fd.js";const b={},y=s("nav",{class:"navbar navbar-expand-lg navbar-light bg-light mb-3"},[s("a",{class:"navbar-brand mx-3",href:"/"},"ToDo")],-1),S=[y];function M(o,t,_,m,e,i){return n(),a("div",null,S)}const N=l(b,[["render",M]]),P={};function R(o,t,_,m,e,i){return n(),a("h1",null,"こんにちは")}const $=l(P,[["render",R]]),C={components:{TaskItem:$},props:{status:{type:String,required:!0}},computed:{tasks(){}}},A={class:"task-list"},B={class:"card-columns"};function D(o,t,_,m,e,i){const c=u("TaskItem");return n(),a("div",A,[s("h2",null,k(_.status),1),s("div",B,[(n(!0),a(T,null,g(i.tasks,r=>(n(),h(c,{key:r.id,task:r},null,8,["task"]))),128))])])}const v=l(C,[["render",D]]);const L={},f=o=>(w("data-v-86661eec"),o=o(),E(),o),O={class:"modal"},V={class:"modal-wrap"},H=f(()=>s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},[s("path",{d:"M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"})],-1)),U=f(()=>s("p",null,"ここを押せば閉じる",-1)),q=[H,U];function z(o,t){return n(),a("div",O,[s("div",V,[p(" // このボタンを押すとカスタムイベントcloseModalが発生 "),s("button",{onClick:t[0]||(t[0]=_=>o.$emit("closeModal"))},q)])])}const F=l(L,[["render",z],["__scopeId","data-v-86661eec"]]),G={components:{TaskList:v,Modal:F},data(){return{status:{UNSUPPORTED:"未対応",IN_PROGRESS:"処理中",IN_REVIEW:"レビュー中",COMPLETED:"完了"},show:!1}}},W={class:"container"},j={class:"row d-flex justify-content-center"},J={class:"col-sm-3"},K=s("span",{class:"text-success"},"課題の追加",-1),Q={class:"col-sm-3"},X=s("button",null,[p("+"),s("span",{class:"text-success"},"課題の追加")],-1),Y={class:"col-sm-3"},Z=s("button",null,[p("+"),s("span",{class:"text-success"},"課題の追加")],-1),ss={class:"col-sm-3"},ts=s("button",null,[p("+"),s("span",{class:"text-success"},"課題の追加")],-1);function es(o,t,_,m,e,i){const c=u("TaskList"),r=u("Modal");return n(),a("div",W,[s("div",j,[s("div",J,[s("button",{onClick:t[0]||(t[0]=x=>e.show=!0)},[p(" +"),K]),d(c,{status:e.status.UNSUPPORTED},null,8,["status"])]),s("div",Q,[X,d(c,{status:e.status.IN_PROGRESS},null,8,["status"])]),s("div",Y,[Z,d(c,{status:e.status.IN_REVIEW},null,8,["status"])]),s("div",ss,[ts,d(c,{status:e.status.COMPLETED},null,8,["status"])])]),e.show?(n(),h(r,{key:0,onCloseModal:t[1]||(t[1]=x=>e.show=!1)})):I("",!0)])}const os=l(G,[["render",es]]);const ns={components:{Header:N,TodoApp:os,TaskList:v,TaskItem:$},data(){return{}}},cs={class:"container"};function as(o,t,_,m,e,i){const c=u("Header"),r=u("TodoApp");return n(),a("div",cs,[d(c),d(r)])}const rs=l(ns,[["render",as]]);export{rs as default};
