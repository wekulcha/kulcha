"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[244],{244:(r,e,n)=>{n.r(e),n.d(e,{default:()=>D});var i=n(43),s=n(216),t=n(464),o=n(997),a=n(526),l=n(59),c=n(343),d=n(367),h=n(372),x=n(579);const g=(0,t.Ay)(o.Z_)`
  min-height: 70vh;
`,p=t.Ay.div`
  margin-bottom: var(--spacing-xl);
`,v=(0,t.Ay)(o.Wk)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  
  svg {
    margin-right: var(--spacing-xs);
  }
`,m=t.Ay.div`
  display: flex;
  align-items: center;
`,u=t.Ay.button`
  background-color: transparent;
  color: #F44336;
  border: 1px solid #F44336;
  padding: 8px 12px;
  border-radius: var(--border-radius-sm);
  font-size: 0.95rem;
  font-weight: 500;
  margin-left: var(--spacing-md);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: #F44336;
    color: white;
    transform: translateY(-2px);
  }
`,j=t.Ay.div`
  margin-bottom: var(--spacing-xl);
`,y=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`,w=t.Ay.div`
  flex: 1;
`,k=t.Ay.h3`
  font-size: 1.1rem;
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-color);
`,b=t.Ay.div`
  font-weight: 600;
  color: var(--primary-color);
`,f=t.Ay.div`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  margin-left: var(--spacing-md);
`,A=t.Ay.button`
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-light);
  }
  
  &:disabled {
    background-color: var(--primary-dark);
    opacity: 0.6;
    cursor: not-allowed;
  }
`,C=t.Ay.span`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg);
  color: var(--text-color);
  font-weight: 600;
  font-size: 1.1rem;
`,L=t.Ay.div`
  display: flex;
  align-items: center;
`,B=t.Ay.button`
  background-color: #F44336;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-md);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #D32F2F;
    transform: scale(1.05);
  }
`,F=t.Ay.div`
  background-color: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,z=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  
  &:last-child {
    margin-bottom: 0;
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`,W=t.Ay.span`
  font-size: 0.95rem;
  color: var(--text-secondary);
`,q=t.Ay.span`
  font-weight: 600;
  color: var(--text-color);
`,H=(0,t.Ay)(W)`
  font-size: 1.1rem;
  color: var(--text-color);
`,M=(0,t.Ay)(q)`
  font-size: 1.2rem;
  color: var(--primary-color);
`,V=(0,t.Ay)(o.$n)`
  width: 100%;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: var(--spacing-sm);
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`,D=()=>{const{cart:r,updateCartItemQuantity:e,removeFromCart:n,clearCart:t}=(0,d.Us)(),D=(0,s.Zp)(),{showBackButton:Y,hideBackButton:_,setBackButtonCallback:I}=(0,h.A)();(0,i.useEffect)((()=>(Y(),I((()=>{D(-1)})),()=>{_()})),[_,D,I,Y]);const Z=r.reduce(((r,e)=>r+e.price*e.quantity),0),$=Z+150;return(0,x.jsx)(g,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsx)(a.A,{}),(0,x.jsx)(l.A,{}),(0,x.jsx)(o.DF,{children:(0,x.jsxs)(p,{children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)("div",{children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("circle",{cx:"9",cy:"21",r:"1"}),(0,x.jsx)("circle",{cx:"20",cy:"21",r:"1"}),(0,x.jsx)("path",{d:"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"})]}),"\u041a\u043e\u0440\u0437\u0438\u043d\u0430"]}),r.length>0&&(0,x.jsxs)(m,{children:[(0,x.jsxs)("span",{style:{fontSize:"1.1rem"},children:[r.length," ",1===r.length?"\u0442\u043e\u0432\u0430\u0440":r.length>=2&&r.length<=4?"\u0442\u043e\u0432\u0430\u0440\u0430":"\u0442\u043e\u0432\u0430\u0440\u043e\u0432"]}),(0,x.jsxs)(u,{onClick:t,children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("polyline",{points:"3 6 5 6 21 6"}),(0,x.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]}),"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043a\u043e\u0440\u0437\u0438\u043d\u0443"]})]})]}),0===r.length?(0,x.jsxs)(o.pp,{children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("circle",{cx:"9",cy:"21",r:"1"}),(0,x.jsx)("circle",{cx:"20",cy:"21",r:"1"}),(0,x.jsx)("path",{d:"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"})]}),(0,x.jsx)("h3",{children:"\u0412\u0430\u0448\u0430 \u043a\u043e\u0440\u0437\u0438\u043d\u0430 \u043f\u0443\u0441\u0442\u0430"}),(0,x.jsx)("p",{children:"\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0432\u043a\u0443\u0441\u043d\u044b\u0435 \u0431\u043b\u044e\u0434\u0430 \u0432 \u043a\u043e\u0440\u0437\u0438\u043d\u0443 \u0438 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435\u0441\u044c!"}),(0,x.jsx)(o.$n,{onClick:()=>D("/home"),children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043c\u0435\u043d\u044e"})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j,{children:r.map((r=>(0,x.jsxs)(y,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:r.name}),(0,x.jsxs)(b,{children:["\u20bd",r.price]})]}),(0,x.jsxs)(L,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(A,{onClick:()=>{return i=r.id,void((s=r.quantity)>1?e(i,s-1):n(i));var i,s},"aria-label":"Decrease quantity",children:(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,x.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"})})}),(0,x.jsx)(C,{children:r.quantity}),(0,x.jsx)(A,{onClick:()=>{return n=r.id,i=r.quantity,void e(n,i+1);var n,i},"aria-label":"Increase quantity",children:(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),(0,x.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})})]}),(0,x.jsx)(B,{onClick:()=>n(r.id),"aria-label":"Remove item",children:(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("polyline",{points:"3 6 5 6 21 6"}),(0,x.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},r.id)))}),(0,x.jsxs)(F,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(W,{children:"\u041f\u043e\u0434\u044b\u0442\u043e\u0433"}),(0,x.jsxs)(q,{children:["\u20bd",Z]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(W,{children:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430"}),(0,x.jsxs)(q,{children:["\u20bd",150]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(H,{children:"\u0418\u0442\u043e\u0433\u043e"}),(0,x.jsxs)(M,{children:["\u20bd",$]})]}),(0,x.jsxs)(V,{onClick:()=>{D("/checkout")},children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,x.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u044e"]})]})]})]})}),(0,x.jsx)(c.A,{})]})})}},343:(r,e,n)=>{n.d(e,{A:()=>i});const i=()=>null}}]);
//# sourceMappingURL=244.53f578d4.chunk.js.map