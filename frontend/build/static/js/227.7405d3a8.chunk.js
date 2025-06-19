"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[227],{227:(r,t,a)=>{a.r(t),a.d(t,{default:()=>A});var o=a(43),e=a(216),s=a(997),i=a(526),n=a(59),c=a(343),d=a(367),l=a(372),h=a(464),p=a(291),g=a(579);const m=h.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  height: 220px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: var(--box-shadow);
    
    &::after {
      opacity: 0.7;
    }
    
    .restaurant-info {
      transform: translateY(0);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3));
    opacity: 0.5;
    transition: opacity var(--transition-normal);
    z-index: 1;
  }
`,u=h.Ay.div`
  width: 100%;
  height: 100%;
  background-image: ${r=>r.$bgImage?`url(${r.$bgImage})`:"linear-gradient(45deg, var(--primary-dark), var(--primary-color))"};
  background-size: cover;
  background-position: center;
  transition: transform var(--transition-normal);
  
  ${m}:hover & {
    transform: scale(1.1);
  }
`,x=h.Ay.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--spacing-md);
  color: var(--text-color);
  z-index: 2;
  transform: translateY(10px);
  transition: transform var(--transition-normal);
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 4px;
    font-weight: 600;
  }
  
  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
  }
`,v=(0,h.Ay)(s.hD)`
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  
  &:hover {
    background-color: var(--primary-light);
  }
`,b=h.Ay.span`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`,f=h.Ay.div`
  margin-bottom: var(--spacing-md);
  position: relative;
`,y=(0,h.Ay)(s.pd)`
  padding-left: 40px;
  width: 100%;
  background-color: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 159, 13, 0.2);
  }
`,w=h.Ay.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
`,j=(0,h.Ay)(s.pp)`
  padding: var(--spacing-lg);
  margin-top: var(--spacing-md);
`,k=["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4","https://images.unsplash.com/photo-1552566626-52f8b828add9","https://images.unsplash.com/photo-1514933651103-005eec06c04b","https://images.unsplash.com/photo-1559339352-11d035aa65de"],A=()=>{const r=(0,e.Zp)(),{selectedCity:t,setSelectedRestaurant:a}=(0,d.Us)(),[h,A]=(0,o.useState)(""),[C,$]=(0,o.useState)([]),[B,z]=(0,o.useState)(!0),{showBackButton:_,hideBackButton:D,hideMainButton:L,setBackButtonCallback:F}=(0,l.A)();(0,o.useEffect)((()=>{(async()=>{if(t)try{z(!0);const r=await p.FH.getRestaurantsByCity(t.id);$(r),z(!1)}catch(r){console.error(`Failed to load restaurants for city ${t.id}:`,r),z(!1)}})()}),[t]);const S=(0,o.useMemo)((()=>(new Date).getTime()),[]),Y=(0,o.useMemo)((()=>{if(!t)return[];let r=C;if(h.trim()){const t=h.toLowerCase().trim();r=r.filter((r=>r.name.toLowerCase().includes(t)||r.address.toLowerCase().includes(t)))}return r}),[C,t,h]);(0,o.useEffect)((()=>{t||r("/city-selection")}),[t,r]),(0,o.useEffect)((()=>(t?(_(),F((()=>{r("/city-selection")}))):D(),L(),()=>{D()})),[_,D,L,F,r,t]);const E=r=>k[r%k.length];return B?(0,g.jsxs)(s.mc,{children:[(0,g.jsx)(i.A,{}),(0,g.jsx)(n.A,{}),(0,g.jsx)(s.DF,{children:(0,g.jsx)(s._k,{children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432..."})})]}):(0,g.jsx)(s.Z_,{children:(0,g.jsxs)(s.mc,{children:[(0,g.jsx)(i.A,{}),(0,g.jsx)(n.A,{}),(0,g.jsxs)(s.DF,{children:[(0,g.jsx)(s._k,{children:t?`\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b \u0432 \u0433\u043e\u0440\u043e\u0434\u0435 ${t.name}`:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d"}),(0,g.jsxs)(f,{children:[(0,g.jsx)(w,{children:(0,g.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("circle",{cx:"11",cy:"11",r:"8"}),(0,g.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]})}),(0,g.jsx)(y,{type:"text",placeholder:"\u041f\u043e\u0438\u0441\u043a \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432...",value:h,onChange:r=>A(r.target.value)})]}),Y.length>0?(0,g.jsx)(s.DZ,{children:Y.map(((t,o)=>(0,g.jsxs)(m,{onClick:()=>{return o=t.id,a(o),void r("/home");var o},children:[(0,g.jsx)(u,{$bgImage:`${t.cover_image||E(o)}?t=${S}`}),(0,g.jsxs)(b,{children:["\u2b50 ",t.rating]}),(0,g.jsxs)(x,{className:"restaurant-info",children:[(0,g.jsx)("h3",{children:t.name}),(0,g.jsx)("p",{children:t.address}),(0,g.jsx)(v,{children:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d"})]})]},t.id)))}):(0,g.jsx)(j,{children:h?"\u041d\u0435\u0442 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432, \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0445 \u0432\u0430\u0448\u0435\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443":"\u0412 \u044d\u0442\u043e\u043c \u0433\u043e\u0440\u043e\u0434\u0435 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432"})]}),(0,g.jsx)(c.A,{})]})})}},343:(r,t,a)=>{a.d(t,{A:()=>o});const o=()=>null}}]);
//# sourceMappingURL=227.7405d3a8.chunk.js.map