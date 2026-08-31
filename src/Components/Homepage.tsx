import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../hooks/useModal";
import {
  AnimatedBackdrop,
  CausticLayer,
  CausticLayerAlt,
  ContentOverlay,
  Description,
  GetStartedButton,
  LightRays,
  Scene,
  Step,
  StepNumber,
  StepsContainer,
  StepText,
  Title,
} from "./Homepage.styles";

const Homepage = () => {
  const navigate = useNavigate();
  const { Modal: HomepageModal, isOpen, openModal } = useModal();

  useEffect(() => {
    openModal();
  }, []);

  if (!isOpen) return null;

  return (
    <HomepageModal>
      <Scene>
        <AnimatedBackdrop />
        <LightRays />
        <CausticLayer />
        <CausticLayerAlt />
      </Scene>
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
    </HomepageModal>
  );
};

export default Homepage;
