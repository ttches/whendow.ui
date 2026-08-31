import { useEffect, useRef } from "react";
import {
  ButtonContainer,
  FooterContainer,
  Input,
  NavigationButton,
  TextContainer,
} from "./FloatingFooter.styles";

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
