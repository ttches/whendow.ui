import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(180deg, #2d2640 0%, #191831 100%);
  overflow: hidden;
`;

const TitleSection = styled.div`
  align-items: center;
  background: linear-gradient(-45deg, #d971d5, #252133, #191831, #d971d5);
  background-size: 400% 400%;
  border-radius: 0 0 7px 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 140px;
  animation: ${gradientShift} 15s ease infinite;
  box-shadow: 0 4px 20px rgba(217, 113, 213, 0.2);
`;

const Title = styled.h1`
  color: #e8e2f4;
  font-family: "copasetic";
  font-size: 64px;
  margin: 0;
  text-align: center;
  text-shadow: 0 4px 12px rgba(217, 113, 213, 0.4);
`;

const ContentSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  background: linear-gradient(
    180deg,
    rgba(217, 113, 213, 0.1) 0%,
    rgba(159, 255, 255, 0.1) 100%
  );
  flex: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  padding: 0 16px;
`;

const TopContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const TextContainer = styled.div`
  max-width: 280px;
  margin: 0 auto;
`;

const Description = styled.p`
  color: #2d2640;
  font-family: "simplifica";
  font-size: 24px;
  margin: 0 0 24px 0;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const GetStartedButton = styled.button`
  align-items: center;
  background-color: #d971d5;
  border: 2px solid transparent;
  border-radius: 80px;
  color: #e8e2f4;
  cursor: pointer;
  display: flex;
  font-family: "simplifica";
  font-size: 32px;
  height: 64px;
  justify-content: center;
  width: 300px;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #2d2640;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Step = styled.div`
  align-items: center;
  background: rgba(161, 150, 228, 0.1);
  border-radius: 16px;
  display: flex;
  padding: 16px;
  border: 1px solid rgba(217, 113, 213, 0.2);
  transition: background 0.2s ease;

  &:active {
    background: rgba(161, 150, 228, 0.2);
    border-color: rgba(217, 113, 213, 0.4);
  }
`;

const StepNumber = styled.div`
  align-items: center;
  background-color: #d971d5;
  border-radius: 50%;
  color: #e8e2f4;
  display: flex;
  font-family: "copasetic";
  font-size: 32px;
  height: 48px;
  justify-content: center;
  margin-right: 16px;
  min-width: 48px;
  box-shadow: 0 2px 8px rgba(217, 113, 213, 0.4);
`;

const StepText = styled.p`
  color: #2d2640;
  font-family: "simplifica";
  font-size: 24px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TitleSection>
        <Title>woahbundie</Title>
      </TitleSection>
      <ContentSection>
        <ContentContainer>
          <TopContent>
            <TextContainer>
              <Description>Find a date to fit your group.</Description>
            </TextContainer>
            <GetStartedButton onClick={() => navigate("/create")}>
              Get Started
            </GetStartedButton>
          </TopContent>
          <StepsContainer>
            <Step>
              <StepNumber>1</StepNumber>
              <StepText>Pick your date range</StepText>
            </Step>
            <Step>
              <StepNumber>2</StepNumber>
              <StepText>Share the link</StepText>
            </Step>
            <Step>
              <StepNumber>3</StepNumber>
              <StepText>Everyone marks their availability</StepText>
            </Step>
          </StepsContainer>
        </ContentContainer>
      </ContentSection>
    </Container>
  );
};

export default Homepage;
