"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[878],{878:(e,i,r)=>{r.r(i),r.d(i,{default:()=>X});var a=r(43),o=r(216),t=r(464),n=r(105),d=r(367),p=r(579);const l=t.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  background-color: #181818;
  min-height: 100vh;
  color: #f1f1f1;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 15px;
  }
`,s=t.Ay.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #333;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, #FF9F0D, #ffb74d);
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #181818;
    padding-top: 10px;
    margin-bottom: 20px;
  }
`,x=t.Ay.h1`
  font-size: 24px;
  color: #fff;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
    width: 100%;
  }
`,c=t.Ay.div`
  display: flex;
  gap: 10px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`,g=t.Ay.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  border: none;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 12px;
  }
`,m=(0,t.Ay)(g)`
  background-color: #FF9F0D;
  color: white;
  &:hover {
    background-color: #f08c00;
  }
`,h=(0,t.Ay)(g)`
  background-color: #232323;
  color: white;
  border: 1px solid #333;
  &:hover {
    background-color: #181818;
  }
`,b=(0,t.Ay)(g)`
  background-color: transparent;
  color: white;
  border: 1px solid #333;
  padding: 6px 12px;
  
  &:hover {
    background-color: #232323;
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px 10px;
    z-index: 101;
  }
`,u=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  background-color: #222;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    white-space: nowrap;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding: 12px 10px;
    position: sticky;
    top: 85px;
    z-index: 99;
    -ms-overflow-style: none;  /* для Internet Explorer и Edge */
    scrollbar-width: none;  /* для Firefox */
    
    &::-webkit-scrollbar {
      display: none; /* для Chrome, Safari и Opera */
    }
  }
`,f=t.Ay.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 15px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${e=>e.$active?"#FF9F0D":"#333"};
  color: white;
  font-weight: ${e=>e.$active?"600":"400"};
  box-shadow: ${e=>e.$active?"0 4px 12px rgba(255, 159, 13, 0.3)":"none"};
  
  &:hover {
    background-color: ${e=>e.$active?"#f08c00":"#444"};
    transform: translateY(-2px);
    box-shadow: ${e=>e.$active?"0 6px 14px rgba(255, 159, 13, 0.4)":"0 4px 10px rgba(0, 0, 0, 0.2)"};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
    flex-shrink: 0;
  }
`,w=t.Ay.span`
  font-size: 18px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`,v=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`,y=t.Ay.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  background-color: #222;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #333;
  
  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 159, 13, 0.2);
    transform: translateY(-5px);
    border-color: #FF9F0D;
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }
`,j=t.Ay.div`
  height: 200px;
  background-image: url(${e=>e.$imageUrl||"https://via.placeholder.com/400x300/333/555?text=\u041d\u0435\u0442+\u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f"});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    height: 150px;
  }
`,A=t.Ay.div`
  padding: 20px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 15px;
  }
`,k=t.Ay.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #fff;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 6px;
  }
`,F=t.Ay.div`
  font-weight: bold;
  font-size: 16px;
  color: #FF9F0D;
  margin-bottom: 8px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
`,z=t.Ay.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  color: white;
  background-color: ${e=>{var i;switch(e.$category||(null===(i=e.children)||void 0===i?void 0:i.toString())||""){case"\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0435":return"#FF9F0D";case"\u0421\u0443\u043f\u044b":return"#34a853";case"\u0417\u0430\u043a\u0443\u0441\u043a\u0438":return"#fbbc05";case"\u0414\u0435\u0441\u0435\u0440\u0442\u044b":return"#ea4335";case"\u041d\u0430\u043f\u0438\u0442\u043a\u0438":return"#9c27b0";default:return"#888"}}};
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 8px;
    margin-bottom: 8px;
  }
`,W=t.Ay.p`
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #ccc;
  line-height: 1.5;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`,C=t.Ay.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`,T=t.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #333;
  color: white;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background-color: #444;
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`,$=(0,t.Ay)(T)`
  background-color: #2196f3;
  
  &:hover {
    background-color: #1976d2;
  }
`,D=(0,t.Ay)(T)`
  background-color: #f44336;
  
  &:hover {
    background-color: #d32f2f;
  }
`,U=t.Ay.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${e=>e.$isAvailable?"#4caf50":"#f44336"};
  color: white;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 8px;
  }
`,E=t.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${e=>e.$isOpen?"flex":"none"};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,B=t.Ay.div`
  background-color: #222;
  border-radius: 12px;
  padding: 25px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid #333;
  max-height: 90vh;
  overflow-y: auto;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 20px;
    width: 90%;
    max-height: 80vh;
  }
`,M=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    margin-bottom: 15px;
    padding-bottom: 10px;
  }
`,S=t.Ay.h2`
  margin: 0;
  color: white;
  font-size: 20px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 18px;
  }
`,I=t.Ay.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  &:hover {
    color: white;
  }
`,R=t.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    gap: 15px;
  }
`,L=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,H=t.Ay.label`
  color: #ccc;
  font-size: 14px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 13px;
  }
`,q=t.Ay.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #FF9F0D;
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 13px;
  }
`,Y=t.Ay.textarea`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: white;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #FF9F0D;
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 13px;
    min-height: 80px;
  }
`,O=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    gap: 8px;
  }
`,V=t.Ay.label`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${e=>e.$active?"#FF9F0D":"#333"};
  color: white;
  
  &:hover {
    background-color: ${e=>e.$active?"#f08c00":"#444"};
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`,_=t.Ay.input`
  display: none;
`,G=t.Ay.span`
  margin-left: 5px;
`,Z=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,J=(t.Ay.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`,t.Ay.button`
  padding: 12px;
  border-radius: 4px;
  border: none;
  background-color: #FF9F0D;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: #f08c00;
  }
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`),K=[{id:"main",name:"\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0435",icon:"\ud83c\udf72"},{id:"soups",name:"\u0421\u0443\u043f\u044b",icon:"\ud83e\udd63"},{id:"appetizers",name:"\u0417\u0430\u043a\u0443\u0441\u043a\u0438",icon:"\ud83e\udd6a"},{id:"desserts",name:"\u0414\u0435\u0441\u0435\u0440\u0442\u044b",icon:"\ud83c\udf70"},{id:"drinks",name:"\u041d\u0430\u043f\u0438\u0442\u043a\u0438",icon:"\ud83e\udd64"}],N=e=>{const i=K.find((i=>i.id===e));return i?i.name:"\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430\u044f \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f"},P=t.Ay.div`
  margin-top: 8px;
  padding: 12px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #282828;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 10px;
  }
`,Q=t.Ay.img`
  max-width: 100%;
  max-height: 200px;
  display: block;
  margin: 0 auto;
  border-radius: 4px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    max-height: 150px;
  }
`,X=()=>{var e;const i=(0,o.Zp)(),{selectedRestaurant:r}=(0,d.Us)(),t=r||1,[g,T]=(0,a.useState)([]),[X,ee]=(0,a.useState)(!1),[ie,re]=(0,a.useState)({id:void 0,name:"",description:"",price:0,imageUrl:"",category:"",available:!0,restaurantId:t}),[ae,oe]=(0,a.useState)(null),te=(0,a.useRef)(null);(0,a.useEffect)((()=>{(async()=>{try{const e=await(0,n.gL)(t);T(e)}catch(e){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u043c\u0435\u043d\u044e:",e),T([])}})()}),[t]),(0,a.useEffect)((()=>{const e=e=>{if(X)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>{window.removeEventListener("beforeunload",e)}}),[X]),(0,a.useEffect)((()=>{const e=window.Telegram,r=e&&e.WebApp;if(r)try{return r.expand(),r.BackButton.show(),r.BackButton.onClick((()=>i("/owner/statistics"))),"function"===typeof r.enableClosingConfirmation&&r.enableClosingConfirmation(),"function"===typeof r.setHeaderColor&&r.setHeaderColor("#FF9F0D"),()=>{r.BackButton.onClick((()=>{})),"function"===typeof r.disableClosingConfirmation&&r.disableClosingConfirmation()}}catch(a){console.error("Error setting up Telegram WebApp:",a)}}),[i]);const ne=e=>{const{name:i,value:r,type:a}=e.target;if("number"===a){const e=""===r?0:parseFloat(r);re((r=>({...r,[i]:e})))}else re((e=>({...e,[i]:r})))},de=ae?g.filter((e=>e.category===ae)):g;return(0,p.jsxs)(l,{children:[(0,p.jsxs)(b,{onClick:()=>{i(-1)},children:[(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,p.jsx)("path",{d:"M19 12H5"}),(0,p.jsx)("path",{d:"M12 19l-7-7 7-7"})]}),"\u041d\u0430\u0437\u0430\u0434"]}),(0,p.jsxs)(s,{children:[(0,p.jsx)(x,{children:"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043c\u0435\u043d\u044e"}),(0,p.jsxs)(c,{children:[(0,p.jsxs)(m,{onClick:()=>{re({id:void 0,name:"",description:"",price:0,imageUrl:"",category:"",available:!0,restaurantId:t}),ee(!0)},children:[(0,p.jsx)("span",{children:"+"})," \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043b\u044e\u0434\u043e"]}),(0,p.jsxs)(h,{onClick:()=>{i("/owner/statistics")},children:[(0,p.jsx)("span",{children:"\ud83d\udcca"})," \u0417\u0430\u043a\u0430\u0437\u044b"]}),(0,p.jsxs)(h,{onClick:()=>{i("/owner/analytics")},children:[(0,p.jsx)("span",{children:"\ud83d\udcc8"})," \u0410\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430"]})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(f,{$active:null===ae,onClick:()=>oe(null),children:[(0,p.jsx)(w,{children:"\ud83c\udf7d\ufe0f"})," \u0412\u0441\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438"]}),K.map((e=>(0,p.jsxs)(f,{$active:ae===e.id,onClick:()=>oe(e.id),children:[(0,p.jsx)(w,{children:e.icon})," ",e.name]},e.id)))]}),de.length>0?(0,p.jsx)(v,{children:de.map((e=>{var i;return(0,p.jsxs)(y,{children:[(0,p.jsx)(U,{$isAvailable:null!==(i=e.available)&&void 0!==i&&i,children:e.available?"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e":"\u041d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e"}),(0,p.jsx)(j,{$imageUrl:e.imageUrl}),(0,p.jsxs)(A,{children:[(0,p.jsx)(k,{children:e.name}),(0,p.jsxs)(F,{children:["\u20bd",e.price.toLocaleString("ru-RU")]}),(0,p.jsx)(z,{children:N(e.category)}),(0,p.jsx)(W,{children:e.description}),(0,p.jsxs)(C,{children:[(0,p.jsxs)($,{onClick:()=>(e=>{re({...e}),ee(!0)})(e),children:[(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,p.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,p.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]}),"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c"]}),(0,p.jsxs)(D,{onClick:()=>(async e=>{if(window.confirm("\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e \u0431\u043b\u044e\u0434\u043e?"))try{await(0,n.ax)(e),T((i=>i.filter((i=>i.id!==e))))}catch(i){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0438 \u0431\u043b\u044e\u0434\u0430:",i),alert("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0431\u043b\u044e\u0434\u043e")}})(e.id),children:[(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,p.jsx)("path",{d:"M3 6h18"}),(0,p.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}),(0,p.jsx)("path",{d:"M10 11v6"}),(0,p.jsx)("path",{d:"M14 11v6"})]}),"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"]})]})]})]},e.id)}))}):(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px 0",backgroundColor:"#222",borderRadius:"12px",boxShadow:"0 4px 15px rgba(0, 0, 0, 0.2)",color:"#ccc",border:"1px solid #333"},children:ae?(0,p.jsxs)("p",{children:["\u0412 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438 ",N(ae)," \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0431\u043b\u044e\u0434. ",(0,p.jsx)("br",{}),"\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u043d\u043e\u0432\u043e\u0435 \u0431\u043b\u044e\u0434\u043e \u0432 \u044d\u0442\u0443 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e."]}):(0,p.jsx)("p",{children:"\u0412 \u043c\u0435\u043d\u044e \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0431\u043b\u044e\u0434. \u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u043d\u043e\u0432\u043e\u0435 \u0431\u043b\u044e\u0434\u043e, \u0447\u0442\u043e\u0431\u044b \u043e\u043d\u043e \u043f\u043e\u044f\u0432\u0438\u043b\u043e\u0441\u044c \u0437\u0434\u0435\u0441\u044c."})}),(0,p.jsx)(E,{$isOpen:X,children:(0,p.jsxs)(B,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(S,{children:ie.id?"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0431\u043b\u044e\u0434\u043e":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u043e\u0435 \u0431\u043b\u044e\u0434\u043e"}),(0,p.jsx)(I,{onClick:()=>{ee(!1)},children:"\xd7"})]}),(0,p.jsxs)(R,{onSubmit:async e=>{var i;if(e.preventDefault(),null!==(i=ie.name)&&void 0!==i&&i.trim())if(ie.category)if(!ie.price||ie.price<=0)alert("\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u0443\u044e \u0446\u0435\u043d\u0443");else try{if(ie.id){console.log("Updating existing menu item:",ie);const e=await(0,n.q2)(ie);console.log("Item updated successfully:",e),e&&(T((i=>i.map((i=>i.id===e.id?e:i)))),alert("\u0411\u043b\u044e\u0434\u043e \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e!"))}else{const e={...ie,id:Date.now(),restaurantId:t};console.log("Creating new menu item:",e);const i=await(0,n.x2)(e);console.log("Item created successfully:",i),i&&i.id>0?(T((e=>[...e,i])),alert("\u041d\u043e\u0432\u043e\u0435 \u0431\u043b\u044e\u0434\u043e \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e!")):(console.error("Failed to create menu item - invalid ID returned:",i),alert("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0438 \u0431\u043b\u044e\u0434\u0430. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430."))}ee(!1)}catch(r){console.error("Error while saving menu item:",r),alert(`\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0438 \u0431\u043b\u044e\u0434\u0430: ${r instanceof Error?r.message:"\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430"}`)}else alert("\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e \u0431\u043b\u044e\u0434\u0430");else alert("\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0431\u043b\u044e\u0434\u0430")},children:[(0,p.jsxs)(L,{children:[(0,p.jsx)(H,{htmlFor:"name",children:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0431\u043b\u044e\u0434\u0430"}),(0,p.jsx)(q,{id:"name",name:"name",value:ie.name||"",onChange:ne,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0431\u043b\u044e\u0434\u0430",required:!0})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(H,{htmlFor:"description",children:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}),(0,p.jsx)(Y,{id:"description",name:"description",value:ie.description||"",onChange:ne,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0431\u043b\u044e\u0434\u0430",required:!0})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(H,{htmlFor:"price",children:"\u0426\u0435\u043d\u0430 (\u20bd)"}),(0,p.jsx)(q,{id:"price",name:"price",type:"number",min:"1",step:"1",value:ie.price||"",onChange:ne,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0446\u0435\u043d\u0443",required:!0})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(H,{children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f"}),(0,p.jsx)(O,{children:K.map((e=>(0,p.jsxs)(V,{$active:ie.category===e.id,children:[(0,p.jsx)(_,{type:"radio",name:"categoryGroup",value:e.id,checked:ie.category===e.id,onChange:()=>{return i=e.id,void re((e=>({...e,category:i})));var i}}),(0,p.jsx)(w,{style:{marginRight:"10px"},children:e.icon}),(0,p.jsx)(G,{children:e.name})]},e.id)))})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(H,{htmlFor:"imageFile",children:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"}),(0,p.jsx)(q,{id:"imageFile",name:"imageFile",type:"file",accept:"image/*",onChange:e=>{var i;const r=null===(i=e.target.files)||void 0===i?void 0:i[0];if(!r)return;if(r.size>5242880)return void alert("\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0435. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440: 5MB");const a=new FileReader;a.onloadend=()=>{"string"===typeof a.result&&re((e=>({...e,imageUrl:a.result})))},a.readAsDataURL(r)},ref:te}),ie.imageUrl&&(0,p.jsx)(P,{children:(0,p.jsx)(Q,{src:ie.imageUrl,alt:"\u041f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440",onError:e=>{e.target.src="https://via.placeholder.com/400x300/333/555?text=\u041e\u0448\u0438\u0431\u043a\u0430+\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438"}})})]}),(0,p.jsxs)(Z,{children:[(0,p.jsx)(q,{id:"available",name:"available",type:"checkbox",checked:void 0===ie.available||ie.available,onChange:e=>{const{name:i,checked:r}=e.target;re((e=>({...e,[i]:r})))},style:{width:"auto"}}),(0,p.jsx)(H,{htmlFor:"available",style:{fontWeight:"normal"},children:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043a\u0430\u0437\u0430"})]}),(0,p.jsx)(J,{type:"submit",disabled:!(null!==(e=ie.name)&&void 0!==e&&e.trim())||!ie.category||!ie.price||ie.price<=0,children:ie.id?"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043b\u044e\u0434\u043e"})]})]})})]})}}}]);
//# sourceMappingURL=878.f14614cf.chunk.js.map