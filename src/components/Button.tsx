import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '0.875rem';
      case 'large': return '1.125rem';
      default: return '1rem';
    }
  }};
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  transition: all 0.3s ease;
  
  background: ${props => {
    switch (props.variant) {
      case 'secondary': return '#6c757d';
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      default: return '#007bff';
    }
  }};
  
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: ${props => {
      switch (props.variant) {
        case 'secondary': return '#5a6268';
        case 'success': return '#218838';
        case 'danger': return '#c82333';
        default: return '#0069d9';
      }
    }};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;