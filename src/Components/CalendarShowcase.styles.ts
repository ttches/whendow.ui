import styled from "styled-components";

export const ShowcaseContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100dvh;
`;

export const Title = styled.h1`
  color: #551665;
  font-family: "copasetic";
  text-align: center;
  margin-bottom: 40px;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
`;

export const CalendarSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  color: #551665;
  font-family: "copasetic";
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
`;

export const Description = styled.p`
  color: #666;
  font-family: "simplifica";
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.4;
`;

export const PropString = styled.code`
  display: block;
  background: #f5f5f5;
  color: #551665;
  font-family: "Courier New", monospace;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #e0e0e0;
`;
