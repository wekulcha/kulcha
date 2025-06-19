"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[636],{636:(e,r,i)=>{i.r(r),i.d(r,{default:()=>F});var s=i(43),n=i(216),t=i(464),o=i(997),l=i(526),d=i(59),c=i(367),a=i(372),x=i(579);const h=(0,t.Ay)(o.Z_)`
  min-height: 70vh;
`,p=t.Ay.div`
  margin-bottom: var(--spacing-xl);
`,g=(0,t.Ay)(o.Wk)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  
  svg {
    margin-right: var(--spacing-xs);
  }
`,j=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,v=t.Ay.div`
  display: inline-block;
  padding: 8px 16px;
  background-color: rgba(255, 159, 13, 0.15);
  color: var(--primary-color);
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
`,m=t.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: var(--spacing-lg) 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }
`,w=t.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
  
  &:first-child {
    align-items: flex-start;
  }
  
  &:last-child {
    align-items: flex-end;
  }
`,y=t.Ay.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${e=>e.$completed?"var(--primary-color)":e.$active?"var(--primary-dark)":"var(--background-light)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-xs);
  transition: all 0.3s ease;
  border: 2px solid ${e=>e.$completed||e.$active?"var(--primary-color)":"transparent"};
  
  svg {
    color: ${e=>e.$completed?"white":e.$active?"var(--primary-color)":"var(--text-secondary)"};
  }
`,u=t.Ay.span`
  font-size: 0.8rem;
  color: ${e=>e.$completed||e.$active?"var(--primary-color)":"var(--text-secondary)"};
  font-weight: ${e=>e.$completed||e.$active?"600":"400"};
  text-align: center;
  max-width: 100px;
  
  @media (max-width: 600px) {
    display: none;
  }
`,k=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,f=t.Ay.h3`
  font-size: 1.2rem;
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-color);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--spacing-sm);
  }
`,b=t.Ay.div`
  display: flex;
  margin-bottom: var(--spacing-sm);
  
  &:last-child {
    margin-bottom: 0;
  }
`,$=t.Ay.span`
  font-size: 0.95rem;
  color: var(--text-secondary);
  width: 40%;
`,A=t.Ay.span`
  font-size: 0.95rem;
  color: var(--text-color);
  font-weight: 500;
`,L=t.Ay.div`
  margin-top: var(--spacing-md);
`,C=t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`,B=t.Ay.span`
  font-size: 0.95rem;
  color: var(--text-color);
`,z=t.Ay.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-left: var(--spacing-xs);
`,W=t.Ay.span`
  font-weight: 600;
  color: var(--text-color);
`,M=t.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,V=t.Ay.span`
  font-size: 1.1rem;
  color: var(--text-color);
  font-weight: 500;
`,H=t.Ay.span`
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: 600;
`,D=(0,t.Ay)(o.$n)`
  padding: var(--spacing-md);
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: var(--spacing-sm);
  }
  
  &:hover {
    background-color: rgba(255, 159, 13, 0.1);
    transform: translateY(-2px);
  }
`,F=()=>{const{orderHistory:e}=(0,c.Us)(),r=(0,n.Zp)(),{orderId:i}=(0,n.g)(),{showBackButton:t,hideBackButton:F,setBackButtonCallback:T}=(0,a.A)(),_=e.find((e=>e.id.toString()===i));(0,s.useEffect)((()=>(t(),T((()=>{r("/profile")})),()=>{F()})),[F,r,T,t]);const q=(e,r)=>e<=r,I=(e,r)=>e===r;if(!_)return(0,x.jsxs)(o.mc,{children:[(0,x.jsx)(l.A,{}),(0,x.jsx)(d.A,{}),(0,x.jsx)(o.DF,{children:(0,x.jsxs)(o.pp,{children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),(0,x.jsx)("polyline",{points:"14 2 14 8 20 8"}),(0,x.jsx)("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),(0,x.jsx)("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),(0,x.jsx)("polyline",{points:"10 9 9 9 8 9"})]}),(0,x.jsx)("h3",{children:"\u0417\u0430\u043a\u0430\u0437 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d"}),(0,x.jsx)("p",{children:"\u0417\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u043c\u044b\u0439 \u0437\u0430\u043a\u0430\u0437 \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043b\u0438 \u0431\u044b\u043b \u0443\u0434\u0430\u043b\u0435\u043d."}),(0,x.jsx)(o.$n,{onClick:()=>r("/profile"),children:"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u0437\u0430\u043a\u0430\u0437\u043e\u0432"})]})})]});const U=(Z=_.status,["new","confirmed","preparing","ready","delivered"].indexOf(Z));var Z;return(0,x.jsx)(h,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsx)(l.A,{}),(0,x.jsx)(d.A,{}),(0,x.jsx)(o.DF,{children:(0,x.jsxs)(p,{children:[(0,x.jsx)(g,{children:(0,x.jsxs)("div",{children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),(0,x.jsx)("polyline",{points:"14 2 14 8 20 8"}),(0,x.jsx)("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),(0,x.jsx)("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),(0,x.jsx)("polyline",{points:"10 9 9 9 8 9"})]}),"\u0417\u0430\u043a\u0430\u0437 \u2116",_.id]})}),(0,x.jsxs)(j,{children:[(0,x.jsx)(v,{children:(e=>{switch(e){case"new":return"\u041e\u0436\u0438\u0434\u0430\u0435\u0442 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f";case"confirmed":return"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d";case"preparing":return"\u0413\u043e\u0442\u043e\u0432\u0438\u0442\u0441\u044f";case"ready":return"\u0413\u043e\u0442\u043e\u0432 \u043a \u0432\u044b\u0434\u0430\u0447\u0435";case"delivered":return"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d";default:return"\u0412 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435"}})(_.status)}),(0,x.jsxs)(m,{children:[(0,x.jsxs)(w,{$active:I(0,U),$completed:q(0,U),children:[(0,x.jsx)(y,{$active:I(0,U),$completed:q(0,U),children:q(0,U)?(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,x.jsx)("polyline",{points:"20 6 9 17 4 12"})}):(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,x.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}),(0,x.jsx)(u,{$active:I(0,U),$completed:q(0,U),children:"\u041e\u0436\u0438\u0434\u0430\u0435\u0442 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f"})]}),(0,x.jsxs)(w,{$active:I(1,U),$completed:q(1,U),children:[(0,x.jsx)(y,{$active:I(1,U),$completed:q(1,U),children:q(1,U)?(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,x.jsx)("polyline",{points:"20 6 9 17 4 12"})}):(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,x.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),(0,x.jsx)(u,{$active:I(1,U),$completed:q(1,U),children:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d"})]}),(0,x.jsxs)(w,{$active:I(2,U),$completed:q(2,U),children:[(0,x.jsx)(y,{$active:I(2,U),$completed:q(2,U),children:q(2,U)?(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,x.jsx)("polyline",{points:"20 6 9 17 4 12"})}):(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,x.jsx)("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})})}),(0,x.jsx)(u,{$active:I(2,U),$completed:q(2,U),children:"\u0413\u043e\u0442\u043e\u0432\u0438\u0442\u0441\u044f"})]}),(0,x.jsxs)(w,{$active:I(3,U),$completed:q(3,U),children:[(0,x.jsx)(y,{$active:I(3,U),$completed:q(3,U),children:q(3,U)?(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,x.jsx)("polyline",{points:"20 6 9 17 4 12"})}):(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("polyline",{points:"20 12 20 22 4 22 4 12"}),(0,x.jsx)("rect",{x:"2",y:"7",width:"20",height:"5"}),(0,x.jsx)("line",{x1:"12",y1:"22",x2:"12",y2:"7"}),(0,x.jsx)("path",{d:"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"}),(0,x.jsx)("path",{d:"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"})]})}),(0,x.jsx)(u,{$active:I(3,U),$completed:q(3,U),children:"\u0413\u043e\u0442\u043e\u0432 \u043a \u0432\u044b\u0434\u0430\u0447\u0435"})]}),(0,x.jsxs)(w,{$active:I(4,U),$completed:q(4,U),children:[(0,x.jsx)(y,{$active:I(4,U),$completed:q(4,U),children:q(4,U)?(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,x.jsx)("polyline",{points:"20 6 9 17 4 12"})}):(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),(0,x.jsx)("line",{x1:"3",y1:"9",x2:"21",y2:"9"}),(0,x.jsx)("line",{x1:"9",y1:"21",x2:"9",y2:"9"})]})}),(0,x.jsx)(u,{$active:I(4,U),$completed:q(4,U),children:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d"})]})]})]}),(0,x.jsxs)(k,{children:[(0,x.jsxs)(f,{children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),(0,x.jsx)("polyline",{points:"14 2 14 8 20 8"}),(0,x.jsx)("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),(0,x.jsx)("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),(0,x.jsx)("polyline",{points:"10 9 9 9 8 9"})]}),"\u0414\u0435\u0442\u0430\u043b\u0438 \u0437\u0430\u043a\u0430\u0437\u0430"]}),(0,x.jsxs)(b,{children:[(0,x.jsx)($,{children:"\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043a\u0430\u0437\u0430:"}),(0,x.jsxs)(A,{children:["#",_.id]})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)($,{children:"\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043c\u044f:"}),(0,x.jsx)(A,{children:(e=>{const r=new Date(e);return new Intl.DateTimeFormat("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(r)})(_.date)})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)($,{children:"\u0421\u043f\u043e\u0441\u043e\u0431 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f:"}),(0,x.jsx)(A,{children:"delivery"===_.deliveryMethod?"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430":"\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437"})]}),"delivery"===_.deliveryMethod&&_.userAddress&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(f,{style:{marginTop:"var(--spacing-md)"},children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,x.jsx)("circle",{cx:"12",cy:"10",r:"3"})]}),"\u0410\u0434\u0440\u0435\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"]}),(0,x.jsxs)(b,{children:[(0,x.jsx)($,{children:"\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c:"}),(0,x.jsx)(A,{children:_.userAddress.name})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)($,{children:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d:"}),(0,x.jsx)(A,{children:_.userAddress.phone})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)($,{children:"\u0413\u043e\u0440\u043e\u0434:"}),(0,x.jsx)(A,{children:_.userAddress.city})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)($,{children:"\u0410\u0434\u0440\u0435\u0441:"}),(0,x.jsx)(A,{children:_.userAddress.address})]})]}),(0,x.jsxs)(f,{style:{marginTop:"var(--spacing-lg)"},children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}),(0,x.jsx)("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),(0,x.jsx)("path",{d:"M16 10a4 4 0 0 1-8 0"})]}),"\u0421\u043e\u0441\u0442\u0430\u0432 \u0437\u0430\u043a\u0430\u0437\u0430"]}),(0,x.jsx)(L,{children:_.items.map(((e,r)=>(0,x.jsxs)(C,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(B,{children:e.name}),(0,x.jsxs)(z,{children:["x",e.quantity]})]}),(0,x.jsxs)(W,{children:["\u20bd",e.price*e.quantity]})]},r)))}),(0,x.jsxs)(M,{children:[(0,x.jsx)(V,{children:"\u0418\u0442\u043e\u0433\u043e:"}),(0,x.jsxs)(H,{children:["\u20bd",_.totalAmount]})]})]}),(0,x.jsxs)(D,{onClick:()=>r("/profile"),children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("line",{x1:"19",y1:"12",x2:"5",y2:"12"}),(0,x.jsx)("polyline",{points:"12 19 5 12 12 5"})]}),"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u0437\u0430\u043a\u0430\u0437\u043e\u0432"]})]})})]})})}}}]);
//# sourceMappingURL=636.d5a580ce.chunk.js.map