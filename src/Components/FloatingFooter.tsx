import styled from "styled-components";

const FooterContainer = styled.div`
  align-items: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #d8b9ff;
  border-radius: 80px;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 3px solid #4b015e;
  border-radius: 20px 80px 80px 20px;
  color: #4b015e;
  display: flex;
  font-family: "simplifica";
  justify-content: center;
  height: 42px;
  font-size: 32px;
  line-height: 14px;
  width: 80px;
  margin-right: 4px;

  &:disabled {
    border-color: white;
    color: white;
  }
`;

const TextContainer = styled.div`
  align-items: center;
  color: #4b015e;
  display: flex;
  margin-left: 32px;
  font-family: "copasetic";
  font-size: 24px;
`;

type FloatingFooterProps = {
  disabled?: boolean;
  onClick?: () => void;
  text?: string;
};

const FloatingFooter = ({ disabled, onClick, text }: FloatingFooterProps) => {
  return (
    <FooterContainer>
      <TextContainer>{text}</TextContainer>
      <StyledButton disabled={disabled} onClick={onClick}>
        {">"}
      </StyledButton>
    </FooterContainer>
  );
};

export default FloatingFooter;
