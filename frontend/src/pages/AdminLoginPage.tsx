import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateOwner, getCSRFToken } from '../data/adminDatabase';
import { PageTransition } from '../styles/Components';

const Container = styled(PageTransition)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
  padding: var(--spacing-lg);
`;

const LoginCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  color: var(--text-color);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const Label = styled.label`
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  background-color: var(--input-bg);
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  background-color: var(--error-bg);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  svg {
    min-width: 20px;
  }
`;

const SubmitButton = styled.button`
  padding: var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: white;
  margin-top: var(--spacing-lg);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: var(--text-color);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);

  svg {
    width: 36px;
    height: 36px;
  }
`;

const AccountInfo = styled.span`
  font-family: monospace;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 2px 6px;
  border-radius: 3px;
`;

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Получаем CSRF токен при загрузке компонента
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        await getCSRFToken();
        console.log('CSRF token prefetched on component mount');
      } catch (error) {
        console.error('Error prefetching CSRF token:', error);
      }
    };

    fetchCSRFToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Явно получаем CSRF токен непосредственно перед авторизацией
      await getCSRFToken();
      console.log('CSRF token refreshed before authentication');

      // Небольшая задержка, чтобы токен точно установился
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Теперь выполняем авторизацию
      const user = await authenticateOwner(email, password);
      
      if (user) {
        // Сохраняем данные аутентификации в localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        // Перенаправляем на статистику владельца
        navigate('/owner/statistics');
      } else {
        setError('Неверный email или пароль. Пожалуйста, проверьте данные и попробуйте снова.');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Произошла ошибка при входе. Пожалуйста, попробуйте позже или обратитесь в службу поддержки.');
    } finally {
      setIsLoading(false);
    }
  };

  const setTestAccount = (testEmail: string) => {
    setEmail(testEmail);
    // Установка пароля в зависимости от типа аккаунта
    if (testEmail === 'test@gmail.com') {
      setPassword('A166DB70');
    } else {
      setPassword('kulcha2024');
    }
  };

  return (
    <Container>
      <Logo>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
          <line x1="12" y1="6" x2="12" y2="18"></line>
        </svg>
        Кулча
      </Logo>
      
      <LoginCard>
        <Title>Вход для владельцев</Title>
        
        {error && (
          <ErrorMessage>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </ErrorMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              disabled={isLoading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={isLoading}
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </SubmitButton>
        </Form>
      </LoginCard>
      
      <BackLink to="/role-selection">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Вернуться к выбору роли
      </BackLink>
    </Container>
  );
};

export default AdminLoginPage; 