"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[538],{538:(e,r,a)=>{a.r(r),a.d(r,{default:()=>x});var n=a(43),o=a(216),t=a(464),l=a(579);const i=t.Ay.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`,d=t.Ay.h1`
  margin-bottom: 20px;
  color: var(--primary-color);
`,s=t.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: var(--card-bg);
  padding: 20px;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow);
`,c=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`,u=t.Ay.label`
  font-weight: 600;
  color: var(--text-color);
`,h=t.Ay.input`
  padding: 12px;
  border: 1px solid #333;
  border-radius: var(--border-radius-sm);
  background: var(--background-light);
  color: var(--text-color);
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`,p=t.Ay.button`
  background: var(--primary-color);
  color: white;
  padding: 12px;
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
  }
`,g=t.Ay.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
`,b=t.Ay.pre`
  background: var(--background-light);
  padding: 15px;
  border-radius: var(--border-radius-sm);
  overflow-x: auto;
  font-size: 0.9rem;
  margin: 10px 0;
`,x=()=>{(0,o.Zp)();const[e,r]=(0,n.useState)(""),[a,t]=(0,n.useState)(null);(0,n.useEffect)((()=>{const e=localStorage.getItem("BACKEND_TUNNEL_URL");e&&(t(e),r(e))}),[]);return(0,l.jsxs)(i,{children:[(0,l.jsx)(d,{children:"Tunnel Configuration"}),(0,l.jsx)(g,{children:"When using tunneling services like localhost.run, you need to set the backend API URL here. This is needed because the frontend and backend tunnels have different URLs."}),(0,l.jsxs)(s,{onSubmit:r=>{r.preventDefault();let a=e;a.endsWith("/api")||(a.endsWith("/")?a+="api":a+="/api"),localStorage.setItem("BACKEND_TUNNEL_URL",a),t(a),alert(`Tunnel URL saved: ${a}\nPlease refresh the page for changes to take effect.`)},children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(u,{htmlFor:"backendUrl",children:"Backend API Tunnel URL"}),(0,l.jsx)(h,{id:"backendUrl",type:"text",placeholder:"e.g. https://your-tunnel-url.lhr.life/api",value:e,onChange:e=>r(e.target.value),required:!0})]}),(0,l.jsxs)(g,{children:["To get your backend tunnel URL, run this command in a terminal:",(0,l.jsx)(b,{children:"ssh -R 80:localhost:8000 nokey@localhost.run"}),'Then copy the URL from the terminal output and paste it above. Make sure to add "/api" at the end if it\'s not already there.']}),(0,l.jsx)(p,{type:"submit",children:"Save Configuration"}),a&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(g,{children:["Current saved backend URL: ",(0,l.jsx)("strong",{children:a})]}),(0,l.jsx)(p,{type:"button",onClick:()=>{localStorage.removeItem("BACKEND_TUNNEL_URL"),t(null),r(""),alert("Tunnel URL configuration cleared. Please refresh the page.")},style:{background:"#d32f2f"},children:"Clear Configuration"})]})]})]})}}}]);
//# sourceMappingURL=538.e6a1bb93.chunk.js.map