import styled from "styled-components";
import { useEffect, useRef } from "react";

const FooterContainer = styled.div`
  align-items: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 84px;
  background-color: #d8b9ff;
  border-radius: 80px;
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;
  width: 100%;
`;

const NavigationButton = styled.button`
  align-items: center;
  background-color: #aa2bd1;
  border: 3px solid #4b015e;
  color: white;
  display: flex;
  font-family: "simplifica";
  justify-content: center;
  height: 62px;
  font-size: 32px;
  line-height: 14px;
  width: 40px;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70px;
`;

const TextContainer = styled.div`
  align-items: center;
  color: #4b015e;
  display: flex;
  font-family: "copasetic";
  font-size: 24px;
  flex-grow: 1;
  justify-content: center;
  padding: 0 16px;
  width: 100%;
`;

const Input = styled.input`
  background-color: white;
  color: #4b015e;
  border-radius: 9px;
  border: 1px solid black;
  box-shadow: none;
  font-size: 28px;
  padding: 12px;
  width: 100%;
  font-family: "copasetic";
  height: 48px;

  ::placeholder {
    color: #b096ce;
  }

  &:focus {
    outline: 12px solid #cb8adf;
    border: 4px solid #aa2bd1;
  }
`;

type FloatingFooterProps = {
  nextDisabled?: boolean;
  onNext: () => (() => void) | undefined;
  onBack: () => (() => void) | undefined;
  text?: string;
  input?: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  };
};

const FloatingFooter = ({
  nextDisabled,
  onNext,
  onBack,
  text,
  input,
}: FloatingFooterProps) => {
  const nextHandler = onNext();
  const backHandler = onBack();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && nextHandler && !nextDisabled) {
      nextHandler();
    }
  };

  return (
    <FooterContainer>
      <ButtonContainer>
        <NavigationButton
          className="left"
          onClick={backHandler}
          disabled={!backHandler}
        >
          {"<"}
        </NavigationButton>
      </ButtonContainer>
      <TextContainer>
        {input ? (
          <Input
            ref={inputRef}
            value={input.value}
            onChange={input.onChange}
            onKeyDown={handleKeyDown}
            placeholder={input.placeholder}
          />
        ) : (
          text
        )}
      </TextContainer>
      <ButtonContainer>
        <NavigationButton
          className="right"
          disabled={nextDisabled || !nextHandler}
          onClick={nextHandler}
        >
          {">"}
        </NavigationButton>
      </ButtonContainer>
    </FooterContainer>
  );
};

export default FloatingFooter;
