import styled, { css, keyframes } from "styled-components";

export const ContentOverlay = styled.div`
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

export const Title = styled.h1`
  color: #4b015e;
  font-family: "copasetic";
  font-size: 32px;
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

const REVEALED_COLORS = { border: "#aa2bd1", outline: "#cb8adf" };
const CENSORED_COLORS = { border: "#aa2bd1", outline: "#eab9ff" };
const FLASH_COLOR = "#aa2bd1";

const flash = (borderColor: string, outlineColor: string) => keyframes`
  0%, 100% {
    border-color: ${borderColor};
    outline-color: ${outlineColor};
  }
  50% {
    border-color: ${FLASH_COLOR};
    outline-color: ${FLASH_COLOR};
  }
`;

export const PasscodeRow = styled.div<{ $revealed: boolean; $copied: boolean }>`
  align-items: center;
  background-color: white;
  border-radius: 9px;
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
  padding: 16px 8px;
  width: calc(100% - 24px);

  ${({ $revealed }) => {
    const { border, outline } = $revealed ? REVEALED_COLORS : CENSORED_COLORS;
    return css`
      border: 4px solid ${border};
      outline: 12px solid ${outline};
    `;
  }}

  ${({ $copied, $revealed }) => {
    const { border, outline } = $revealed ? REVEALED_COLORS : CENSORED_COLORS;
    return (
      $copied &&
      css`
        animation: ${flash(border, outline)} 400ms ease;
      `
    );
  }}
`;

export const PasscodeText = styled.span`
  color: #4b015e;
  flex-grow: 1;
  font-family: "copasetic";
  font-size: 18px;
  overflow-wrap: anywhere;
  text-align: center;
`;

export const ShowButton = styled.button`
  background: transparent;
  border: 1px solid #4b015e;
  border-radius: 9px;
  color: #4b015e;
  cursor: pointer;
  flex-shrink: 0;
  font-family: "simplifica";
  font-size: 16px;
  padding: 8px 12px;

  &:hover {
    background-color: white;
  }
`;

export const CopyButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: #4b015e;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  padding: 4px;

  &:hover {
    color: #aa2bd1;
  }
`;

export const ContinueButton = styled.button`
  align-items: center;
  background-color: #aa2bd1;
  border: 3px solid #4b015e;
  color: white;
  cursor: pointer;
  border-radius: 80px;
  display: flex;
  font-family: "simplifica";
  font-size: 32px;
  height: 64px;
  justify-content: center;
  width: 100%;

  &:hover {
    background-color: #0d7b7b;
    border-color: #aa2bd1;
  }
`;
