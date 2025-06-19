"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[282],{282:(r,e,a)=>{a.r(e),a.d(e,{default:()=>P});var o=a(43),t=a(216),i=a(464),s=a(997),n=a(526),d=a(59),l=a(367),c=a(372),p=a(343),m=a(105),h=a(274),g=a(579);const x=i.Ay.div`
  padding: var(--spacing-md);
  max-width: 1400px;
  margin: 0 auto;
`,u=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`,v=i.Ay.h2`
  margin: 0;
  color: var(--text-color);
`,f=i.Ay.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  overflow-x: auto;
  padding-bottom: var(--spacing-xs);
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--card-bg);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }
`,b=i.Ay.button`
  background-color: ${r=>r.$active?"var(--primary-color)":"var(--card-bg)"};
  color: ${r=>r.$active?"white":"var(--text-color)"};
  border: none;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: ${r=>r.$active?"600":"400"};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  
  svg, span {
    margin-right: var(--spacing-xs);
    font-size: 1.1rem;
  }
  
  &:hover {
    background-color: ${r=>r.$active?"var(--primary-light)":"var(--card-hover)"};
    transform: translateY(-2px);
  }
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
  transition: opacity 0.3s ease;
`,y=i.Ay.div`
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--card-bg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    img {
      transform: scale(1.05);
    }
  }
`,j=i.Ay.div`
  height: 180px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.2) 100%);
    pointer-events: none;
  }
`,k=i.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`,A=i.Ay.div`
  padding: var(--spacing-md);
`,C=i.Ay.h3`
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 1.1rem;
  color: var(--text-color);
`,z=i.Ay.p`
  margin: 0 0 var(--spacing-md) 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,L=i.Ay.div`
  font-weight: 700;
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: var(--spacing-sm);
`,M=i.Ay.button`
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  gap: var(--spacing-xs);
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.added {
    background-color: #4CAF50; /* Зеленый цвет для успешного добавления */
    animation: pulse 0.6s ease-in-out;
  }
  
  &.added svg {
    transform: scale(1.2) rotate(-10deg);
    animation: bounce 0.5s ease-in-out;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes bounce {
    0% { transform: scale(1) rotate(0); }
    25% { transform: scale(1.4) rotate(-20deg); }
    50% { transform: scale(1.2) rotate(10deg); }
    75% { transform: scale(1.3) rotate(-5deg); }
    100% { transform: scale(1.2) rotate(0); }
  }
`,$=i.Ay.span`
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: var(--border-radius-sm);
  font-size: 0.8rem;
  z-index: 5;
`,B=i.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: var(--spacing-md);
    color: var(--border-color);
  }
  
  h3 {
    margin: 0 0 var(--spacing-xs) 0;
    color: var(--text-color);
  }
  
  p {
    margin: 0;
  }
`,Y=[{id:"all",name:"\u0412\u0441\u0435",icon:"\ud83c\udf7d\ufe0f"},{id:"main",name:"\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0435",icon:"\ud83c\udf72"},{id:"soups",name:"\u0421\u0443\u043f\u044b",icon:"\ud83e\udd63"},{id:"appetizers",name:"\u0417\u0430\u043a\u0443\u0441\u043a\u0438",icon:"\ud83e\udd6a"},{id:"desserts",name:"\u0414\u0435\u0441\u0435\u0440\u0442\u044b",icon:"\ud83c\udf70"},{id:"drinks",name:"\u041d\u0430\u043f\u0438\u0442\u043a\u0438",icon:"\ud83e\udd64"}],U={main:"\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0435",soups:"\u0421\u0443\u043f",appetizers:"\u0417\u0430\u043a\u0443\u0441\u043a\u0430",desserts:"\u0414\u0435\u0441\u0435\u0440\u0442",drinks:"\u041d\u0430\u043f\u0438\u0442\u043e\u043a"},F=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  height: 32px;
`,I=i.Ay.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--card-hover);
  color: var(--text-color);
  border: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-light);
    color: white;
    transform: scale(1.1);
  }
  
  &:disabled {
    background-color: var(--border-color);
    color: var(--text-secondary);
    cursor: not-allowed;
    transform: none;
  }
`,S=i.Ay.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.1rem;
`,W=i.Ay.div`
  position: absolute;
  top: -20px;
  right: 10px;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.2rem;
  animation: flyUp 0.8s forwards;
  opacity: 0;
  z-index: 10;
  
  @keyframes flyUp {
    0% { transform: translateY(0); opacity: 0; }
    10% { opacity: 1; }
    70% { opacity: 1; }
    100% { transform: translateY(-40px); opacity: 0; }
  }
`,T=(0,i.Ay)(y)`
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: ${r=>r.$delay}s;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`,E=(0,i.Ay)(w)`
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,R=r=>{let{menuItems:e}=r;const[a,t]=(0,o.useState)("all"),{addToCart:i}=(0,l.Us)(),[s,n]=(0,o.useState)({}),[d,c]=(0,o.useState)({}),[p,m]=(0,o.useState)({}),[w,y]=(0,o.useState)(!0);(0,o.useEffect)((()=>{y(!0);const r=setTimeout((()=>{y(!1)}),800);return()=>clearTimeout(r)}),[a]);const R=(0,o.useCallback)((r=>d[r]||1),[d]),Z=(0,o.useCallback)((r=>{c((e=>({...e,[r]:Math.min((e[r]||1)+1,10)})))}),[]),_=(0,o.useCallback)((r=>{c((e=>({...e,[r]:Math.max((e[r]||1)-1,1)})))}),[]),H=(0,o.useCallback)((r=>{if(s[r.id])return;n((e=>({...e,[r.id]:!0})));const e=R(r.id);m((e=>({...e,[r.id]:!0}))),setTimeout((()=>{m((e=>({...e,[r.id]:!1})))}),800),i({...r,quantity:e}),setTimeout((()=>{n((e=>({...e,[r.id]:!1})))}),1500)}),[i,s,R]),N=(0,o.useMemo)((()=>{const r=e.map((r=>({...r,category:r.name.toLowerCase().includes("\u0441\u0443\u043f")||r.name.toLowerCase().includes("\u0431\u0443\u043b\u044c\u043e\u043d")||r.name.toLowerCase().includes("\u0448\u0443\u0440\u043f\u0430")||r.name.toLowerCase().includes("\u043b\u0430\u0433\u043c\u0430\u043d")?"soups":r.category})));return"all"===a?r:r.filter((r=>r.category===a&&r.available))}),[e,a]),q=(0,o.useCallback)((r=>{t(r)}),[]),D=(0,o.useMemo)((()=>(0,g.jsx)(h.A,{text:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043c\u0435\u043d\u044e..."})),[]),V=(0,o.useMemo)((()=>w?D:0===N.length?(0,g.jsxs)(B,{children:[(0,g.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M3 2h18"}),(0,g.jsx)("path",{d:"M10 11v4"}),(0,g.jsx)("path",{d:"M14 9v6"}),(0,g.jsx)("path",{d:"M4 22h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"})]}),(0,g.jsx)("h3",{children:"\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0445 \u0431\u043b\u044e\u0434"}),(0,g.jsx)("p",{children:"\u0412 \u0434\u0430\u043d\u043d\u043e\u0439 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0431\u043b\u044e\u0434."})]}):(0,g.jsx)(E,{children:N.map(((r,e)=>{return(0,g.jsxs)(T,{$delay:e%8*.05,children:[(0,g.jsxs)(j,{children:[(0,g.jsx)($,{children:U[r.category]||"\u0411\u043b\u044e\u0434\u043e"}),(0,g.jsx)(k,{src:r.imageUrl||"/food-placeholder.png",alt:r.name,loading:"lazy",onError:r=>{r.target.src="/food-placeholder.png"}})]}),(0,g.jsxs)(A,{children:[(0,g.jsx)(C,{children:r.name}),(0,g.jsx)(z,{children:r.description}),(0,g.jsxs)(L,{children:["\u20bd",(a=r.price,new Intl.NumberFormat("ru-RU").format(a))]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(I,{onClick:()=>_(r.id),disabled:R(r.id)<=1||s[r.id],children:"-"}),(0,g.jsx)(S,{children:R(r.id)}),(0,g.jsx)(I,{onClick:()=>Z(r.id),disabled:R(r.id)>=10||s[r.id],children:"+"})]}),(0,g.jsxs)(M,{onClick:()=>H(r),className:s[r.id]?"added":"",disabled:s[r.id],children:[p[r.id]&&(0,g.jsxs)(W,{children:["+",R(r.id)]}),s[r.id]?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,g.jsx)("polyline",{points:"20 6 9 17 4 12"})}),"\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e"]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"}),(0,g.jsx)("path",{d:"M20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"}),(0,g.jsx)("path",{d:"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"})]}),R(r.id)>1?`\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c (${R(r.id)})`:"\u0412 \u043a\u043e\u0440\u0437\u0438\u043d\u0443"]})]})]})]},r.id);var a}))})),[N,H,s,R,Z,_,p,w,D]);return(0,g.jsxs)(x,{children:[(0,g.jsx)(u,{children:(0,g.jsx)(v,{children:"\u041c\u0435\u043d\u044e"})}),(0,g.jsx)(f,{children:Y.map((r=>(0,g.jsxs)(b,{$active:a===r.id,onClick:()=>q(r.id),children:[(0,g.jsx)("span",{children:r.icon})," ",r.name]},r.id)))}),V]})},Z=o.memo(R),_=(0,i.Ay)(s.Z_)`
  min-height: 70vh;
`,H=i.Ay.div`
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 768px) {
    height: 300px;
  }
`,N=i.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-lg);
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
`,q=i.Ay.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/images/paneer-tikka.jpg');
  background-position: center;
  background-size: cover;
  transform: scale(1.05);
  filter: brightness(0.9);
  animation: subtle-zoom 30s infinite alternate;
  
  @keyframes subtle-zoom {
    0% {
      transform: scale(1.05) translate(0%, 0%);
    }
    100% {
      transform: scale(1.15) translate(-2%, -1%);
    }
  }
`,D=i.Ay.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 70%;
  
  @media (max-width: 600px) {
    font-size: 1.8rem;
    max-width: 100%;
  }
`,V=i.Ay.p`
  font-size: 1.2rem;
  margin-bottom: var(--spacing-md);
  color: rgba(255, 255, 255, 0.9);
  max-width: 60%;
  
  @media (max-width: 600px) {
    font-size: 1rem;
    max-width: 100%;
  }
`,G=i.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(255, 159, 13, 0.3);
  transition: all 0.2s ease;
  
  svg {
    margin-right: var(--spacing-xs);
  }
  
  &:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 159, 13, 0.4);
  }
`,J=i.Ay.div`
  margin-bottom: var(--spacing-lg);
`,K=i.Ay.h2`
  color: var(--text-color);
  margin: 0 0 var(--spacing-xs) 0;
`,O=i.Ay.p`
  color: var(--text-secondary);
  margin: 0;
`,P=()=>{const r=(0,t.Zp)(),{selectedCity:e,selectedRestaurant:a,setSelectedRestaurant:i,restaurants:h}=(0,l.Us)(),{hideBackButton:x,hideMainButton:u}=(0,c.A)(),[v,f]=(0,o.useState)([]),b=a?h.find((r=>r.id===a)):null;(0,o.useEffect)((()=>{x(),u(),e?a||r("/restaurant-selection",{replace:!0}):r("/city-selection",{replace:!0})}),[x,u,e,a,r]),(0,o.useEffect)((()=>{if(a){(async()=>{try{const r=await(0,m.gL)(a);f(r)}catch(r){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u043c\u0435\u043d\u044e:",r),f([])}})()}}),[a]);const w=()=>{u(),e?a||r("/restaurant-selection"):r("/city-selection")};return(0,g.jsx)(_,{children:(0,g.jsxs)(s.mc,{children:[(0,g.jsx)(n.A,{}),(0,g.jsx)(d.A,{}),(0,g.jsx)(s.DF,{children:e&&a?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(q,{}),(0,g.jsxs)(N,{children:[(0,g.jsx)(D,{children:null===b||void 0===b?void 0:b.name}),(0,g.jsxs)(V,{children:["\u041d\u0430\u0441\u043b\u0430\u0434\u0438\u0442\u0435\u0441\u044c \u043b\u0443\u0447\u0448\u0435\u0439 \u0435\u0434\u043e\u0439 \u0432 ",(null===e||void 0===e?void 0:e.name)||""]}),(0,g.jsxs)(G,{onClick:()=>{i(null),r("/restaurant-selection")},children:[(0,g.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,g.jsx)("path",{d:"M9 14l6-6-6-6"})}),"\u0421\u043c\u0435\u043d\u0438\u0442\u044c \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d"]})]})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)(K,{children:null===b||void 0===b?void 0:b.name}),(0,g.jsxs)(O,{children:[null===e||void 0===e?void 0:e.name,", ",null===b||void 0===b?void 0:b.address]})]}),(0,g.jsx)(Z,{menuItems:v})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(q,{}),(0,g.jsxs)(N,{children:[(0,g.jsx)(D,{children:"\u0412\u043a\u0443\u0441\u043d\u0430\u044f \u0435\u0434\u0430 \u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u043e\u0439"}),(0,g.jsx)(V,{children:"\u041e\u0442\u043a\u0440\u043e\u0439\u0442\u0435 \u0434\u043b\u044f \u0441\u0435\u0431\u044f \u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0447\u043d\u044b\u0435 \u0432\u043a\u0443\u0441\u044b \u043b\u0443\u0447\u0448\u0438\u0445 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432"}),(0,g.jsxs)(G,{onClick:w,children:[(0,g.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,g.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),"\u041d\u0430\u0447\u0430\u0442\u044c"]})]})]}),(0,g.jsxs)(s.pp,{children:[(0,g.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,g.jsx)("circle",{cx:"12",cy:"10",r:"3"})]}),(0,g.jsx)("h3",{children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435"}),(0,g.jsx)("p",{children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043e\u0440\u043e\u0434 \u0438 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d, \u0447\u0442\u043e\u0431\u044b \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043c\u0435\u043d\u044e"}),(0,g.jsxs)(G,{onClick:w,children:[(0,g.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,g.jsx)("circle",{cx:"12",cy:"10",r:"3"})]}),"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u043c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435"]})]})]})}),(0,g.jsx)(p.A,{})]})})}},343:(r,e,a)=>{a.d(e,{A:()=>o});const o=()=>null}}]);
//# sourceMappingURL=282.266eadb7.chunk.js.map