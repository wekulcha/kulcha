"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[205],{59:(r,o,a)=>{a.d(o,{A:()=>x});var t=a(43),e=a(216),n=a(464),i=a(367),s=a(579);const d=n.Ay.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(20px);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  
  @media (max-width: 768px) {
    padding: 8px 5px;
  }
`,l=n.Ay.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${r=>r.$active?"var(--primary-color)":"rgba(255, 255, 255, 0.7)"};
  padding: 8px 12px;
  position: relative;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.5;
  }
  
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
    transition: transform 0.2s ease, color 0.2s ease;
    
    @media (max-width: 768px) {
      width: 22px;
      height: 22px;
    }
  }
  
  span {
    font-size: 12px;
    transition: all 0.2s ease;
    white-space: nowrap;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media (max-width: 400px) {
      display: none;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: ${r=>r.$active?"translateX(-50%) scale(1)":"translateX(-50%) scale(0)"};
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: var(--primary-color);
    transition: transform 0.2s ease;
  }
  
  &:hover {    
    color: white;
    
    svg {
      transform: translateY(-2px);
      color: white;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid #fff;
      border-radius: 8px;
      pointer-events: none;
    }
  }
`,c=n.Ay.div`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${r=>r.$active?"var(--primary-color)":"transparent"};
  box-shadow: 0 0 5px var(--primary-color);
`,p=n.Ay.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(255, 159, 13, 0.5);
  border: none;
  cursor: pointer;
  transform: translateY(-15px);
  transition: all 0.2s ease;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
    transition: transform 0.2s ease;
  }
  
  &:hover {
    transform: translateY(-20px);
    box-shadow: 0 5px 15px rgba(255, 159, 13, 0.6);
    border: 2px solid #fff;
    
    svg {
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    transform: translateY(-10px);
    
    &:hover {
      transform: translateY(-15px);
      border: 2px solid #fff;
    }
  }
`,g=n.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`,x=()=>{const r=(0,e.Zp)(),o=(0,e.zy)(),{selectedCity:a,selectedRestaurant:n,restaurants:x,deliveryMethod:m,setDeliveryMethod:h,cart:v}=(0,i.Us)(),[b,u]=(0,t.useState)("home");(0,t.useEffect)((()=>{o.pathname.includes("city-selection")?u("city"):o.pathname.includes("restaurant-selection")?u("restaurant"):o.pathname.includes("profile")?u("profile"):"/home"===o.pathname||"/"===o.pathname?u("home"):o.pathname.includes("cart")&&u("cart")}),[o.pathname]);const f=null!==n?x.find((r=>r.id===n)):null,y=v.reduce(((r,o)=>r+o.quantity),0);return(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{onClick:()=>{r("/city-selection")},$active:"city"===b,children:(0,s.jsxs)(g,{children:[(0,s.jsx)(c,{$active:!!a}),(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"}),(0,s.jsx)("circle",{cx:"12",cy:"9",r:"2.5"})]}),(0,s.jsx)("span",{children:a?a.name:"\u0413\u043e\u0440\u043e\u0434"})]})}),(0,s.jsx)(l,{onClick:()=>{a&&r("/restaurant-selection")},disabled:!a,$active:"restaurant"===b,children:(0,s.jsxs)(g,{children:[(0,s.jsx)(c,{$active:!!f}),(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"})}),(0,s.jsx)("span",{children:f?f.name:"\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d"})]})}),(0,s.jsx)(p,{onClick:()=>{r("/home")},children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"})})}),(0,s.jsx)(l,{onClick:"delivery"===m?()=>{h("pickup")}:()=>{h("delivery")},$active:!1,children:(0,s.jsx)(g,{children:"delivery"===m?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"})}),(0,s.jsx)("span",{children:"\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437"})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[(0,s.jsx)("path",{d:"M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"}),(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"})]}),(0,s.jsx)("span",{children:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430"})]})})}),(0,s.jsx)(l,{onClick:()=>{r("/cart")},$active:"cart"===b,children:(0,s.jsxs)(g,{children:[(0,s.jsx)(c,{$active:y>0}),(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),(0,s.jsxs)("span",{children:["\u041a\u043e\u0440\u0437\u0438\u043d\u0430",y>0?` (${y})`:""]})]})})]})}},372:(r,o,a)=>{a.d(o,{A:()=>e});var t=a(43);const e=function(){var r;const o=null===(r=window.Telegram)||void 0===r?void 0:r.WebApp;return(0,t.useEffect)((()=>{o&&(o.ready(),o.expand())}),[o]),{tg:o,showBackButton:()=>{o&&o.BackButton.show()},hideBackButton:()=>{o&&o.BackButton.hide()},setBackButtonCallback:r=>{o&&o.BackButton.onClick(r)},showMainButton:r=>{o&&(o.MainButton.setText(r),o.MainButton.show())},hideMainButton:()=>{o&&o.MainButton.hide()},setMainButtonCallback:r=>{o&&o.MainButton.onClick(r)},enableMainButton:()=>{o&&o.MainButton.enable()},disableMainButton:()=>{o&&o.MainButton.disable()},showMainButtonLoader:()=>{o&&o.MainButton.showProgress(!1)},hideMainButtonLoader:()=>{o&&o.MainButton.hideProgress()},getUser:()=>{var r;return null===o||void 0===o||null===(r=o.initDataUnsafe)||void 0===r?void 0:r.user}}}},526:(r,o,a)=>{a.d(o,{A:()=>g});a(43);var t=a(216),e=a(464),n=a(579);const i=e.Ay.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(18, 18, 18, 0.5);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`,s=e.Ay.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  padding: 6px;
`,d=e.Ay.img`
  height: 40px;
  width: auto;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 36px;
  }
`,l=e.Ay.div`
  display: flex;
  gap: 12px;
`,c=e.Ay.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--text-color);
  transition: all 0.2s ease;
  position: relative;
  
  svg {
    width: 22px;
    height: 22px;
    transition: transform 0.2s ease, color 0.2s ease;
  }
  
  &:hover {
    color: white;
    
    svg {
      transform: translateY(-2px);
      color: white;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid #fff;
      border-radius: 50%;
      pointer-events: none;
    }
  }
`,p=e.Ay.button`
  display: none;
`,g=()=>{const r=(0,t.Zp)();return(0,n.jsxs)(i,{children:[(0,n.jsx)(s,{onClick:()=>{r("/home")},children:(0,n.jsx)(d,{src:"/assets/images/logo.png",alt:"Kulcha"})}),(0,n.jsxs)(l,{children:[(0,n.jsx)(p,{onClick:()=>{r("/config/tunnel")},title:"Configure Tunnel"}),(0,n.jsx)(c,{onClick:()=>{r("/profile")},children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})})]})]})}},997:(r,o,a)=>{a.d(o,{$n:()=>b,DF:()=>n,DZ:()=>i,JU:()=>c,WB:()=>f,Wk:()=>v,Z_:()=>w,_k:()=>h,gE:()=>l,gO:()=>u,hD:()=>d,jt:()=>g,m_:()=>x,mc:()=>e,pd:()=>p,pp:()=>y,rd:()=>m});var t=a(464);const e=t.Ay.div`
  max-width: 100%;
  padding: 0 var(--spacing-md);
  margin: 0 auto;
  width: 100%;
`,n=(t.Ay.header`
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
`),i=t.Ay.div`
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
`,p=t.Ay.input`
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
`,g=(t.Ay.select`
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
`,m=t.Ay.div`
  margin-top: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`,h=t.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
`,v=t.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
  font-weight: 600;
`,b=t.Ay.button`
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
`,u=t.Ay.div`
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
`,f=(t.Ay.p`
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
`),y=(t.Ay.span`
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
`),w=t.Ay.div`
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
//# sourceMappingURL=205.ace6d4e2.chunk.js.map