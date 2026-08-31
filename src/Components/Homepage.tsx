import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useModal from "../hooks/useModal";

const ContentOverlay = styled.div`
  align-items: center;
  background-color: #eab9ff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  margin: 16px;
  max-width: 480px;
  padding: 32px 24px;
  width: calc(100% - 32px);
`;

const Title = styled.h1`
  color: #4b015e;
  font-family: "copasetic";
  font-size: 40px;
  margin: 0 0 16px 0;
  text-align: center;
`;

const Description = styled.p`
  color: #4b015e;
  font-family: "simplifica";
  font-size: 20px;
  margin: 0 0 32px 0;
  text-align: center;
`;

const GetStartedButton = styled.button`
  align-items: center;
  background-color: #aa2bd1;
  border: 3px solid #4b015e;
  border-radius: 80px;
  color: white;
  cursor: pointer;
  display: flex;
  font-family: "simplifica";
  font-size: 32px;
  height: 64px;
  justify-content: center;
  margin-bottom: 32px;
  width: 100%;

  &:hover {
    background-color: #0d7b7b;
    border-color: #aa2bd1;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Step = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 9px;
  display: flex;
  padding: 12px 16px;
`;

const StepNumber = styled.div`
  align-items: center;
  background-color: #aa2bd1;
  border-radius: 50%;
  color: white;
  display: flex;
  flex-shrink: 0;
  font-family: "copasetic";
  font-size: 24px;
  height: 36px;
  justify-content: center;
  margin-right: 16px;
  width: 36px;
`;

const StepText = styled.p`
  color: #4b015e;
  font-family: "simplifica";
  font-size: 18px;
  margin: 0;
`;

const Homepage = () => {
  const navigate = useNavigate();
  const { Modal: HomepageModal, isOpen, openModal } = useModal();

  useEffect(() => {
    openModal();
  }, []);

  if (!isOpen) return null;

  return (
    <HomepageModal>
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
