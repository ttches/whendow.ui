import styled from "styled-components";

export const PageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100dvh;
  width: 100%;
`;

export const ContentOverlay = styled.div`
  align-items: center;
  background-color: rgba(234, 185, 255, 0.82);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(75, 1, 94, 0.3);
  display: flex;
  flex-direction: column;
  margin: 16px;
  max-width: 480px;
  padding: 32px 24px;
  position: relative;
  width: calc(100% - 32px);
  z-index: 1;

  @supports not (backdrop-filter: blur(1px)) {
    background-color: #eab9ff;
  }
`;

export const Title = styled.h1`
  color: #4b015e;
  font-family: "copasetic";
  font-size: 40px;
  margin: 0 0 16px 0;
  text-align: center;
`;

export const Description = styled.p`
  color: #4b015e;
  font-family: "simplifica";
  font-size: 20px;
  margin: 0 0 32px 0;
  text-align: center;
`;

export const GetStartedButton = styled.button`
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

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const Step = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 9px;
  display: flex;
  padding: 12px 16px;
`;

export const StepNumber = styled.div`
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

export const StepText = styled.p`
  color: #4b015e;
  font-family: "simplifica";
  font-size: 18px;
  margin: 0;
`;
