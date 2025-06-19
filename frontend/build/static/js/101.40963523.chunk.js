"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[101],{101:(r,o,a)=>{a.r(o),a.d(o,{default:()=>L});var t=a(43),i=a(216),e=a(464),n=a(997),s=a(105),d=a(367),l=a(579);const c=(0,e.Ay)(n.Z_)`
  min-height: 100vh;
  background-color: var(--background-color);
  padding-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    padding-bottom: var(--spacing-md);
  }
`,g=e.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, var(--primary-color), var(--primary-light));
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
    position: sticky;
    top: 0;
    z-index: 100;
  }
`,p=e.Ay.h1`
  color: var(--text-color);
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  svg {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    width: 100%;
    justify-content: center;
  }
`,x=e.Ay.div`
  display: flex;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: var(--spacing-xs);
    justify-content: flex-start;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding: 0 var(--spacing-sm);
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`,h=e.Ay.button`
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  background-color: ${r=>{switch(r.$variant){case"primary":default:return"var(--primary-color)";case"warning":return"var(--warning-color)";case"danger":return"var(--error-color)"}}};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    flex-shrink: 0;
    font-size: 0.85rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    scroll-snap-align: start;
    min-width: max-content;
    margin-right: var(--spacing-xs);
    
    &:last-child {
      margin-right: var(--spacing-sm);
    }
  }
`,v=e.Ay.div`
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`,m=e.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: var(--spacing-xl);
  height: 300px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
    height: 250px;
    margin-bottom: var(--spacing-lg);
  }
`,u=e.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: var(--spacing-md);
    opacity: 0.5;
  }
`,b=e.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
  }
`,w=e.Ay.div`
  background-color: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, var(--primary-color), var(--primary-light));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`,f=e.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--primary-color);
    margin-right: var(--spacing-sm);
  }
`,y=e.Ay.div`
  font-size: 0.9rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
`,k=e.Ay.div`
  font-size: 2rem;
  font-weight: 700;
  margin: var(--spacing-sm) 0;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`,j=e.Ay.div`
  font-size: 0.9rem;
  color: ${r=>r.$isPositive?"var(--success-color)":"var(--error-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`,A=e.Ay.h2`
  color: var(--text-color);
  margin: var(--spacing-xl) 0 var(--spacing-md) 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--spacing-sm);
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: var(--spacing-lg) 0 var(--spacing-sm) 0;
    padding: 0 var(--spacing-sm);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: var(--spacing-sm);
      width: 40px;
      height: 3px;
      background: var(--primary-color);
      border-radius: var(--border-radius-sm);
    }
  }
`,L=()=>{const r=(0,i.Zp)(),{isDarkMode:o}=(0,d.Us)(),[a,e]=(0,t.useState)(null),[n,L]=(0,t.useState)(0),[M,z]=(0,t.useState)(0),[C,$]=(0,t.useState)(!0),[B,W]=(0,t.useState)(null);(0,t.useEffect)((()=>{(async()=>{$(!0);const o=localStorage.getItem("adminUser")||localStorage.getItem("currentUser"),a=localStorage.getItem("isAuthenticated"),t=localStorage.getItem("userRole");if(o&&"true"===a&&"admin"===t)try{const r=JSON.parse(o);W(r);const a=await(0,s.EB)(r.restaurantId);a?(e(a),L(a.totalRevenue||0),z(a.totalOrders||0)):console.warn("Restaurant data not found for ID:",r.restaurantId)}catch(i){console.error("Error parsing user data:",i),r("/admin/login")}else console.log("User is not authenticated, redirecting to login"),r("/admin/login");$(!1)})()}),[r]);return(0,l.jsxs)(c,{children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("path",{d:"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"})}),"\u0410\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430"]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(h,{onClick:()=>{r("/owner/statistics")},children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M3 3v18h18"}),(0,l.jsx)("path",{d:"M18 17V9"}),(0,l.jsx)("path",{d:"M13 17V5"}),(0,l.jsx)("path",{d:"M8 17v-3"})]}),"\u0417\u0430\u043a\u0430\u0437\u044b"]}),(0,l.jsxs)(h,{onClick:()=>{r("/owner/menu")},children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("path",{d:"M3 7h18M3 12h18M3 17h18"})}),"\u041c\u0435\u043d\u044e"]}),(0,l.jsxs)(h,{$variant:"danger",onClick:()=>{localStorage.removeItem("isAuthenticated"),localStorage.removeItem("currentUser"),localStorage.removeItem("userRole"),localStorage.removeItem("adminUser"),r("/role-selection")},children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),(0,l.jsx)("polyline",{points:"16 17 21 12 16 7"}),(0,l.jsx)("line",{x1:"21",y1:"12",x2:"9",y2:"12"})]}),"\u0412\u044b\u0445\u043e\u0434"]})]})]}),(0,l.jsx)(v,{children:C?(0,l.jsx)("div",{children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445..."}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(b,{children:[(0,l.jsxs)(w,{children:[(0,l.jsx)(f,{children:(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"}),(0,l.jsx)("path",{d:"M3 7h18"}),(0,l.jsx)("path",{d:"M8 12h8"}),(0,l.jsx)("path",{d:"M8 16h4"})]})}),(0,l.jsx)(y,{children:"\u041e\u0431\u0449\u0430\u044f \u0432\u044b\u0440\u0443\u0447\u043a\u0430"}),(0,l.jsx)(k,{children:(S=n,S.toLocaleString("ru-RU")+" \u20bd")}),(0,l.jsxs)(j,{$isPositive:!0,children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("polyline",{points:"18 15 12 9 6 15"})}),"+12.5% \u0441 \u043f\u0440\u043e\u0448\u043b\u043e\u0433\u043e \u043c\u0435\u0441\u044f\u0446\u0430"]})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(f,{children:(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("rect",{x:"2",y:"3",width:"20",height:"18",rx:"2"}),(0,l.jsx)("path",{d:"M8 7v10"}),(0,l.jsx)("path",{d:"M16 7v10"}),(0,l.jsx)("path",{d:"M12 7v10"})]})}),(0,l.jsx)(y,{children:"\u0412\u0441\u0435\u0433\u043e \u0437\u0430\u043a\u0430\u0437\u043e\u0432"}),(0,l.jsx)(k,{children:M}),(0,l.jsxs)(j,{$isPositive:!0,children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("polyline",{points:"18 15 12 9 6 15"})}),"+8.2% \u0441 \u043f\u0440\u043e\u0448\u043b\u043e\u0433\u043e \u043c\u0435\u0441\u044f\u0446\u0430"]})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(f,{children:(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,l.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}),(0,l.jsx)(y,{children:"\u0421\u0440\u0435\u0434\u043d\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"}),(0,l.jsx)(k,{children:"32 \u043c\u0438\u043d"}),(0,l.jsxs)(j,{$isPositive:!1,children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("polyline",{points:"6 9 12 15 18 9"})}),"+3 \u043c\u0438\u043d \u0441 \u043f\u0440\u043e\u0448\u043b\u043e\u0433\u043e \u043c\u0435\u0441\u044f\u0446\u0430"]})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(f,{children:(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),(0,l.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,l.jsx)("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),(0,l.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}),(0,l.jsx)(y,{children:"\u041d\u043e\u0432\u044b\u0445 \u043a\u043b\u0438\u0435\u043d\u0442\u043e\u0432"}),(0,l.jsx)(k,{children:"48"}),(0,l.jsxs)(j,{$isPositive:!0,children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("polyline",{points:"18 15 12 9 6 15"})}),"+24% \u0441 \u043f\u0440\u043e\u0448\u043b\u043e\u0433\u043e \u043c\u0435\u0441\u044f\u0446\u0430"]})]})]}),(0,l.jsxs)(A,{children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M3 3v18h18"}),(0,l.jsx)("path",{d:"M18 17V9"}),(0,l.jsx)("path",{d:"M13 17V5"}),(0,l.jsx)("path",{d:"M8 17v-3"})]}),"\u0412\u044b\u0440\u0443\u0447\u043a\u0430 \u0437\u0430 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 30 \u0434\u043d\u0435\u0439"]}),(0,l.jsx)(m,{children:(0,l.jsxs)(u,{children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,l.jsx)("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),(0,l.jsx)("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0433\u0440\u0430\u0444\u0438\u043a\u0430"]})}),(0,l.jsxs)(A,{children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("path",{d:"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"})}),"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u0431\u043b\u044e\u0434\u0430"]}),(0,l.jsx)(m,{children:(0,l.jsxs)(u,{children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,l.jsx)("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),(0,l.jsx)("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0433\u0440\u0430\u0444\u0438\u043a\u0430"]})})]})})]});var S}},997:(r,o,a)=>{a.d(o,{$n:()=>u,DF:()=>e,DZ:()=>n,JU:()=>c,WB:()=>w,Wk:()=>m,Z_:()=>y,_k:()=>v,gE:()=>l,gO:()=>b,hD:()=>d,jt:()=>p,m_:()=>x,mc:()=>i,pd:()=>g,pp:()=>f,rd:()=>h});var t=a(464);const i=t.Ay.div`
  max-width: 100%;
  padding: 0 var(--spacing-md);
  margin: 0 auto;
  width: 100%;
`,e=(t.Ay.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg) 0;
  position: relative;
  margin-bottom: var(--spacing-md);
`,t.Ay.div`
  width: 120px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`,t.Ay.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform var(--transition-normal);
  
  &:hover {
    transform: scale(1.05);
  }
`,t.Ay.nav`
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
`,t.Ay.button`
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
`,t.Ay.main`
  padding: var(--spacing-md) 0;
`),n=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
`,s=t.Ay.div`
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
`,d=(t.Ay.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  transition: transform var(--transition-normal);
  
  ${s}:hover & {
    transform: scale(1.05);
  }
`,t.Ay.div`
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
`,t.Ay.h3`
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--text-color);
`,t.Ay.p`
  font-size: 1rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
`,t.Ay.button`
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
`),l=(t.Ay.footer`
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg) 0;
  text-align: center;
  border-top: 1px solid var(--card-bg);
`,t.Ay.button`
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
`,t.Ay.button`
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
`,t.Ay.div`
  margin-bottom: var(--spacing-lg);
`),c=t.Ay.label`
  display: block;
  margin-bottom: var(--spacing-sm);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
`,g=t.Ay.input`
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
`,p=(t.Ay.select`
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
`,t.Ay.div`
  display: flex;
  gap: var(--spacing-sm);
  margin: var(--spacing-lg) 0;
`),x=t.Ay.button`
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
`,h=t.Ay.div`
  margin-top: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`,v=t.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
`,m=t.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
  font-weight: 600;
`,u=t.Ay.button`
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
`,b=t.Ay.div`
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
`,w=(t.Ay.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
`,t.Ay.p`
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-top: var(--spacing-sm);
  font-weight: 600;
`,t.Ay.div`
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`),f=(t.Ay.span`
  background-color: var(--primary-color);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: var(--spacing-xs);
`,t.Ay.hr`
  border: none;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: var(--spacing-md) 0;
`,t.Ay.div`
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
`),y=t.Ay.div`
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
`;t.Ay.div`
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
`,t.Ay.h3`
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
//# sourceMappingURL=101.40963523.chunk.js.map