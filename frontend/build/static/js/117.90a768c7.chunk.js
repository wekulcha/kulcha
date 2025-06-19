"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[117],{117:(e,r,s)=>{s.r(r),s.d(r,{default:()=>b});var n=s(43),i=s(216),t=s(997),a=s(526),d=s(59),o=s(343),c=s(367),l=s(372),h=s(464),p=s(579);const g=(0,h.Ay)(t.Z_)`
  min-height: 70vh;
`,x=(0,h.Ay)(t.jt)`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--background-color);
  padding: var(--spacing-sm) 0;
  margin-bottom: var(--spacing-lg);
`,u=(0,h.Ay)(t.m_)`
  border-radius: var(--border-radius-lg);
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  
  svg {
    margin-right: var(--spacing-xs);
  }
`,m=h.Ay.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,v=(0,h.Ay)(t.gE)`
  grid-column: span 2;
  
  @media (max-width: 600px) {
    grid-column: span 1;
  }
`,j=h.Ay.button`
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  width: 100%;
  margin-top: var(--spacing-md);
  
  &:hover {
    background-color: var(--primary-light);
  }
`,y=((0,h.Ay)(t.gO)`
  background-color: var(--card-bg);
  margin-bottom: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`,h.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`,h.Ay.span`
  font-weight: 600;
  color: var(--text-color);
`,h.Ay.span`
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${e=>{switch(e.$status){case"delivered":return"#4CAF50";case"cancelled":return"#F44336";default:return"#FF9800"}}};
  color: white;
`,h.Ay.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--spacing-sm);
`,h.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`),b=(h.Ay.span`
  color: var(--text-color);
`,h.Ay.span`
  color: var(--text-secondary);
`,h.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
`,()=>{const[e,r]=(0,n.useState)("orders"),[s,h]=(0,n.useState)(!1),b=(0,i.Zp)(),{orderHistory:w,userAddress:k,updateUserAddress:f}=(0,c.Us)(),{showBackButton:A,hideBackButton:C,setBackButtonCallback:B,hideMainButton:_}=(0,l.A)();(0,n.useEffect)((()=>(A(),_(),B((()=>{b("/")})),()=>{C()})),[C,_,b,B,A]);const F=e=>{const{name:r,value:s}=e.target;f({...k||{name:"",phone:"",address:"",city:""},[r]:s}),h(!1)},L=e=>{switch(e){case"new":return"\u041e\u0436\u0438\u0434\u0430\u0435\u0442 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f";case"confirmed":return"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d";case"preparing":return"\u0413\u043e\u0442\u043e\u0432\u0438\u0442\u0441\u044f";case"ready":return"\u0413\u043e\u0442\u043e\u0432 \u043a \u0432\u044b\u0434\u0430\u0447\u0435";case"delivered":return"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d";case"rejected":return"\u041e\u0442\u043a\u043b\u043e\u043d\u0435\u043d";default:return"\u0412 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435"}},W=e=>{switch(e){case"new":return"#FFC107";case"confirmed":return"#2196F3";case"preparing":return"#9C27B0";case"ready":return"#4CAF50";case"delivered":return"#8BC34A";case"rejected":return"#F44336";default:return"#607D8B"}};return(0,p.jsx)(g,{children:(0,p.jsxs)(t.mc,{children:[(0,p.jsx)(a.A,{}),(0,p.jsx)(d.A,{}),(0,p.jsxs)(t.DF,{children:[(0,p.jsx)(t._k,{children:"\u0412\u0430\u0448 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"}),(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{onClick:()=>r("orders"),$active:"orders"===e,children:[(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",ry:"2"}),(0,p.jsx)("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),(0,p.jsx)("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]}),"\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u043e\u0432"]}),(0,p.jsxs)(u,{onClick:()=>r("address"),$active:"address"===e,children:[(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,p.jsx)("circle",{cx:"12",cy:"10",r:"3"})]}),"\u0410\u0434\u0440\u0435\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"]})]}),"address"===e&&(0,p.jsxs)(t.WB,{children:[(0,p.jsx)(t._k,{children:"\u0410\u0434\u0440\u0435\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"}),s&&(0,p.jsxs)("div",{style:{padding:"var(--spacing-sm)",backgroundColor:"#4CAF50",color:"white",borderRadius:"var(--border-radius-sm)",marginBottom:"var(--spacing-md)",display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{marginRight:"8px"},children:[(0,p.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,p.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]}),"\u0410\u0434\u0440\u0435\u0441 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d!"]}),(0,p.jsxs)(m,{onSubmit:e=>{e.preventDefault(),h(!0)},children:[(0,p.jsxs)(t.gE,{children:[(0,p.jsx)(t.JU,{htmlFor:"name",children:"\u0418\u043c\u044f"}),(0,p.jsx)(t.pd,{type:"text",id:"name",name:"name",value:(null===k||void 0===k?void 0:k.name)||"",onChange:F,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043c\u044f",required:!0})]}),(0,p.jsxs)(t.gE,{children:[(0,p.jsx)(t.JU,{htmlFor:"phone",children:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"}),(0,p.jsx)(t.pd,{type:"tel",id:"phone",name:"phone",value:(null===k||void 0===k?void 0:k.phone)||"",onChange:F,placeholder:"+7 (___) ___-__-__",required:!0})]}),(0,p.jsxs)(t.gE,{children:[(0,p.jsx)(t.JU,{htmlFor:"city",children:"\u0413\u043e\u0440\u043e\u0434"}),(0,p.jsx)(t.pd,{type:"text",id:"city",name:"city",value:(null===k||void 0===k?void 0:k.city)||"",onChange:F,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0433\u043e\u0440\u043e\u0434\u0430"})]}),(0,p.jsxs)(t.gE,{children:[(0,p.jsx)(t.JU,{htmlFor:"address",children:"\u0410\u0434\u0440\u0435\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"}),(0,p.jsx)(t.pd,{type:"text",id:"address",name:"address",value:(null===k||void 0===k?void 0:k.address)||"",onChange:F,placeholder:"\u0423\u043b\u0438\u0446\u0430, \u0434\u043e\u043c, \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0430"})]}),(0,p.jsx)(v,{children:(0,p.jsx)(j,{type:"submit",children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0430\u0434\u0440\u0435\u0441"})})]})]}),"orders"===e&&(0,p.jsxs)(t.rd,{children:[(0,p.jsx)(t._k,{children:"\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u043e\u0432"}),0===w.length?(0,p.jsxs)(t.pp,{children:[(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("circle",{cx:"9",cy:"21",r:"1"}),(0,p.jsx)("circle",{cx:"20",cy:"21",r:"1"}),(0,p.jsx)("path",{d:"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"})]}),(0,p.jsx)("h3",{children:"\u041d\u0435\u0442 \u0437\u0430\u043a\u0430\u0437\u043e\u0432"}),(0,p.jsx)("p",{children:"\u0412\u044b \u0435\u0449\u0435 \u043d\u0435 \u0441\u0434\u0435\u043b\u0430\u043b\u0438 \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e \u0437\u0430\u043a\u0430\u0437\u0430."}),(0,p.jsx)(j,{onClick:()=>b("/"),children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043c\u0435\u043d\u044e"})]}):w.map((e=>{return(0,p.jsxs)(y,{onClick:()=>{return r=e.id,void b(`/orders/${r}`);var r},children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"var(--spacing-sm)"},children:[(0,p.jsxs)("div",{style:{fontWeight:"bold"},children:["\u0417\u0430\u043a\u0430\u0437 #",e.id]}),(0,p.jsx)("div",{style:{display:"inline-block",padding:"4px 8px",borderRadius:"12px",fontSize:"0.8rem",fontWeight:"bold",color:"white",backgroundColor:W(e.status)},children:L(e.status)})]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.9rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-sm)"},children:[(0,p.jsx)("div",{children:(r=e.date,new Date(r).toLocaleString())}),(0,p.jsx)("div",{children:"delivery"===e.deliveryMethod?"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430":"\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437"})]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"var(--spacing-sm)"},children:[(0,p.jsxs)("div",{style:{fontSize:"0.9rem"},children:[e.items.length," ",1===e.items.length?"\u0442\u043e\u0432\u0430\u0440":e.items.length>=2&&e.items.length<=4?"\u0442\u043e\u0432\u0430\u0440\u0430":"\u0442\u043e\u0432\u0430\u0440\u043e\u0432"]}),(0,p.jsxs)("div",{style:{fontWeight:"bold",color:"var(--primary-color)"},children:["\u20bd",e.totalAmount]})]})]},e.id);var r}))]})]}),(0,p.jsx)(o.A,{})]})})})},343:(e,r,s)=>{s.d(r,{A:()=>n});const n=()=>null}}]);
//# sourceMappingURL=117.90a768c7.chunk.js.map