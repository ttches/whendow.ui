import styled, { keyframes } from "styled-components";

// 1 = base speed below; higher = slower, lower = faster.
const SPEED_MULTIPLIER = 3;

const GRADIENT_DURATION_S = 12 * SPEED_MULTIPLIER;
const DRIFT1_DURATION_S = 16 * SPEED_MULTIPLIER;
const DRIFT2_DURATION_S = 21 * SPEED_MULTIPLIER;
const RAYS_DURATION_S = 18 * SPEED_MULTIPLIER;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const drift1 = keyframes`
  0% { transform: translate(7%, 0%) scale(1.05) rotate(0deg); }
  25% { transform: translate(0%, 7%) scale(1.1) rotate(6deg); }
  50% { transform: translate(-7%, 0%) scale(1.05) rotate(0deg); }
  75% { transform: translate(0%, -7%) scale(1) rotate(-6deg); }
  100% { transform: translate(7%, 0%) scale(1.05) rotate(0deg); }
`;

const drift2 = keyframes`
  0% { transform: translate(-6%, 6%) scale(1.1) rotate(0deg); }
  25% { transform: translate(6%, 6%) scale(1.05) rotate(-5deg); }
  50% { transform: translate(6%, -6%) scale(1.1) rotate(0deg); }
  75% { transform: translate(-6%, -6%) scale(1.15) rotate(5deg); }
  100% { transform: translate(-6%, 6%) scale(1.1) rotate(0deg); }
`;

const raySway = keyframes`
  0% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(-5deg); }
`;

export const AnimatedBackdrop = styled.div`
  background: linear-gradient(
    -45deg,
    #aa2bd1,
    #0d7b7b,
    #4b015e,
    #0d7b7b,
    #aa2bd1
  );
  background-size: 400% 400%;
  animation: ${gradientShift} ${GRADIENT_DURATION_S}s ease infinite;
  inset: 0;
  position: absolute;
  z-index: 0;
`;

export const Scene = styled.div`
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  z-index: -1;
`;

export const LightRays = styled.div`
  background: conic-gradient(
    from 0deg at 50% 0%,
    transparent 0deg 8deg,
    rgba(255, 255, 255, 0.14) 8deg 11deg,
    transparent 11deg 24deg,
    rgba(255, 255, 255, 0.22) 24deg 26deg,
    transparent 26deg 47deg,
    rgba(255, 255, 255, 0.1) 47deg 51deg,
    transparent 51deg 66deg,
    rgba(255, 255, 255, 0.18) 66deg 68deg,
    transparent 68deg 92deg,
    rgba(255, 255, 255, 0.12) 92deg 96deg,
    transparent 96deg 114deg,
    rgba(255, 255, 255, 0.2) 114deg 116deg,
    transparent 116deg 140deg,
    rgba(255, 255, 255, 0.13) 140deg 144deg,
    transparent 144deg 160deg,
    rgba(255, 255, 255, 0.16) 160deg 162deg,
    transparent 162deg 180deg
  );
  filter: blur(16px);
  height: 200%;
  left: -50%;
  mix-blend-mode: screen;
  opacity: 0.3;
  position: absolute;
  top: -20%;
  transform-origin: 50% 0%;
  width: 200%;
  animation: ${raySway} ${RAYS_DURATION_S}s ease-in-out infinite;
`;

export const CausticLayer = styled.div`
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(255, 255, 255, 0.55) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 70% 60%,
      rgba(159, 255, 255, 0.45) 0%,
      transparent 35%
    ),
    radial-gradient(
      circle at 45% 80%,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 30%
    );
  filter: blur(40px);
  inset: -20%;
  mix-blend-mode: overlay;
  position: absolute;
  animation: ${drift1} ${DRIFT1_DURATION_S}s linear infinite;
`;

export const CausticLayerAlt = styled(CausticLayer)`
  animation: ${drift2} ${DRIFT2_DURATION_S}s linear infinite;
  background-image:
    radial-gradient(
      circle at 65% 25%,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 35%
    ),
    radial-gradient(
      circle at 25% 65%,
      rgba(159, 255, 255, 0.35) 0%,
      transparent 30%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(255, 255, 255, 0.25) 0%,
      transparent 28%
    );
  mix-blend-mode: soft-light;
`;
