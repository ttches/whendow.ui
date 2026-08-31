import styled from "styled-components";

export const FooterContainer = styled.div`
  align-items: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #eab9ff;
  border-radius: 80px;
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;
  width: 100%;

  @media (min-width: 768px) {
    height: 84px;
  }
`;

export const NavigationButton = styled.button`
  align-items: center;
  background-color: #aa2bd1;
  border: 3px solid #4b015e;
  color: white;
  display: flex;
  font-family: "simplifica";
  justify-content: center;
  height: 48px;
  font-size: 24px;
  line-height: 14px;
  width: 32px;
  padding: 0px;

  &.left {
    border-radius: 80px 20px 20px 80px;
  }

  &.right {
    border-radius: 20px 80px 80px 20px;
  }

  &:disabled {
    background-color: transparent;
    border-color: #b096ce;
    color: #b096ce;
  }

  &:hover&:not(:disabled) {
    background-color: #0d7b7b;
    border-color: #aa2bd1;
  }

  @media (min-width: 768px) {
    height: 62px;
    font-size: 32px;
    width: 40px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 56px;

  @media (min-width: 768px) {
    width: 70px;
  }
`;

export const TextContainer = styled.div`
  align-items: center;
  color: #4b015e;
  display: flex;
  font-family: "copasetic";
  font-size: 18px;
  flex-grow: 1;
  justify-content: center;
  padding: 0 12px;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 24px;
    padding: 0 16px;
  }
`;

export const Input = styled.input`
  background-color: white;
  color: #4b015e;
  border-radius: 9px;
  border: 1px solid black;
  box-shadow: none;
  font-size: 20px;
  padding: 8px;
  width: 100%;
  font-family: "copasetic";
  height: 36px;

  ::placeholder {
    color: #b096ce;
  }

  &:focus {
    outline: 12px solid #cb8adf;
    border: 4px solid #aa2bd1;
  }

  @media (min-width: 768px) {
    font-size: 28px;
    padding: 12px;
    height: 48px;
  }
`;
