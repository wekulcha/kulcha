"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[779],{343:(e,i,t)=>{t.d(i,{A:()=>a});const a=()=>null},779:(e,i,t)=>{t.r(i),t.d(i,{default:()=>B});var a=t(43),r=t(216),d=t(464),o=t(997),n=t(526),x=t(59),p=t(343),s=t(367),m=t(372),l=t(291),h=t(579);const c=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 40px;
  
  /* Адаптивная сетка для мобильных устройств */
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
    margin-top: 24px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 16px;
  }
`,g=d.Ay.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    border-color: var(--primary-color);
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: -50px;
    left: -20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(var(--primary-light), transparent 70%);
    opacity: 0.3;
    transition: all 0.3s ease;
  }
  
  &:hover::before {
    transform: scale(1.5);
    opacity: 0.5;
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    height: 100px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    height: 90px;
    border-radius: 14px;
    
    /* Оптимизация анимаций для мобильных устройств */
    &:active {
      transform: scale(0.95);
      border-color: var(--primary-color);
      transition: all 0.2s ease;
    }
    
    /* На мобильных touch событие вместо hover */
    &:hover {
      transform: none;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
    
    &::before {
      width: 60px;
      height: 60px;
      bottom: -30px;
      left: -15px;
    }
  }
`,w=d.Ay.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  color: white;
  text-align: center;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`,f=d.Ay.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  text-align: center;
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`,b=d.Ay.div`
  position: relative;
  margin: 40px 0 20px;
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    margin: 30px 0 16px;
  }
  
  @media (max-width: 480px) {
    margin: 20px 0 12px;
  }
`,u=d.Ay.input`
  width: 100%;
  padding: 16px 24px 16px 56px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 159, 13, 0.2);
    outline: none;
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    padding: 14px 20px 14px 48px;
    font-size: 0.95rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px 12px 40px;
    font-size: 0.9rem;
    border-radius: 10px;
  }
`,v=d.Ay.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    left: 16px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  @media (max-width: 480px) {
    left: 14px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`,y=d.Ay.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-md);
  margin-top: var(--spacing-md);
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    padding: var(--spacing-lg);
    margin-top: var(--spacing-sm);
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-md);
    font-size: 0.9rem;
  }
`,j=d.Ay.div`
  text-align: center;
  margin-bottom: 30px;
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`,A=d.Ay.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #FFFFFF 0%, #A0A0A0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 6px;
  }
`,k=d.Ay.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    max-width: 100%;
  }
`,z=(0,d.Ay)(o.DF)`
  padding: var(--spacing-md) 0;
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    padding: var(--spacing-sm) 0;
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-xs) 0;
  }
`,C=d.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    height: 250px;
  }
  
  @media (max-width: 480px) {
    height: 200px;
  }
`,F=d.Ay.div`
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    width: 54px;
    height: 54px;
    margin-bottom: 14px;
    border-width: 3px;
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    margin-bottom: 12px;
    border-width: 3px;
  }
`,S=(0,d.Ay)(o.mc)`
  max-width: 100%;
  padding: 0 var(--spacing-md);
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm);
  }
  
  @media (max-width: 480px) {
    padding: 0 var(--spacing-xs);
  }
`,B=()=>{const e=(0,r.Zp)(),{selectedCity:i,setSelectedCity:t}=(0,s.Us)(),{hideBackButton:d,hideMainButton:o}=(0,m.A)(),[B,L]=(0,a.useState)([]),[E,M]=(0,a.useState)(!0),[Y,_]=(0,a.useState)("");(0,a.useEffect)((()=>{(async()=>{try{M(!0);const e=await l.FH.getCities();L(e),M(!1)}catch(e){console.error("Failed to load cities:",e),M(!1)}})()}),[]),(0,a.useEffect)((()=>{E||0!==B.length||e("/")}),[B,e,E]),(0,a.useEffect)((()=>(d(),o(),()=>{d()})),[d,o]);const D=B.filter((e=>e.name.toLowerCase().includes(Y.toLowerCase())));return E?(0,h.jsxs)(S,{children:[(0,h.jsx)(n.A,{}),(0,h.jsx)(x.A,{}),(0,h.jsx)(z,{children:(0,h.jsxs)(C,{children:[(0,h.jsx)(F,{}),(0,h.jsx)(k,{children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0433\u043e\u0440\u043e\u0434\u043e\u0432..."})]})})]}):(0,h.jsxs)(S,{children:[(0,h.jsx)(n.A,{}),(0,h.jsx)(x.A,{}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(A,{children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043e\u0440\u043e\u0434"}),(0,h.jsx)(k,{children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0432\u043e\u0439 \u0433\u043e\u0440\u043e\u0434, \u0447\u0442\u043e\u0431\u044b \u043d\u0430\u0439\u0442\u0438 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b \u043f\u043e\u0431\u043b\u0438\u0437\u043e\u0441\u0442\u0438"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(v,{children:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})}),(0,h.jsx)(u,{type:"text",placeholder:"\u041f\u043e\u0438\u0441\u043a \u0433\u043e\u0440\u043e\u0434\u0430...",value:Y,onChange:e=>_(e.target.value)})]}),D.length>0?(0,h.jsx)(c,{children:D.map((i=>(0,h.jsxs)(g,{onClick:()=>(i=>{const a=B.find((e=>e.id===i));a&&(t(a),e("/restaurant-selection"))})(i.id),onTouchStart:()=>{i.id},children:[(0,h.jsx)(w,{children:i.name}),(0,h.jsx)(f,{children:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c"})]},i.id)))}):(0,h.jsx)(y,{children:"\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e \u0433\u043e\u0440\u043e\u0434\u043e\u0432 \u043f\u043e \u0432\u0430\u0448\u0435\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443"})]}),(0,h.jsx)(p.A,{})]})}}}]);
//# sourceMappingURL=779.8f210b90.chunk.js.map