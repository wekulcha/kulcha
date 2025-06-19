"use strict";(self.webpackChunkkulcha_app=self.webpackChunkkulcha_app||[]).push([[762],{762:(r,a,e)=>{e.r(a),e.d(a,{default:()=>H});var i=e(43),o=e(216),t=e(464),n=e(997),s=e(105),d=e(367),l=e(579);const c=(0,t.Ay)(n.Z_)`
  min-height: 100vh;
  background-color: var(--background-color);
  padding-bottom: var(--spacing-xl);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding-bottom: var(--spacing-md);
  }
`,p=t.Ay.div`
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
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-sm);
    gap: var(--spacing-sm);
  }
`,g=t.Ay.h1`
  color: var(--text-color);
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  svg {
    color: var(--primary-color);
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 1.3rem;
    width: 100%;
    justify-content: center;
  }
`,m=t.Ay.div`
  display: flex;
  gap: var(--spacing-md);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: var(--spacing-xs);
    justify-content: flex-start;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding: 0 var(--spacing-sm);
    
    /* Скрываем полосу прокрутки, но сохраняем функциональность */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`,v=t.Ay.button`
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
  
  /* Адаптация для Telegram WebApp */
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
    
    .button-text {
      display: none;
    }
    
    svg {
      margin-right: 0;
    }
  }
  
  @media (min-width: 769px) {
    svg {
      margin-right: var(--spacing-xs);
    }
  }
`,x=t.Ay.div`
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-sm);
  }
`,h=(t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary-color), var(--primary-light));
    border-top-left-radius: var(--border-radius-lg);
    border-bottom-left-radius: var(--border-radius-lg);
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }
`,t.Ay.div`
  flex: 1;
  min-width: 280px;
`,t.Ay.h2`
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xs);
`,t.Ay.p`
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
`,t.Ay.p`
  color: var(--text-color);
  line-height: 1.6;
`,t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
  }
  
  /* Адаптация для телефонов */
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`),b=t.Ay.div`
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
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`,u=t.Ay.div`
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
`,f=t.Ay.div`
  font-size: 0.9rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
`,y=t.Ay.div`
  font-size: 2rem;
  font-weight: 700;
  margin: var(--spacing-sm) 0;
  color: var(--text-color);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`,w=t.Ay.div`
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
`,k=(t.Ay.h2`
  color: var(--text-color);
  margin: var(--spacing-xl) 0 var(--spacing-md) 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--spacing-sm);
    color: var(--primary-color);
  }
  
  /* Адаптация для Telegram WebApp */
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
`,t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: var(--spacing-xl);
  height: 300px;
  position: relative;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: var(--spacing-md);
    height: 250px;
    margin-bottom: var(--spacing-lg);
  }
  
  @media (max-width: 480px) {
    height: 200px;
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }
`,t.Ay.div`
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
`,t.Ay.div`
  width: 100%;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: var(--spacing-md);
`,t.Ay.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.8fr 0.8fr;
  background-color: var(--card-bg);
  padding: var(--spacing-md);
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  
  @media (max-width: 768px) {
    grid-template-columns: 0.5fr 1fr 0.8fr 0.8fr;
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 0.3fr 1fr 0.8fr;
    font-size: 0.85rem;
  }
`,t.Ay.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.8fr 0.8fr;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--card-bg);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 0.5fr 1fr 0.8fr 0.8fr;
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 0.3fr 1fr 0.8fr;
    font-size: 0.85rem;
  }
`,t.Ay.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    &:nth-child(3) {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    &:nth-child(4) {
      display: none;
    }
  }
`,t.Ay.span`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.8rem;
  background-color: ${r=>{switch(r.$status){case"completed":return"var(--success-bg)";case"new":return"var(--warning-bg)";case"cancelled":return"var(--error-bg)";default:return"var(--card-hover)"}}};
  color: ${r=>{switch(r.$status){case"completed":return"var(--success-color)";case"new":return"var(--warning-color)";case"cancelled":return"var(--error-color)";default:return"var(--text-color)"}}};
`),A=t.Ay.div`
  margin-top: 0;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-lg);
  }
`,j=t.Ay.div`
  display: flex;
  margin-bottom: var(--spacing-md);
  padding: 10px 0;
  background-color: #222;
  border-radius: 12px;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto;
    padding: 12px 8px;
    white-space: nowrap;
    gap: var(--spacing-xs);
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    position: sticky;
    top: 0;
    background-color: #222;
    z-index: 10;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    border-radius: 8px;
    margin-bottom: var(--spacing-sm);
    
    /* Скрываем полосу прокрутки, но сохраняем функциональность */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`,$=t.Ay.button`
  padding: 8px 16px;
  background: ${r=>r.$isActive?"rgba(255, 159, 13, 0.15)":"transparent"};
  border: none;
  border-radius: 8px;
  color: ${r=>r.$isActive?"#FF9F0D":"var(--text-muted)"};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 10px; /* Добавляем отступ между кнопками */
  
  &:hover {
    color: #FF9F0D;
    background: rgba(255, 159, 13, 0.05);
  }
  
  &:last-child {
    margin-right: 0; /* Убираем отступ у последней кнопки */
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: 8px 12px;
    white-space: nowrap;
    font-size: 0.9rem;
    min-width: auto;
    flex-shrink: 0;
    scroll-snap-align: start;
    margin-right: 8px; /* Уменьшаем отступ на мобильных устройствах */
    
    &:first-child {
      margin-left: var(--spacing-xs);
    }
    
    &:last-child {
      margin-right: var(--spacing-xs);
    }
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
`,C=(0,t.Ay)($)`
  &:hover, &[data-active="true"] {
    color: #FF9F0D;
    background: ${r=>r.$isActive?"rgba(255, 159, 13, 0.15)":"rgba(255, 159, 13, 0.05)"};
  }
`,W=(0,t.Ay)($)`
  &:hover, &[data-active="true"] {
    color: #FFC107;
    background: ${r=>r.$isActive?"rgba(255, 193, 7, 0.15)":"rgba(255, 193, 7, 0.05)"};
  }
`,z=(0,t.Ay)($)`
  &:hover, &[data-active="true"] {
    color: #4CAF50;
    background: ${r=>r.$isActive?"rgba(76, 175, 80, 0.15)":"rgba(76, 175, 80, 0.05)"};
  }
`,T=(0,t.Ay)($)`
  &:hover, &[data-active="true"] {
    color: #F44336;
    background: ${r=>r.$isActive?"rgba(244, 67, 54, 0.15)":"rgba(244, 67, 54, 0.05)"};
  }
`,F=(0,t.Ay)($)`
  &:hover, &[data-active="true"] {
    color: #2196F3;
    background: ${r=>r.$isActive?"rgba(33, 150, 243, 0.15)":"rgba(33, 150, 243, 0.05)"};
  }
`,M=(0,t.Ay)($)`
  &:hover, &[data-active="true"] {
    color: #9C27B0;
    background: ${r=>r.$isActive?"rgba(156, 39, 176, 0.15)":"rgba(156, 39, 176, 0.05)"};
  }
`,B=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    gap: var(--spacing-sm);
  }
`,L=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
  }
`,S=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
`,I=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md);
  }
`,E=t.Ay.div`
  flex: 1;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    width: 100%;
  }
`,D=(t.Ay.div`
  flex: 2;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    width: 100%;
  }
`,t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--border-color-light);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`,t.Ay.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex: 3;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex: 1 0 100%;
    margin-bottom: var(--spacing-xs);
  }
`,t.Ay.div`
  font-weight: 500;
  color: var(--text-color);
`,t.Ay.div`
  flex: 1;
  color: var(--text-muted);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex: 1;
  }
`,t.Ay.div`
  flex: 1;
  text-align: right;
  font-weight: 500;
  color: var(--text-color);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex: 1;
    text-align: right;
  }
`,t.Ay.div`
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-sm);
  }
`),Y=t.Ay.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    text-align: right;
  }
`,R=t.Ay.div`
  color: var(--text-muted);
  font-size: 0.9rem;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`,N=t.Ay.div`
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--text-muted);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
`,U=(t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }
`,t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`,t.Ay.h3`
  color: var(--text-color);
  margin: 0 0 var(--spacing-md) 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--spacing-sm);
    color: var(--primary-color);
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`,t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`,t.Ay.div`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background-color: var(--card-hover);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    padding: var(--spacing-xs);
  }
`,t.Ay.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: var(--spacing-sm);
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
  }
`,t.Ay.div`
  flex: 1;
  color: var(--text-color);
  font-weight: 500;
`,t.Ay.div`
  color: var(--text-muted);
  font-size: 0.9rem;
  
  /* Адаптация для Telegram WebApp */
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`,t.Ay.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-xs);
    
    span {
      width: 6px;
      height: 6px;
      margin: 0 4px;
      border-radius: 50%;
      background-color: var(--border-color);
      transition: all 0.2s ease;
      
      &.all-active {
        background-color: #FF9F0D;
      }
      
      &.pending-active {
        background-color: #FFC107;
      }
      
      &.completed-active {
        background-color: #4CAF50;
      }
      
      &.cancelled-active {
        background-color: #F44336;
      }
      
      &.delivery-active {
        background-color: #2196F3;
      }
      
      &.pickup-active {
        background-color: #9C27B0;
      }
    }
  }
`),_=t.Ay.div`
  @media (max-width: 480px) {
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`,H=()=>{const r=(0,o.Zp)(),{isDarkMode:a}=(0,d.Us)(),[e,t]=(0,i.useState)(null),[n,$]=(0,i.useState)([]),[H,O]=(0,i.useState)([]),[V,P]=(0,i.useState)([]),[Z,J]=(0,i.useState)(0),[q,X]=(0,i.useState)(0),[G,K]=(0,i.useState)(!0),[Q,rr]=(0,i.useState)(null),[ar,er]=(0,i.useState)("all"),ir=(0,i.useRef)(null);(0,i.useEffect)((()=>{(async()=>{K(!0);const a=localStorage.getItem("adminUser")||localStorage.getItem("currentUser"),e=localStorage.getItem("isAuthenticated"),i=localStorage.getItem("userRole");if(console.log("Auth state:",{storedUser:!!a,isAuthenticated:e,userRole:i}),a&&"true"===e&&"admin"===i)try{const r=JSON.parse(a);rr(r),console.log("Current localStorage adminOrders:",localStorage.getItem("adminOrders")),console.log("Current localStorage restaurantAdminData:",localStorage.getItem("restaurantAdminData"));const e=await(0,s.EB)(r.restaurantId);console.log("Restaurant data:",e),e?(t(e),J(e.totalRevenue||0),X(e.totalOrders||0)):console.warn("Restaurant data not found for ID:",r.restaurantId);const i=await(0,s.Xx)(r.restaurantId);if(console.log("Restaurant orders:",i),i&&i.length>0){const r=i.map((r=>({...r,deliveryMethod:Math.random()>.5?"delivery":"pickup"})));$(r);const a=r.filter((r=>"completed"===r.status)),e=r.filter((r=>"new"===r.status));console.log("Completed orders:",a.length,"Pending orders:",e.length),O(a),P(e)}else $([]),O([]),P([])}catch(o){console.error("Error parsing user data:",o),r("/admin/login")}else console.log("User is not authenticated, redirecting to login"),r("/admin/login");K(!1)})()}),[r]);const or=()=>{localStorage.removeItem("isAuthenticated"),localStorage.removeItem("currentUser"),localStorage.removeItem("userRole"),localStorage.removeItem("adminUser"),r("/role-selection")},tr=r=>{const a=new Date(r);return new Intl.DateTimeFormat("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(a)},nr=r=>r.toLocaleString("ru-RU")+" \u20bd";(0,i.useEffect)((()=>{const a=window.Telegram,e=a&&a.WebApp;if(e)try{return e.expand(),e.BackButton.show(),e.BackButton.onClick((()=>r("/owner/menu"))),"function"===typeof e.enableClosingConfirmation&&e.enableClosingConfirmation(),"function"===typeof e.setHeaderColor&&e.setHeaderColor("#FF9F0D"),"function"===typeof e.setBackgroundColor&&e.setBackgroundColor("#181818"),()=>{e.BackButton.onClick((()=>{})),"function"===typeof e.disableClosingConfirmation&&e.disableClosingConfirmation()}}catch(i){console.error("Error setting up Telegram WebApp:",i)}}),[r]),(0,i.useEffect)((()=>{const r=()=>{if(ir.current){const r=ir.current.querySelector(`[data-tab="${ar}"]`);if(r){const a=r.getBoundingClientRect().left-ir.current.getBoundingClientRect().left+ir.current.scrollLeft-(window.innerWidth<=480?10:20);ir.current.scrollTo({left:a,behavior:"smooth"})}}};r();const a=()=>{r()};return window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a)}}),[ar]);const sr=r=>{er(r)};return G?(0,l.jsx)(c,{children:(0,l.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"var(--text-color)"},children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."})}):(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M3 3v18h18"}),(0,l.jsx)("path",{d:"M18 17V9"}),(0,l.jsx)("path",{d:"M13 17V5"}),(0,l.jsx)("path",{d:"M8 17v-3"})]}),"\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u043e\u0432"]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(v,{onClick:()=>{r("/owner/analytics")},children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("path",{d:"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"})}),(0,l.jsx)("span",{className:"button-text",children:"\u0410\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430"})]}),(0,l.jsxs)(v,{onClick:()=>{r("/owner/menu")},children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("path",{d:"M3 7h18M3 12h18M3 17h18"})}),(0,l.jsx)("span",{className:"button-text",children:"\u041c\u0435\u043d\u044e"})]}),(0,l.jsxs)(v,{$variant:"danger",onClick:or,children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),(0,l.jsx)("polyline",{points:"16 17 21 12 16 7"}),(0,l.jsx)("line",{x1:"21",y1:"12",x2:"9",y2:"12"})]}),(0,l.jsx)("span",{className:"button-text",children:"\u0412\u044b\u0445\u043e\u0434"})]})]})]}),(0,l.jsxs)(x,{children:[e&&(0,l.jsx)(_,{children:(0,l.jsxs)(h,{children:[(0,l.jsxs)(b,{children:[(0,l.jsxs)(u,{children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,l.jsx)("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})}),(0,l.jsx)(f,{children:"\u0412\u044b\u0440\u0443\u0447\u043a\u0430"})]}),(0,l.jsx)(y,{children:nr(Z)}),(0,l.jsxs)(w,{$isPositive:!0,children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("polyline",{points:"23 6 13.5 15.5 8.5 10.5 1 18"}),(0,l.jsx)("polyline",{points:"17 6 23 6 23 12"})]}),"+5.2%"]})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(u,{children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("rect",{x:"2",y:"3",width:"20",height:"18",rx:"2"}),(0,l.jsx)("path",{d:"M8 12h8"}),(0,l.jsx)("path",{d:"M12 16V8"})]}),(0,l.jsx)(f,{children:"\u0417\u0430\u043a\u0430\u0437\u044b"})]}),(0,l.jsx)(y,{children:q}),(0,l.jsxs)(w,{$isPositive:!0,children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("polyline",{points:"23 6 13.5 15.5 8.5 10.5 1 18"}),(0,l.jsx)("polyline",{points:"17 6 23 6 23 12"})]}),"+12.7%"]})]})]})}),(0,l.jsxs)(A,{children:[(0,l.jsxs)(j,{ref:ir,children:[(0,l.jsxs)(C,{$isActive:"all"===ar,onClick:()=>sr("all"),"data-active":"all"===ar,"data-tab":"all",children:["\u0412\u0441\u0435 \u0437\u0430\u043a\u0430\u0437\u044b (",n.length,")"]}),(0,l.jsxs)(W,{$isActive:"pending"===ar,onClick:()=>sr("pending"),"data-active":"pending"===ar,"data-tab":"pending",children:["\u041d\u043e\u0432\u044b\u0435 (",V.length,")"]}),(0,l.jsxs)(z,{$isActive:"completed"===ar,onClick:()=>sr("completed"),"data-active":"completed"===ar,"data-tab":"completed",children:["\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0435 (",H.length,")"]}),(0,l.jsxs)(T,{$isActive:"cancelled"===ar,onClick:()=>sr("cancelled"),"data-active":"cancelled"===ar,"data-tab":"cancelled",children:["\u041e\u0442\u043c\u0435\u043d\u0435\u043d\u043d\u044b\u0435 (",n.filter((r=>"cancelled"===r.status)).length,")"]}),(0,l.jsxs)(F,{$isActive:"delivery"===ar,onClick:()=>sr("delivery"),"data-active":"delivery"===ar,"data-tab":"delivery",children:["\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 (",n.filter((r=>"delivery"===r.deliveryMethod)).length,")"]}),(0,l.jsxs)(M,{$isActive:"pickup"===ar,onClick:()=>sr("pickup"),"data-active":"pickup"===ar,"data-tab":"pickup",children:["\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437 (",n.filter((r=>"pickup"===r.deliveryMethod)).length,")"]})]}),(0,l.jsxs)(U,{children:[(0,l.jsx)("span",{className:"all"===ar?"all-active":""}),(0,l.jsx)("span",{className:"pending"===ar?"pending-active":""}),(0,l.jsx)("span",{className:"completed"===ar?"completed-active":""}),(0,l.jsx)("span",{className:"cancelled"===ar?"cancelled-active":""}),(0,l.jsx)("span",{className:"delivery"===ar?"delivery-active":""}),(0,l.jsx)("span",{className:"pickup"===ar?"pickup-active":""})]}),(0,l.jsx)(B,{children:("all"===ar?n:"pending"===ar?V:"completed"===ar?H:"cancelled"===ar?n.filter((r=>"cancelled"===r.status)):"delivery"===ar?n.filter((r=>"delivery"===r.deliveryMethod)):n.filter((r=>"pickup"===r.deliveryMethod))).length>0?("all"===ar?n:"pending"===ar?V:"completed"===ar?H:"cancelled"===ar?n.filter((r=>"cancelled"===r.status)):"delivery"===ar?n.filter((r=>"delivery"===r.deliveryMethod)):n.filter((r=>"pickup"===r.deliveryMethod))).map((r=>(0,l.jsxs)(L,{children:[(0,l.jsxs)(S,{children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm)"},children:[(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}),(0,l.jsx)("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),(0,l.jsx)("path",{d:"M16 10a4 4 0 0 1-8 0"})]}),(0,l.jsxs)("div",{children:["\u0417\u0430\u043a\u0430\u0437 \u2116",r.id]})]}),(0,l.jsx)(k,{$status:r.status,children:"new"===r.status?"\u041d\u043e\u0432\u044b\u0439":"confirmed"===r.status?"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043d":"preparing"===r.status?"\u0413\u043e\u0442\u043e\u0432\u0438\u0442\u0441\u044f":"ready"===r.status?"\u0413\u043e\u0442\u043e\u0432":"completed"===r.status?"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d":"\u041e\u0442\u043c\u0435\u043d\u0451\u043d"})]}),(0,l.jsx)(I,{children:(0,l.jsxs)(E,{children:[(0,l.jsxs)("div",{style:{marginBottom:"var(--spacing-sm)"},children:[(0,l.jsx)("strong",{children:"\u041a\u043b\u0438\u0435\u043d\u0442:"})," ",r.customer]}),(0,l.jsxs)("div",{style:{marginBottom:"var(--spacing-sm)"},children:[(0,l.jsx)("strong",{children:"\u0414\u0430\u0442\u0430:"})," ",tr(r.date)]}),(0,l.jsxs)("div",{style:{marginBottom:"var(--spacing-sm)"},children:[(0,l.jsx)("strong",{children:"\u0421\u043f\u043e\u0441\u043e\u0431 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f:"})," ","delivery"===r.deliveryMethod?"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430":"\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437"]})]})}),(0,l.jsxs)(D,{children:[(0,l.jsx)(R,{children:tr(r.date)}),(0,l.jsx)(Y,{children:nr(r.amount)})]})]},r.id))):(0,l.jsx)(N,{children:"\u041d\u0435\u0442 \u0437\u0430\u043a\u0430\u0437\u043e\u0432 \u0434\u043b\u044f \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f"})})]})]})]})}},997:(r,a,e)=>{e.d(a,{$n:()=>b,DF:()=>t,DZ:()=>n,JU:()=>c,WB:()=>f,Wk:()=>h,Z_:()=>w,_k:()=>x,gE:()=>l,gO:()=>u,hD:()=>d,jt:()=>g,m_:()=>m,mc:()=>o,pd:()=>p,pp:()=>y,rd:()=>v});var i=e(464);const o=i.Ay.div`
  max-width: 100%;
  padding: 0 var(--spacing-md);
  margin: 0 auto;
  width: 100%;
`,t=(i.Ay.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg) 0;
  position: relative;
  margin-bottom: var(--spacing-md);
`,i.Ay.div`
  width: 120px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`,i.Ay.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform var(--transition-normal);
  
  &:hover {
    transform: scale(1.05);
  }
`,i.Ay.nav`
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
`,i.Ay.button`
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
`,i.Ay.main`
  padding: var(--spacing-md) 0;
`),n=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
`,s=i.Ay.div`
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
`,d=(i.Ay.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  transition: transform var(--transition-normal);
  
  ${s}:hover & {
    transform: scale(1.05);
  }
`,i.Ay.div`
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
`,i.Ay.h3`
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--text-color);
`,i.Ay.p`
  font-size: 1rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
`,i.Ay.button`
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
`),l=(i.Ay.footer`
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg) 0;
  text-align: center;
  border-top: 1px solid var(--card-bg);
`,i.Ay.button`
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
`,i.Ay.button`
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
`,i.Ay.div`
  margin-bottom: var(--spacing-lg);
`),c=i.Ay.label`
  display: block;
  margin-bottom: var(--spacing-sm);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
`,p=i.Ay.input`
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
`,g=(i.Ay.select`
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
`,i.Ay.div`
  display: flex;
  gap: var(--spacing-sm);
  margin: var(--spacing-lg) 0;
`),m=i.Ay.button`
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
`,v=i.Ay.div`
  margin-top: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`,x=i.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
`,h=i.Ay.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
  font-weight: 600;
`,b=i.Ay.button`
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
`,u=i.Ay.div`
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
`,f=(i.Ay.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
`,i.Ay.p`
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-top: var(--spacing-sm);
  font-weight: 600;
`,i.Ay.div`
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`),y=(i.Ay.span`
  background-color: var(--primary-color);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: var(--spacing-xs);
`,i.Ay.hr`
  border: none;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: var(--spacing-md) 0;
`,i.Ay.div`
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
`),w=i.Ay.div`
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
`;i.Ay.div`
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
`,i.Ay.h3`
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
//# sourceMappingURL=762.982aad7a.chunk.js.map