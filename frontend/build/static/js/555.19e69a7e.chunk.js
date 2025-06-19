"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[555],{555:(r,e,n)=>{n.r(e),n.d(e,{default:()=>$});var i=n(43),t=n(216),o=n(464),s=n(997),a=n(526),l=n(59),d=n(367),c=n(372),g=n(105),x=n(579);const h=(0,o.Ay)(s.Z_)`
  min-height: 70vh;
`,p=o.Ay.div`
  margin-bottom: var(--spacing-xl);
`,m=(0,o.Ay)(s.Wk)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  
  svg {
    margin-right: var(--spacing-xs);
  }
`,v=o.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`,u=o.Ay.div`
  width: 80px;
  height: 80px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  
  svg {
    color: white;
    width: 40px;
    height: 40px;
  }
`,y=o.Ay.h2`
  font-size: 1.8rem;
  margin-bottom: var(--spacing-sm);
  color: var(--text-color);
`,j=o.Ay.div`
  display: inline-block;
  padding: 8px 16px;
  background-color: rgba(255, 159, 13, 0.15);
  color: var(--primary-color);
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: var(--spacing-lg);
`,w=o.Ay.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: var(--spacing-lg);
  line-height: 1.5;
`,f=o.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,b=o.Ay.h3`
  font-size: 1.2rem;
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-color);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--spacing-sm);
  }
`,k=o.Ay.div`
  display: flex;
  margin-bottom: var(--spacing-sm);
  
  &:last-child {
    margin-bottom: 0;
  }
`,A=o.Ay.span`
  font-size: 0.95rem;
  color: var(--text-secondary);
  width: 40%;
`,L=o.Ay.span`
  font-size: 0.95rem;
  color: var(--text-color);
  font-weight: 500;
`,z=o.Ay.div`
  margin-top: var(--spacing-md);
`,C=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`,I=o.Ay.span`
  font-size: 0.95rem;
  color: var(--text-color);
`,B=o.Ay.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-left: var(--spacing-xs);
`,W=o.Ay.span`
  font-weight: 600;
  color: var(--text-color);
`,M=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,D=o.Ay.span`
  font-size: 1.1rem;
  color: var(--text-color);
  font-weight: 500;
`,_=o.Ay.span`
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: 600;
`,E=o.Ay.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,O=(0,o.Ay)(s.$n)`
  flex: 1;
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: var(--spacing-sm);
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`,S=(0,o.Ay)(s.$n)`
  flex: 1;
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
`,$=()=>{const{orderHistory:r}=(0,d.Us)(),e=(0,t.Zp)(),{showBackButton:n,hideBackButton:o}=(0,c.A)(),$=r.length>0?r[r.length-1]:null;(0,i.useEffect)((()=>{if(o(),!$)return console.log("No order found in history, redirecting to home"),void e("/");console.log("Last order found:",$.id,"for restaurant:",$.restaurantId);return(async()=>{const r=`order_sent_${$.id}`;if(localStorage.getItem(r))console.log(`This specific order (ID: ${$.id}) was already sent to backend, skipping duplication`);else if($&&$.restaurantId){const n=$.userAddress?$.userAddress.name:"\u0413\u043e\u0441\u0442\u044c";try{console.log("Syncing order with admin panel, creating in backend...");const e=await(0,g.Oc)({restaurantId:$.restaurantId,customer:n,date:$.date,amount:$.totalAmount,status:"new",clientOrderId:$.id.toString()});e&&e.id>0?(console.log("Order successfully created in backend, ID:",e.id),localStorage.setItem(r,"true")):console.warn("Order creation may have failed or was handled by another component")}catch(e){console.error("Error creating order in backend:",e)}}else console.warn("Cannot create order: missing restaurantId",$)})(),()=>{n()}}),[o,$,e,n]);return $?(0,x.jsx)(h,{children:(0,x.jsxs)(s.mc,{children:[(0,x.jsx)(a.A,{}),(0,x.jsx)(l.A,{}),(0,x.jsx)(s.DF,{children:(0,x.jsxs)(p,{children:[(0,x.jsx)(m,{children:(0,x.jsxs)("div",{children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,x.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]}),"\u0417\u0430\u043a\u0430\u0437 \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d"]})}),(0,x.jsxs)(v,{children:[(0,x.jsx)(u,{children:(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,x.jsx)("polyline",{points:"20 6 9 17 4 12"})})}),(0,x.jsxs)(y,{children:["\u0417\u0430\u043a\u0430\u0437 \u2116",$.id]}),(0,x.jsx)(j,{children:(r=>{try{switch(r){case"new":return"\u041e\u0436\u0438\u0434\u0430\u0435\u0442 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f";case"confirmed":return"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d";case"preparing":return"\u0413\u043e\u0442\u043e\u0432\u0438\u0442\u0441\u044f";case"ready":return"\u0413\u043e\u0442\u043e\u0432 \u043a \u0432\u044b\u0434\u0430\u0447\u0435";case"delivered":return"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d";default:return"\u0412 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435"}}catch(e){return console.error("Error getting status label:",e),"\u0412 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435"}})($.status)}),(0,x.jsxs)(w,{children:["\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0437\u0430\u043a\u0430\u0437! \u041c\u044b \u0443\u0436\u0435 \u043d\u0430\u0447\u0430\u043b\u0438 \u0435\u0433\u043e \u043e\u0431\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0442\u044c.",(0,x.jsx)("br",{}),"\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0442\u044c \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043a\u0430\u0437\u0430 \u0432 \u043b\u0438\u0447\u043d\u043e\u043c \u043a\u0430\u0431\u0438\u043d\u0435\u0442\u0435."]})]}),(0,x.jsxs)(f,{children:[(0,x.jsxs)(b,{children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),(0,x.jsx)("polyline",{points:"14 2 14 8 20 8"}),(0,x.jsx)("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),(0,x.jsx)("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),(0,x.jsx)("polyline",{points:"10 9 9 9 8 9"})]}),"\u0414\u0435\u0442\u0430\u043b\u0438 \u0437\u0430\u043a\u0430\u0437\u0430"]}),(0,x.jsxs)(k,{children:[(0,x.jsx)(A,{children:"\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043a\u0430\u0437\u0430:"}),(0,x.jsxs)(L,{children:["#",$.id]})]}),(0,x.jsxs)(k,{children:[(0,x.jsx)(A,{children:"\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043c\u044f:"}),(0,x.jsx)(L,{children:(r=>{try{const e=new Date(r);return new Intl.DateTimeFormat("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(e)}catch(e){return console.error("Error formatting date:",e),r}})($.date)})]}),(0,x.jsxs)(k,{children:[(0,x.jsx)(A,{children:"\u0421\u043f\u043e\u0441\u043e\u0431 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f:"}),(0,x.jsx)(L,{children:"delivery"===$.deliveryMethod?"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430":"\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437"})]}),(0,x.jsxs)(b,{style:{marginTop:"var(--spacing-lg)"},children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}),(0,x.jsx)("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),(0,x.jsx)("path",{d:"M16 10a4 4 0 0 1-8 0"})]}),"\u0421\u043e\u0441\u0442\u0430\u0432 \u0437\u0430\u043a\u0430\u0437\u0430"]}),(0,x.jsx)(z,{children:$.items.map(((r,e)=>(0,x.jsxs)(C,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(I,{children:r.name}),(0,x.jsxs)(B,{children:["x",r.quantity]})]}),(0,x.jsxs)(W,{children:["\u20bd",r.price*r.quantity]})]},e)))}),(0,x.jsxs)(M,{children:[(0,x.jsx)(D,{children:"\u0418\u0442\u043e\u0433\u043e:"}),(0,x.jsxs)(_,{children:["\u20bd",$.totalAmount]})]})]}),(0,x.jsxs)(E,{children:[(0,x.jsxs)(O,{onClick:()=>e("/"),children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),(0,x.jsx)("polyline",{points:"9 22 9 12 15 12 15 22"})]}),"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"]}),(0,x.jsxs)(S,{onClick:()=>e("/profile"),children:[(0,x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("line",{x1:"8",y1:"6",x2:"21",y2:"6"}),(0,x.jsx)("line",{x1:"8",y1:"12",x2:"21",y2:"12"}),(0,x.jsx)("line",{x1:"8",y1:"18",x2:"21",y2:"18"}),(0,x.jsx)("line",{x1:"3",y1:"6",x2:"3.01",y2:"6"}),(0,x.jsx)("line",{x1:"3",y1:"12",x2:"3.01",y2:"12"}),(0,x.jsx)("line",{x1:"3",y1:"18",x2:"3.01",y2:"18"})]}),"\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u043e\u0432"]})]})]})})]})}):null}}}]);
//# sourceMappingURL=555.19e69a7e.chunk.js.map