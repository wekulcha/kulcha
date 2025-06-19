"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[283],{283:(r,a,o)=>{o.r(a),o.d(a,{default:()=>M});var e=o(43),i=o(216),n=o(464),t=o(997),s=o(105),d=o(579);const c=(0,n.Ay)(t.Z_)`
  min-height: 100vh;
  background-color: var(--background-color);
`,l=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
`,g=n.Ay.h1`
  color: var(--text-color);
  margin: 0;
  font-size: 1.5rem;
`,p=n.Ay.button`
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: var(--primary-dark);
  }
`,v=n.Ay.div`
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`,m=n.Ay.h2`
  color: var(--text-color);
  margin: var(--spacing-xl) 0 var(--spacing-md) 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,x=n.Ay.button`
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--success-color);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: var(--success-dark);
  }
`,h=n.Ay.div`
  width: 100%;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: var(--spacing-md);
`,b=n.Ay.div`
  display: grid;
  grid-template-columns: 0.6fr 1.5fr 2fr 0.8fr 0.6fr 0.8fr;
  background-color: var(--card-bg);
  padding: var(--spacing-md);
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  
  @media (max-width: 768px) {
    grid-template-columns: 0.6fr 1.5fr 0.8fr 0.6fr 0.6fr;
  }
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: 0.6fr 1.5fr 2fr 0.8fr 0.6fr 0.8fr;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--card-bg);
  transition: background-color 0.2s;
  align-items: center;

  &:hover {
    background-color: var(--card-hover);
  }

  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 0.6fr 1.5fr 0.8fr 0.6fr 0.6fr;
  }
`,y=n.Ay.div`
  display: flex;
  align-items: center;
`,f=n.Ay.span`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.8rem;
  background-color: ${r=>r.available?"var(--success-bg)":"var(--error-bg)"};
  color: ${r=>r.available?"var(--success-color)":"var(--error-color)"};
`,w=n.Ay.button`
  padding: 6px;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: ${r=>"edit"===r.variant?"var(--primary-bg)":"var(--error-bg)"};
  color: ${r=>"edit"===r.variant?"var(--primary-color)":"var(--error-color)"};
  cursor: pointer;
  margin-right: 5px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${r=>"edit"===r.variant?"var(--primary-light-bg)":"var(--error-light-bg)"};
  }
`,k=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${r=>r.isOpen?"flex":"none"};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,j=n.Ay.div`
  background-color: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,A=n.Ay.h2`
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: var(--spacing-lg);
  font-size: 1.3rem;
`,z=n.Ay.div`
  margin-bottom: var(--spacing-md);
`,C=n.Ay.label`
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
  font-size: 0.9rem;
`,$=n.Ay.input`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-color);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 159, 13, 0.2);
  }
`,S=n.Ay.textarea`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-color);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 159, 13, 0.2);
  }
`,F=n.Ay.select`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-color);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 159, 13, 0.2);
  }
`,L=n.Ay.div`
  display: flex;
  align-items: center;
  
  input {
    margin-right: var(--spacing-sm);
  }
  
  label {
    margin-bottom: 0;
  }
`,I=n.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`,Y=n.Ay.button`
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  background-color: ${r=>{switch(r.variant){case"primary":return"var(--primary-color)";case"danger":return"var(--error-color)";default:return"var(--card-hover)"}}};
  color: ${r=>"cancel"===r.variant?"var(--text-color)":"white"};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${r=>{switch(r.variant){case"primary":return"var(--primary-dark)";case"danger":return"var(--error-dark)";default:return"var(--border-color)"}}};
  }
`,B=n.Ay.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-muted);
`,M=()=>{const r=(0,i.Zp)(),[a,o]=(0,e.useState)([]),[n,t]=(0,e.useState)(!1),[M,E]=(0,e.useState)(""),[U,W]=(0,e.useState)(!0),[D,_]=(0,e.useState)(!1),[N,O]=(0,e.useState)("create"),[Z,H]=(0,e.useState)(null),[R,V]=(0,e.useState)(0),[q,J]=(0,e.useState)({name:"",description:"",price:"",image:"",category:"main",available:!0}),[G,K]=(0,e.useState)(!1),[P,Q]=(0,e.useState)(null);(0,e.useEffect)((()=>{const a=localStorage.getItem("isAuthenticated"),e=localStorage.getItem("userRole"),i=localStorage.getItem("currentUser");if("true"!==a||"admin"!==e)return void r("/admin/login");(async()=>{if(i){const r=JSON.parse(i);try{const a=await(0,s.Nr)(r.restaurantId);o(a),V(r.restaurantId);const e=await(0,s.EB)(r.restaurantId);e&&E(e.name),t(!0)}catch(a){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0434\u0430\u043d\u043d\u044b\u0445:",a)}}else r("/admin/login");W(!1)})()}),[r]);const T=()=>{O("create"),J({name:"",description:"",price:"",image:"",category:"main",available:!0}),_(!0)},X=r=>{const{name:a,value:o,type:e}=r.target;if("checkbox"===e){const o=r.target.checked;J((r=>({...r,[a]:o})))}else J((r=>({...r,[a]:o})))};return U?(0,d.jsx)(c,{children:(0,d.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"var(--text-color)"},children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."})}):n?(0,d.jsxs)(c,{children:[(0,d.jsxs)(l,{children:[(0,d.jsx)(g,{children:"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043c\u0435\u043d\u044e"}),(0,d.jsxs)(p,{onClick:()=>r("/admin/dashboard"),children:[(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("path",{d:"M15 18l-6-6 6-6"})}),"\u041d\u0430\u0437\u0430\u0434"]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(m,{children:[M?`\u041c\u0435\u043d\u044e \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u0430 "${M}"`:"\u041c\u0435\u043d\u044e \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u0430",(0,d.jsxs)(x,{onClick:T,children:[(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,d.jsx)("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),(0,d.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043b\u044e\u0434\u043e"]})]}),a.length>0?(0,d.jsxs)(h,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"ID"}),(0,d.jsx)(y,{children:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"}),(0,d.jsx)(y,{children:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}),(0,d.jsx)(y,{children:"\u0426\u0435\u043d\u0430"}),(0,d.jsx)(y,{children:"\u0421\u0442\u0430\u0442\u0443\u0441"}),(0,d.jsx)(y,{children:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044f"})]}),a.map((r=>{var a,e;return(0,d.jsxs)(u,{children:[(0,d.jsxs)(y,{children:["#",r.id]}),(0,d.jsx)(y,{children:r.name}),(0,d.jsx)(y,{style:{fontSize:"0.9rem"},children:r.description.length>100?`${r.description.substring(0,100)}...`:r.description}),(0,d.jsxs)(y,{children:["\u20bd",r.price]}),(0,d.jsx)(y,{children:(0,d.jsx)(f,{available:null!==(a=r.available)&&void 0!==a&&a,onClick:()=>(async r=>{const a={...r,available:!r.available};try{const e=await(0,s.q2)(a);o((a=>a.map((a=>a.id===r.id?e:a))))}catch(e){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0438 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0441\u0442\u0438:",e)}})(r),style:{cursor:"pointer"},children:null!==(e=r.available)&&void 0!==e&&e?"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e":"\u041d\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e"})}),(0,d.jsx)(y,{children:(0,d.jsxs)("div",{style:{display:"flex"},children:[(0,d.jsx)(w,{variant:"edit",onClick:()=>(r=>{H(r.id),O("edit"),J({name:r.name,description:r.description,price:r.price.toString(),image:r.imageUrl||"",category:r.category||"main",available:r.available||!0}),_(!0)})(r),children:(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("path",{d:"M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"})})}),(0,d.jsx)(w,{variant:"delete",onClick:()=>{return a=r.id,Q(a),void K(!0);var a},children:(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,d.jsx)("path",{d:"M3 6h18"}),(0,d.jsx)("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),(0,d.jsx)("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})]})})]})})]},r.id)}))]}):(0,d.jsxs)(B,{children:[(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{margin:"0 auto 16px",display:"block",opacity:.6},children:[(0,d.jsx)("path",{d:"M8 3v3a2 2 0 0 1-2 2H3"}),(0,d.jsx)("path",{d:"M21 8h-3a2 2 0 0 1-2-2V3"}),(0,d.jsx)("path",{d:"M3 16h3a2 2 0 0 1 2 2v3"}),(0,d.jsx)("path",{d:"M16 21v-3a2 2 0 0 1 2-2h3"})]}),(0,d.jsx)("p",{children:"\u0412 \u043c\u0435\u043d\u044e \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0431\u043b\u044e\u0434. \u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u043f\u0435\u0440\u0432\u043e\u0435 \u0431\u043b\u044e\u0434\u043e!"}),(0,d.jsx)(Y,{variant:"primary",onClick:T,style:{margin:"16px auto",display:"block"},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043b\u044e\u0434\u043e"})]})]}),(0,d.jsx)(k,{isOpen:D,children:(0,d.jsxs)(j,{children:[(0,d.jsx)(A,{children:"create"===N?"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u043e\u0435 \u0431\u043b\u044e\u0434\u043e":"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0431\u043b\u044e\u0434\u043e"}),(0,d.jsxs)(z,{children:[(0,d.jsx)(C,{htmlFor:"name",children:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"}),(0,d.jsx)($,{id:"name",name:"name",value:q.name,onChange:X,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0431\u043b\u044e\u0434\u0430"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(C,{htmlFor:"description",children:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}),(0,d.jsx)(S,{id:"description",name:"description",value:q.description,onChange:X,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0431\u043b\u044e\u0434\u0430"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(C,{htmlFor:"price",children:"\u0426\u0435\u043d\u0430 (\u20bd)"}),(0,d.jsx)($,{id:"price",name:"price",type:"number",value:q.price,onChange:X,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0446\u0435\u043d\u0443 \u0431\u043b\u044e\u0434\u0430"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(C,{htmlFor:"image",children:"URL \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f"}),(0,d.jsx)($,{id:"image",name:"image",value:q.image,onChange:X,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 URL \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0431\u043b\u044e\u0434\u0430"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(C,{htmlFor:"category",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f"}),(0,d.jsxs)(F,{id:"category",name:"category",value:q.category,onChange:X,children:[(0,d.jsx)("option",{value:"main",children:"\u041e\u0441\u043d\u043e\u0432\u043d\u044b\u0435 \u0431\u043b\u044e\u0434\u0430"}),(0,d.jsx)("option",{value:"appetizers",children:"\u0417\u0430\u043a\u0443\u0441\u043a\u0438"}),(0,d.jsx)("option",{value:"desserts",children:"\u0414\u0435\u0441\u0435\u0440\u0442\u044b"}),(0,d.jsx)("option",{value:"drinks",children:"\u041d\u0430\u043f\u0438\u0442\u043a\u0438"})]})]}),(0,d.jsx)(z,{children:(0,d.jsxs)(L,{children:[(0,d.jsx)("input",{id:"available",name:"available",type:"checkbox",checked:q.available,onChange:r=>{const{name:a,checked:o}=r.target;J((r=>({...r,[a]:o})))}}),(0,d.jsx)(C,{htmlFor:"available",children:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043a\u0430\u0437\u0430"})]})}),(0,d.jsxs)(I,{children:[(0,d.jsx)(Y,{variant:"cancel",onClick:()=>_(!1),children:"\u041e\u0442\u043c\u0435\u043d\u0430"}),(0,d.jsx)(Y,{variant:"primary",onClick:async()=>{if((()=>{if(!q.name.trim())return!1;if(!q.description.trim())return!1;const r=Number(q.price);return!(isNaN(r)||r<=0)&&!!q.category})()){if("create"===N){const a={id:Date.now(),name:q.name,description:q.description,price:parseFloat(q.price),imageUrl:q.image,category:q.category,available:q.available,restaurantId:R};try{const r=await(0,s.x2)(a);o((a=>[...a,r]))}catch(r){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0438 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u0430 \u043c\u0435\u043d\u044e:",r),alert("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u044d\u043b\u0435\u043c\u0435\u043d\u0442 \u043c\u0435\u043d\u044e")}}else if("edit"===N&&null!==Z){const a={id:Z,name:q.name,description:q.description,price:parseFloat(q.price),imageUrl:q.image,category:q.category,available:q.available,restaurantId:R};try{const r=await(0,s.q2)(a);o((a=>a.map((a=>a.id===Z?r:a))))}catch(r){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0438 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u0430 \u043c\u0435\u043d\u044e:",r),alert("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u044d\u043b\u0435\u043c\u0435\u043d\u0442 \u043c\u0435\u043d\u044e")}}_(!1),J({name:"",description:"",price:"",image:"",category:"main",available:!0}),H(null)}else alert("\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e")},children:"create"===N?"\u0421\u043e\u0437\u0434\u0430\u0442\u044c":"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})]})]})}),(0,d.jsx)(k,{isOpen:G,children:(0,d.jsxs)(j,{children:[(0,d.jsx)(A,{children:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f"}),(0,d.jsx)("p",{style:{color:"var(--text-color)",marginBottom:"var(--spacing-lg)"},children:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e\u0442 \u043f\u0443\u043d\u043a\u0442 \u043c\u0435\u043d\u044e? \u042d\u0442\u043e \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043d\u0435\u043b\u044c\u0437\u044f \u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c."}),(0,d.jsxs)(I,{children:[(0,d.jsx)(Y,{variant:"cancel",onClick:()=>K(!1),children:"\u041e\u0442\u043c\u0435\u043d\u0430"}),(0,d.jsx)(Y,{variant:"danger",onClick:async()=>{if(P){try{await(0,s.ax)(P),o((r=>r.filter((r=>r.id!==P))))}catch(r){console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0438 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u0430 \u043c\u0435\u043d\u044e:",r),alert("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u043b\u0435\u043c\u0435\u043d\u0442 \u043c\u0435\u043d\u044e")}K(!1),Q(null)}},children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]})]})})]}):null}},997:(r,a,o)=>{o.d(a,{$n:()=>b,DF:()=>n,DZ:()=>t,JU:()=>l,WB:()=>y,Wk:()=>h,Z_:()=>w,_k:()=>x,gE:()=>c,gO:()=>u,hD:()=>d,jt:()=>p,m_:()=>v,mc:()=>i,pd:()=>g,pp:()=>f,rd:()=>m});var e=o(464);const i=e.Ay.div`
  max-width: 100%;
  padding: 0 var(--spacing-md);
  margin: 0 auto;
  width: 100%;
`,n=(e.Ay.header`
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
`),t=e.Ay.div`
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
`),v=e.Ay.button`
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
`,m=e.Ay.div`
  margin-top: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`,x=e.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
`,h=e.Ay.h2`
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
`,u=e.Ay.div`
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
`,y=(e.Ay.p`
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
`),f=(e.Ay.span`
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
//# sourceMappingURL=283.822b690f.chunk.js.map