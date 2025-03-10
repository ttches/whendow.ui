import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  align-items: center;
  background: linear-gradient(135deg, #aa2bd1 0%, #0d7b7b 100%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const BackgroundCircle = styled.div`
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  height: 100vh;
  position: absolute;
  width: 100vh;
  z-index: 1;

  &.top {
    right: -50vh;
    top: -50vh;
  }

  &.bottom {
    bottom: -50vh;
    left: -50vh;
  }
`;

const ContentOverlay = styled.div`
  align-items: center;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 32px);
  justify-content: space-between;
  margin: 16px;
  padding: 24px 16px;
  position: relative;
  width: calc(100% - 32px);
  z-index: 2;
`;

const TopSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  font-family: "copasetic";
  font-size: 48px;
  margin: 0 0 16px 0;
  text-align: center;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const TextContainer = styled.div`
  max-width: 280px;
  margin: 0 auto;
`;

const Description = styled.p`
  color: white;
  font-family: "simplifica";
  font-size: 24px;
  margin: 0 0 24px 0;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GetStartedButton = styled.button`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 80px;
  color: #4b015e;
  cursor: pointer;
  display: flex;
  font-family: "simplifica";
  font-size: 32px;
  height: 64px;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  margin-bottom: 24px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: white;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
`;

const Step = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  padding: 16px;
  width: 100%;
`;

const StepNumber = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  color: #4b015e;
  display: flex;
  font-family: "copasetic";
  font-size: 32px;
  height: 48px;
  justify-content: center;
  margin-right: 16px;
  min-width: 48px;
`;

const StepText = styled.p`
  color: white;
  font-family: "simplifica";
  font-size: 24px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LandingTwo = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackgroundCircle className="top" />
      <BackgroundCircle className="bottom" />
      <ContentOverlay>
        <TopSection>
          <Title>woahbundie</Title>
          <TextContainer>
            <Description>
              Schedule group events effortlessly. Share a link, mark your
              availability, and find the perfect time for everyone. No login
              required.
            </Description>
          </TextContainer>
        </TopSection>
        <GetStartedButton onClick={() => navigate("/create")}>
          Get Started
        </GetStartedButton>
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
      </ContentOverlay>
    </Container>
  );
};

export default LandingTwo;
