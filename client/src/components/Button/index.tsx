import * as React from "react";
import { styled } from "styled-components";

export interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className }: IButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      className={` btn-primary hover:bg-blue-500 hover:text-white  text-white font-medium uppercase cursor-pointer  bg-bgPrimary  transition-all  ${className}`}
    >
      {children}
    </StyledButton>
  );
}
const StyledButton = styled.div`
  line-height: 38px;
  height: 38px;
  padding: 0 20px;
`;
