import { useNavigate } from "react-router-dom";
import {
  BackgroundCircle,
  Container,
  ContentOverlay,
  Description,
  GetStartedButton,
  Step,
  StepNumber,
  StepsContainer,
  StepText,
  TextContainer,
  Title,
  TopSection,
} from "./LandingTwo.styles";

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
