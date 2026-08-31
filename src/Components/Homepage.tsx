import { useNavigate } from "react-router-dom";
import {
  ContentOverlay,
  Description,
  GetStartedButton,
  PageContainer,
  Step,
  StepNumber,
  StepsContainer,
  StepText,
  Title,
} from "./Homepage.styles";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentOverlay>
        <Title>woahbundie</Title>
        <Description>Find a date to fit your group.</Description>
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
    </PageContainer>
  );
};

export default Homepage;
