"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[217],{217:(r,a,o)=>{o.r(a),o.d(a,{default:()=>E});var e=o(43),t=o(216),i=o(464),n=o(997),s=o(105),d=o(579);const c=(0,i.Ay)(n.Z_)`
  min-height: 100vh;
  background-color: var(--background-color);
`,l=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
`,g=i.Ay.h1`
  color: var(--text-color);
  margin: 0;
  font-size: 1.5rem;
`,p=i.Ay.button`
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--error-color);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--error-dark);
  }
`,m=i.Ay.div`
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`,x=i.Ay.div`
  background-color: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`,u=i.Ay.div`
  font-size: 2rem;
  font-weight: 700;
  margin: var(--spacing-md) 0;
  color: var(--text-color);
`,b=i.Ay.div`
  font-size: 0.9rem;
  color: var(--text-muted);
`,h=i.Ay.h2`
  color: var(--text-color);
  margin: var(--spacing-xl) 0 var(--spacing-md) 0;
  font-size: 1.3rem;
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
`,y=i.Ay.div`
  display: flex;
  align-items: center;
  background-color: var(--card-bg);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`,w=i.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius-md);
  background-color: var(--background-color);
  background-size: cover;
  background-position: center;
  margin-right: var(--spacing-md);
  flex-shrink: 0;
`,k=i.Ay.div`
  flex: 1;
`,j=i.Ay.div`
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
`,A=i.Ay.div`
  color: var(--primary-color);
  font-weight: 700;
`,z=i.Ay.button`
  width: 100%;
  padding: var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--primary-color);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: var(--spacing-lg);

  &:hover {
    background-color: var(--primary-dark);
  }
`,S=i.Ay.div`
  width: 100%;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: var(--spacing-md);
`,$=i.Ay.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 0.8fr;
  background-color: var(--card-bg);
  padding: var(--spacing-md);
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
`,I=i.Ay.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 0.8fr;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--card-bg);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--card-hover);
  }

  &:last-child {
    border-bottom: none;
  }
`,Y=i.Ay.div`
  display: flex;
  align-items: center;
`,C=i.Ay.span`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.8rem;
  background-color: ${r=>{switch(r.status){case"completed":return"var(--success-bg)";case"new":return"var(--warning-bg)";case"cancelled":return"var(--error-bg)";default:return"var(--card-hover)"}}};
  color: ${r=>{switch(r.status){case"completed":return"var(--success-color)";case"new":return"var(--warning-color)";case"cancelled":return"var(--error-color)";default:return"var(--text-color)"}}};
`,E=()=>{const r=(0,t.Zp)(),[a,o]=(0,e.useState)(!1),[i,n]=(0,e.useState)(null),[E,F]=(0,e.useState)([]),[q,M]=(0,e.useState)(!0),[_,D]=(0,e.useState)(null),[O,L]=(0,e.useState)([]),Z=(0,e.useCallback)((()=>{const r={},a=_?(0,s.Nr)(_.restaurantId):[];E.forEach((o=>{(async()=>{const r=await a,o=[];if(r&&r.length>0){const a=Math.floor(3*Math.random())+1;for(let e=0;e<a;e++){const a=r[Math.floor(Math.random()*r.length)],e=Math.floor(3*Math.random())+1;o.push({id:a.id,name:a.name,price:a.price,quantity:e})}}return o})().then((a=>{a.forEach((a=>{r[a.id]||(r[a.id]={count:0,name:a.name,price:a.price,id:a.id}),r[a.id].count+=a.quantity}))}))}));const o=Object.values(r).sort(((r,a)=>a.count-r.count));return 0===o.length&&_?[{id:1,name:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0435 \u0431\u043b\u044e\u0434\u043e 1",price:350,quantity:1,image:"/assets/images/paneer-tikka.jpg"},{id:2,name:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0435 \u0431\u043b\u044e\u0434\u043e 2",price:450,quantity:1,image:"/assets/images/paneer-tikka.jpg"},{id:3,name:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0435 \u0431\u043b\u044e\u0434\u043e 3",price:550,quantity:1,image:"/assets/images/paneer-tikka.jpg"}]:o.slice(0,3).map((r=>({id:r.id,name:r.name,price:r.price,quantity:1,image:"/assets/images/paneer-tikka.jpg"})))}),[E,_]);(0,e.useEffect)((()=>{const a=localStorage.getItem("isAuthenticated"),e=localStorage.getItem("userRole"),t=localStorage.getItem("currentUser");if("true"!==a||"admin"!==e)return void r("/admin/login");(async()=>{if(t){const r=JSON.parse(t);D(r);try{const a=await(0,s.EB)(r.restaurantId),e=await(0,s.Xx)(r.restaurantId);a&&n(a),F(e.slice(0,10)),o(!0)}catch(a){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0434\u0430\u043d\u043d\u044b\u0445:",a)}}else r("/admin/login");M(!1)})()}),[r]),(0,e.useEffect)((()=>{_&&E.length>0&&L(Z())}),[Z,_,E]);return q?(0,d.jsx)(c,{children:(0,d.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"var(--text-color)"},children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."})}):a&&i?(0,d.jsxs)(c,{children:[(0,d.jsxs)(l,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(g,{children:"\u041f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u0430"}),0===(null===_||void 0===_?void 0:_.restaurantId)&&(0,d.jsx)("div",{style:{color:"var(--text-muted)",fontSize:"0.9rem",marginTop:"8px"},children:"\u0420\u0435\u0436\u0438\u043c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430 (\u0434\u043e\u0441\u0442\u0443\u043f \u043a\u043e \u0432\u0441\u0435\u043c \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u0430\u043c)"}),0!==(null===_||void 0===_?void 0:_.restaurantId)&&i&&(0,d.jsx)("div",{style:{color:"var(--text-muted)",fontSize:"0.9rem",marginTop:"8px"},children:i.name})]}),(0,d.jsx)(p,{onClick:()=>{localStorage.removeItem("currentUser"),localStorage.removeItem("isAuthenticated"),localStorage.removeItem("userRole"),r("/")},children:"\u0412\u044b\u0439\u0442\u0438"})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(h,{children:"\u041e\u0431\u0449\u0430\u044f \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430"}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(b,{children:"\u0412\u0441\u0435\u0433\u043e \u0437\u0430\u043a\u0430\u0437\u043e\u0432"}),(0,d.jsx)(u,{children:i.totalOrders})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(b,{children:"\u0412\u044b\u0440\u0443\u0447\u043a\u0430"}),(0,d.jsxs)(u,{children:["\u20bd",i.totalRevenue.toLocaleString()]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(b,{children:"\u0427\u0438\u0441\u0442\u0430\u044f \u043f\u0440\u0438\u0431\u044b\u043b\u044c"}),(0,d.jsxs)(u,{children:["\u20bd",i.netProfit.toLocaleString()]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(b,{children:"\u0421\u0440\u0435\u0434\u043d\u0438\u0439 \u0447\u0435\u043a"}),(0,d.jsxs)(u,{children:["\u20bd",i.averageOrderValue.toLocaleString()]})]})]}),(0,d.jsx)(h,{children:"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u044b"}),E.length>0?(0,d.jsxs)(S,{children:[(0,d.jsxs)($,{children:[(0,d.jsx)(Y,{children:"ID"}),(0,d.jsx)(Y,{children:"\u041a\u043b\u0438\u0435\u043d\u0442"}),(0,d.jsx)(Y,{children:"\u0414\u0430\u0442\u0430"}),(0,d.jsx)(Y,{children:"\u0421\u0443\u043c\u043c\u0430"}),(0,d.jsx)(Y,{children:"\u0421\u0442\u0430\u0442\u0443\u0441"})]}),E.map((r=>(0,d.jsxs)(I,{children:[(0,d.jsxs)(Y,{children:["#",r.id]}),(0,d.jsx)(Y,{children:r.customer}),(0,d.jsx)(Y,{children:r.date}),(0,d.jsxs)(Y,{children:["\u20bd",r.amount.toLocaleString()]}),(0,d.jsx)(Y,{children:(0,d.jsxs)(C,{status:r.status,children:["completed"===r.status&&"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d","new"===r.status&&"\u041e\u0436\u0438\u0434\u0430\u0435\u0442","cancelled"===r.status&&"\u041e\u0442\u043c\u0435\u043d\u0435\u043d"]})})]},r.id)))]}):(0,d.jsx)("div",{style:{textAlign:"center",padding:"var(--spacing-lg)",color:"var(--text-muted)"},children:"\u041d\u0435\u0442 \u0437\u0430\u043a\u0430\u0437\u043e\u0432 \u0434\u043b\u044f \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f"}),(0,d.jsx)(h,{children:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u0431\u043b\u044e\u0434\u0430"}),O.length>0?(0,d.jsx)(f,{children:O.map((r=>(0,d.jsxs)(y,{children:[(0,d.jsx)(w,{style:{backgroundImage:`url(${r.image})`}}),(0,d.jsxs)(k,{children:[(0,d.jsx)(j,{children:r.name}),(0,d.jsxs)(A,{children:["\u20bd",r.price]})]})]},r.id)))}):(0,d.jsx)("div",{style:{textAlign:"center",padding:"var(--spacing-lg)",color:"var(--text-muted)"},children:"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u0430\u043d\u0430\u043b\u0438\u0437\u0430 \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0445 \u0431\u043b\u044e\u0434"}),(0,d.jsx)(z,{onClick:()=>{r("/admin/menu-management")},children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043c\u0435\u043d\u044e"})]})]}):null}},997:(r,a,o)=>{o.d(a,{$n:()=>b,DF:()=>i,DZ:()=>n,JU:()=>l,WB:()=>f,Wk:()=>u,Z_:()=>w,_k:()=>x,gE:()=>c,gO:()=>h,hD:()=>d,jt:()=>p,m_:()=>m,mc:()=>t,pd:()=>g,pp:()=>y,rd:()=>v});var e=o(464);const t=e.Ay.div`
  max-width: 100%;
  padding: 0 var(--spacing-md);
  margin: 0 auto;
  width: 100%;
`,i=(e.Ay.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg) 0;
  position: relative;
  margin-bottom: var(--spacing-md);
`,e.Ay.div`
  width: 120px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`,e.Ay.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform var(--transition-normal);
  
  &:hover {
    transform: scale(1.05);
  }
`,e.Ay.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  overflow-x: auto;
  gap: var(--spacing-sm);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  /* Hide scrollbar but allow scrolling */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`,e.Ay.button`
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  background-color: var(--button-bg);
  color: var(--button-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  min-width: 70px;
  transition: all var(--transition-normal);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  
  svg {
    margin-bottom: 5px;
    transition: transform var(--transition-fast);
  }
  
  &:hover, &.active {
    background-color: var(--primary-color);
    color: var(--text-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 159, 13, 0.3);
    
    svg {
      transform: scale(1.1);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      background-color: var(--button-bg);
      color: var(--button-text);
      transform: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      
      svg {
        transform: none;
      }
    }
  }
`,e.Ay.main`
  padding: var(--spacing-md) 0;
`),n=e.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
`,s=e.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--box-shadow);
    background-color: var(--card-hover);
  }
`,d=(e.Ay.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  transition: transform var(--transition-normal);
  
  ${s}:hover & {
    transform: scale(1.05);
  }
`,e.Ay.div`
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
`,e.Ay.h3`
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--text-color);
`,e.Ay.p`
  font-size: 1rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
`,e.Ay.button`
  width: 100%;
  padding: var(--spacing-sm);
  font-size: 0.95rem;
  margin-top: auto;
  border-radius: var(--border-radius-sm);
  background-color: var(--primary-color);
  color: var(--text-color);
  font-weight: 500;
  
  &:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
  }
`),c=(e.Ay.footer`
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg) 0;
  text-align: center;
  border-top: 1px solid var(--card-bg);
`,e.Ay.button`
  position: absolute;
  right: var(--spacing-sm);
  top: var(--spacing-lg);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--card-bg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  svg {
    transition: transform var(--transition-fast);
  }
  
  &:hover {
    background-color: var(--primary-color);
    
    svg {
      transform: scale(1.1);
    }
  }
`,e.Ay.button`
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  
  &:hover {
    background-color: var(--primary-light);
    transform: scale(1.05) translateY(-2px);
  }
  
  span {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--background-color);
    color: var(--text-color);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 600;
    border: 2px solid var(--primary-color);
  }
`,e.Ay.div`
  margin-bottom: var(--spacing-lg);
`),l=e.Ay.label`
  display: block;
  margin-bottom: var(--spacing-sm);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
`,g=e.Ay.input`
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid ${r=>r.error?"#F44336":"rgba(255, 255, 255, 0.1)"};
  background-color: var(--background-light);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${r=>r.error?"#F44336":"var(--primary-color)"};
    box-shadow: ${r=>r.error?"0 0 0 2px rgba(244, 67, 54, 0.2)":"0 0 0 2px rgba(255, 159, 13, 0.2)"};
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:hover {
    border-color: ${r=>r.error?"#F44336":"var(--primary-light)"};
  }
`,p=(e.Ay.select`
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--card-bg);
  color: var(--text-color);
  border: 1px solid #333;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23FF9F0D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 159, 13, 0.2);
  }
`,e.Ay.div`
  display: flex;
  gap: var(--spacing-sm);
  margin: var(--spacing-lg) 0;
`),m=e.Ay.button`
  flex: 1;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: ${r=>r.$active?"var(--primary-color)":"var(--card-bg)"};
  color: ${r=>r.$active?"var(--text-color)":"var(--text-secondary)"};
  font-weight: ${r=>r.$active?"600":"400"};
  box-shadow: ${r=>r.$active?"0 4px 8px rgba(255, 159, 13, 0.3)":"none"};
  
  &:hover {
    background-color: ${r=>r.$active?"var(--primary-light)":"var(--card-hover)"};
    color: var(--text-color);
    transform: translateY(-2px);
  }
`,v=e.Ay.div`
  margin-top: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`,x=e.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
`,u=e.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
  font-weight: 600;
`,b=e.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`,h=e.Ay.div`
  padding: var(--spacing-md);
  border-bottom: 1px solid #333;
  transition: all var(--transition-fast);
  border-radius: var(--border-radius-sm);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: var(--card-hover);
  }
`,f=(e.Ay.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
`,e.Ay.p`
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-top: var(--spacing-sm);
  font-weight: 600;
`,e.Ay.div`
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`),y=(e.Ay.span`
  background-color: var(--primary-color);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: var(--spacing-xs);
`,e.Ay.hr`
  border: none;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: var(--spacing-md) 0;
`,e.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  margin: var(--spacing-md) 0;
  
  svg {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
  }
  
  h3 {
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
  }
  
  p {
    margin-bottom: var(--spacing-md);
    color: var(--text-secondary);
  }
`),w=e.Ay.div`
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;e.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  transition: all var(--transition-normal);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  height: 100%;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--box-shadow);
    background-color: var(--card-hover);
  }
`,e.Ay.h3`
  font-size: 1.3rem;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`}}]);
//# sourceMappingURL=217.369b5640.chunk.js.map