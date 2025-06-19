"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[924],{372:(r,a,o)=>{o.d(a,{A:()=>i});var t=o(43);const i=function(){var r;const a=null===(r=window.Telegram)||void 0===r?void 0:r.WebApp;return(0,t.useEffect)((()=>{a&&(a.ready(),a.expand())}),[a]),{tg:a,showBackButton:()=>{a&&a.BackButton.show()},hideBackButton:()=>{a&&a.BackButton.hide()},setBackButtonCallback:r=>{a&&a.BackButton.onClick(r)},showMainButton:r=>{a&&(a.MainButton.setText(r),a.MainButton.show())},hideMainButton:()=>{a&&a.MainButton.hide()},setMainButtonCallback:r=>{a&&a.MainButton.onClick(r)},enableMainButton:()=>{a&&a.MainButton.enable()},disableMainButton:()=>{a&&a.MainButton.disable()},showMainButtonLoader:()=>{a&&a.MainButton.showProgress(!1)},hideMainButtonLoader:()=>{a&&a.MainButton.hideProgress()},getUser:()=>{var r;return null===a||void 0===a||null===(r=a.initDataUnsafe)||void 0===r?void 0:r.user}}}},924:(r,a,o)=>{o.r(a),o.d(a,{default:()=>y});var t=o(43),i=o(216),n=o(464),e=o(372),s=o(997),d=o(367),c=o(579);const l=(0,n.Ay)(s.Z_)`
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: var(--background-color);
  background-image: linear-gradient(to bottom, var(--background-color), var(--background-light));
`,g=n.Ay.div`
  width: auto;
  height: auto;
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  position: relative;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`,p=n.Ay.h1`
  color: var(--text-color);
  text-align: center;
  margin-bottom: var(--spacing-lg);
  font-size: 2.2rem;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`,m=n.Ay.p`
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  font-size: 1.2rem;
  max-width: 600px;
`,v=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  max-width: 400px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 800px;
  }
`,x=n.Ay.div`
  flex: 1;
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--primary-color);
  }
`,b=n.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${r=>"user"===r.$variant?"rgba(255, 159, 13, 0.1)":"rgba(59, 130, 246, 0.1)"};
  color: ${r=>"user"===r.$variant?"var(--primary-color)":"#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  font-size: 2rem;
`,h=n.Ay.h2`
  color: var(--text-color);
  font-size: 1.3rem;
  margin-bottom: var(--spacing-sm);
  text-align: center;
`,u=n.Ay.p`
  color: var(--text-secondary);
  text-align: center;
  font-size: 0.95rem;
  margin-bottom: var(--spacing-lg);
  line-height: 1.5;
`,f=n.Ay.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-md);
  background-color: ${r=>"user"===r.$variant?"var(--primary-color)":"#3B82F6"};
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${r=>"user"===r.$variant?"0 4px 12px rgba(255, 159, 13, 0.3)":"0 4px 12px rgba(59, 130, 246, 0.3)"};
  }
  
  &:active {
    transform: translateY(0);
  }
`,y=()=>{const r=(0,i.Zp)(),{}=(0,e.A)(),{setUserRole:a,cities:o}=(0,d.Us)();(0,t.useEffect)((()=>{if(!o||0===o.length){const r=[{id:1,name:"\u041c\u043e\u0441\u043a\u0432\u0430"},{id:2,name:"\u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433"},{id:3,name:"\u041a\u0430\u0437\u0430\u043d\u044c"},{id:4,name:"\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a"},{id:5,name:"\u0415\u043a\u0430\u0442\u0435\u0440\u0438\u043d\u0431\u0443\u0440\u0433"}];localStorage.setItem("cities",JSON.stringify(r))}}),[o]);return(0,c.jsxs)(l,{children:[(0,c.jsx)(g,{children:(0,c.jsx)("img",{src:"/assets/images/logo.png",alt:"Kulcha Logo"})}),(0,c.jsx)(p,{children:"\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 Kulcha!"}),(0,c.jsx)(m,{children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435, \u043a\u0430\u043a \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043d\u0430\u0448\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435"}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(x,{onClick:()=>{localStorage.setItem("userRole","user"),a("user"),r("/role-to-city")},children:[(0,c.jsx)(b,{$variant:"user",children:(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",width:"36",height:"36",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"})})}),(0,c.jsx)(h,{children:"\u0414\u043b\u044f \u043a\u043b\u0438\u0435\u043d\u0442\u043e\u0432"}),(0,c.jsx)(u,{children:"\u0417\u0430\u043a\u0430\u0437\u044b\u0432\u0430\u0439\u0442\u0435 \u0432\u0430\u0448\u0438 \u043b\u044e\u0431\u0438\u043c\u044b\u0435 \u0431\u043b\u044e\u0434\u0430, \u0441\u043b\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 \u0437\u0430\u043a\u0430\u0437\u0430\u043c\u0438 \u0438 \u0438\u0437\u0443\u0447\u0430\u0439\u0442\u0435 \u043c\u0435\u043d\u044e \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432"}),(0,c.jsx)(f,{$variant:"user",children:"\u0412\u043e\u0439\u0442\u0438 \u043a\u0430\u043a \u043a\u043b\u0438\u0435\u043d\u0442"})]}),(0,c.jsxs)(x,{onClick:()=>{r("/admin/login")},children:[(0,c.jsx)(b,{$variant:"owner",children:(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",width:"36",height:"36",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"})})}),(0,c.jsx)(h,{children:"\u0414\u043b\u044f \u0432\u043b\u0430\u0434\u0435\u043b\u044c\u0446\u0435\u0432"}),(0,c.jsx)(u,{children:"\u0423\u043f\u0440\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u0432\u0430\u0448\u0438\u043c \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u043c, \u0441\u043b\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u043e\u0439 \u0438 \u043e\u0431\u043d\u043e\u0432\u043b\u044f\u0439\u0442\u0435 \u043c\u0435\u043d\u044e"}),(0,c.jsx)(f,{$variant:"owner",children:"\u0412\u043e\u0439\u0442\u0438 \u043a\u0430\u043a \u0432\u043b\u0430\u0434\u0435\u043b\u0435\u0446"})]})]})]})}},997:(r,a,o)=>{o.d(a,{$n:()=>h,DF:()=>n,DZ:()=>e,JU:()=>l,WB:()=>f,Wk:()=>b,Z_:()=>w,_k:()=>x,gE:()=>c,gO:()=>u,hD:()=>d,jt:()=>p,m_:()=>m,mc:()=>i,pd:()=>g,pp:()=>y,rd:()=>v});var t=o(464);const i=t.Ay.div`
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
`),e=t.Ay.div`
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
`),c=(t.Ay.footer`
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
`),l=t.Ay.label`
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
`),m=t.Ay.button`
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
`,v=t.Ay.div`
  margin-top: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`,x=t.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
`,b=t.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
  font-weight: 600;
`,h=t.Ay.button`
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
//# sourceMappingURL=924.fb9d8f88.chunk.js.map