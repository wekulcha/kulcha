import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../contexts/AppContext';

const HeaderContainer = styled.header`
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
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  padding: 6px;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 36px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
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
`;

// Hidden gear button that's only accessible programmatically
const HiddenButton = styled.button`
  display: none;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };
  
  const handleConfigClick = () => {
    navigate('/config/tunnel');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <HeaderContainer>
      <LogoContainer onClick={handleLogoClick}>
        <LogoImage src="/assets/images/logo.png" alt="Kulcha" />
      </LogoContainer>
      
      <ActionsContainer>
        {/* Invisible button with functionality preserved */}
        <HiddenButton onClick={handleConfigClick} title="Configure Tunnel" />
        
        {/* Profile icon */}
        <ActionButton onClick={handleProfileClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </ActionButton>
      </ActionsContainer>
    </HeaderContainer>
  );
};

export default Header; 