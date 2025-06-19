"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[554],{554:(e,r,s)=>{s.r(r),s.d(r,{default:()=>E});var n=s(43),t=s(216),i=s(464),a=s(997),o=s(526),d=s(59),l=s(367),c=s(372),p=s(579);const h=(0,i.Ay)(a.Z_)`
  min-height: 70vh;
`,x=i.Ay.div`
  margin-bottom: var(--spacing-xl);
`,m=(0,i.Ay)(a.Wk)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  
  svg {
    margin-right: var(--spacing-xs);
  }
`,g=i.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,v=i.Ay.h3`
  font-size: 1.2rem;
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-color);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--spacing-sm);
  }
`,y=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`,j=i.Ay.div`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm);
  background-color: var(--background-light);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.selected {
    background-color: rgba(255, 159, 13, 0.15);
    border: 1px solid var(--primary-color);
  }
  
  input {
    margin-right: var(--spacing-sm);
  }
  
  label {
    cursor: pointer;
    width: 100%;
  }
`,u=i.Ay.div`
  background-color: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,f=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  
  &:last-child {
    margin-bottom: 0;
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`,w=i.Ay.span`
  font-size: 0.95rem;
  color: var(--text-secondary);
`,b=i.Ay.span`
  font-weight: 600;
  color: var(--text-color);
`,k=(0,i.Ay)(w)`
  font-size: 1.1rem;
  color: var(--text-color);
`,A=(0,i.Ay)(b)`
  font-size: 1.2rem;
  color: var(--primary-color);
`,C=i.Ay.div`
  margin-top: var(--spacing-md);
`,z=i.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`,_=i.Ay.span`
  font-size: 0.95rem;
  color: var(--text-color);
`,L=i.Ay.span`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-left: var(--spacing-sm);
`,B=i.Ay.span`
  font-weight: 600;
  color: var(--text-color);
`,F=(0,i.Ay)(a.$n)`
  width: 100%;
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
`,M=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`,S=i.Ay.div`
  display: flex;
  flex-direction: column;
`,U=(0,i.Ay)(a.pd)`
  width: 100%;
`,E=()=>{const{cart:e,placeOrder:r,deliveryMethod:s,setDeliveryMethod:i,userAddress:E,updateUserAddress:J}=(0,l.Us)(),W=(0,t.Zp)(),{showBackButton:$,hideBackButton:q,setBackButtonCallback:D}=(0,c.A)(),[H,N]=(0,n.useState)({name:"",phone:"",address:"",city:"",floor:"",apartment:""}),[V,Z]=(0,n.useState)({name:"",phone:"",address:"",city:"",floor:"",apartment:""});(0,n.useEffect)((()=>($(),D((()=>{W("/cart")})),()=>{q()})),[q,W,D,$]),(0,n.useEffect)((()=>{if(E){const e=E.address?E.address.split(","):[""];let r=e[0]||"",s="",n="";e.forEach((e=>{const r=e.trim().toLowerCase();r.includes("\u044d\u0442\u0430\u0436")?s=r.replace(/[^\d]/g,""):r.includes("\u043a\u0432")&&(n=r.replace(/[^\d]/g,""))})),N({name:E.name||"",phone:E.phone||"",address:r,city:E.city||"",floor:s,apartment:n})}}),[E]);const O="delivery"===s?150:0,Y=e.reduce(((e,r)=>e+r.price*r.quantity),0),G=Y+O,I=e=>{const{name:r,value:s}=e.target;N({...H,[r]:s}),Z({...V,[r]:""})},K=e=>{i(e)};return(0,p.jsx)(h,{children:(0,p.jsxs)(a.mc,{children:[(0,p.jsx)(o.A,{}),(0,p.jsx)(d.A,{}),(0,p.jsx)(a.DF,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(m,{children:(0,p.jsxs)("div",{children:[(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),(0,p.jsx)("polyline",{points:"9 22 9 12 15 12 15 22"})]}),"\u041e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u0430"]})}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,p.jsx)("circle",{cx:"12",cy:"7",r:"4"})]}),"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f"]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.JU,{children:"\u0418\u043c\u044f*"}),(0,p.jsx)(a.pd,{type:"text",name:"name",value:H.name,onChange:I,placeholder:"\u0418\u0432\u0430\u043d \u0418\u0432\u0430\u043d\u043e\u0432",error:V.name}),V.name&&(0,p.jsx)("span",{style:{color:"#F44336",fontSize:"0.85rem"},children:V.name})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.JU,{children:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d*"}),(0,p.jsx)(a.pd,{type:"tel",name:"phone",value:H.phone,onChange:I,placeholder:"+7 (___) ___-__-__",error:V.phone}),V.phone&&(0,p.jsx)("span",{style:{color:"#F44336",fontSize:"0.85rem"},children:V.phone})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2",ry:"2"}),(0,p.jsx)("path",{d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"})]}),"\u0421\u043f\u043e\u0441\u043e\u0431 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f"]}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(j,{className:"delivery"===s?"selected":"",children:[(0,p.jsx)("input",{type:"radio",id:"delivery",name:"deliveryMethod",checked:"delivery"===s,onChange:()=>K("delivery")}),(0,p.jsx)("label",{htmlFor:"delivery",children:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430"})]}),(0,p.jsxs)(j,{className:"pickup"===s?"selected":"",children:[(0,p.jsx)("input",{type:"radio",id:"pickup",name:"deliveryMethod",checked:"pickup"===s,onChange:()=>K("pickup")}),(0,p.jsx)("label",{htmlFor:"pickup",children:"\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437"})]})]}),"delivery"===s&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.JU,{children:"\u0413\u043e\u0440\u043e\u0434*"}),(0,p.jsx)(a.pd,{type:"text",name:"city",value:H.city,onChange:I,placeholder:"\u041c\u043e\u0441\u043a\u0432\u0430",error:V.city}),V.city&&(0,p.jsx)("span",{style:{color:"#F44336",fontSize:"0.85rem"},children:V.city})]}),(0,p.jsxs)(M,{children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(a.JU,{children:"\u0410\u0434\u0440\u0435\u0441*"}),(0,p.jsx)(U,{type:"text",name:"address",value:H.address,onChange:I,placeholder:"\u0443\u043b. \u041f\u0443\u0448\u043a\u0438\u043d\u0430, \u0434. 10",error:V.address}),V.address&&(0,p.jsx)("span",{style:{color:"#F44336",fontSize:"0.85rem"},children:V.address})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(a.JU,{children:"\u042d\u0442\u0430\u0436"}),(0,p.jsx)(U,{type:"text",name:"floor",value:H.floor,onChange:I,placeholder:"2",error:V.floor}),V.floor&&(0,p.jsx)("span",{style:{color:"#F44336",fontSize:"0.85rem"},children:V.floor})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(a.JU,{children:"\u041a\u0432\u0430\u0440\u0442\u0438\u0440\u0430"}),(0,p.jsx)(U,{type:"text",name:"apartment",value:H.apartment,onChange:I,placeholder:"42",error:V.apartment}),V.apartment&&(0,p.jsx)("span",{style:{color:"#F44336",fontSize:"0.85rem"},children:V.apartment})]})]})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}),(0,p.jsx)("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),(0,p.jsx)("path",{d:"M16 10a4 4 0 0 1-8 0"})]}),"\u0412\u0430\u0448 \u0437\u0430\u043a\u0430\u0437"]}),(0,p.jsx)(C,{children:e.map((e=>(0,p.jsxs)(z,{children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(_,{children:e.name}),(0,p.jsxs)(L,{children:["x",e.quantity]})]}),(0,p.jsxs)(B,{children:["\u20bd",e.price*e.quantity]})]},e.id)))}),(0,p.jsxs)(f,{children:[(0,p.jsx)(w,{children:"\u041f\u043e\u0434\u044b\u0442\u043e\u0433"}),(0,p.jsxs)(b,{children:["\u20bd",Y]})]}),(0,p.jsxs)(f,{children:[(0,p.jsx)(w,{children:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430"}),(0,p.jsxs)(b,{children:["\u20bd",O]})]}),(0,p.jsxs)(f,{children:[(0,p.jsx)(k,{children:"\u0418\u0442\u043e\u0433\u043e"}),(0,p.jsxs)(A,{children:["\u20bd",G]})]}),(0,p.jsxs)(F,{onClick:()=>{if((()=>{const e={name:"",phone:"",address:"",city:"",floor:"",apartment:""};let r=!0;return H.name.trim()||(e.name="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f",r=!1),H.phone.trim()||(e.phone="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",r=!1),"delivery"===s&&(H.city.trim()||(e.city="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0433\u043e\u0440\u043e\u0434",r=!1),H.address.trim()||(e.address="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441",r=!1),H.floor&&!/^\d+$/.test(H.floor)&&(e.floor="\u042d\u0442\u0430\u0436 \u0434\u043e\u043b\u0436\u0435\u043d \u0431\u044b\u0442\u044c \u0447\u0438\u0441\u043b\u043e\u043c",r=!1),H.apartment&&!/^\d+$/.test(H.apartment)&&(e.apartment="\u041a\u0432\u0430\u0440\u0442\u0438\u0440\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u0447\u0438\u0441\u043b\u043e\u043c",r=!1)),Z(e),r})()){let e=H.address.trim();H.floor&&(e+=`, \u044d\u0442\u0430\u0436 ${H.floor}`),H.apartment&&(e+=`, \u043a\u0432. ${H.apartment}`),J({name:H.name,phone:H.phone,address:e,city:H.city}),r(),W("/order-success")}},children:[(0,p.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,p.jsx)("polyline",{points:"20 6 9 17 4 12"})}),"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437"]})]})]})})]})})}}}]);
//# sourceMappingURL=554.3d687241.chunk.js.map