import styled from "styled-components";

export const Container = styled.div`
  margin: 8px auto;
  max-width: 550px;
  padding: 0 8px;
`;

export const PageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100dvh;

  @media (min-width: 768px) {
    display: block;
    min-height: auto;
  }
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;
