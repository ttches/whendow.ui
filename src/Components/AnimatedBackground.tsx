import {
  AnimatedBackdrop,
  CausticLayer,
  CausticLayerAlt,
  LightRays,
  Scene,
} from "./AnimatedBackground.styles";

const AnimatedBackground = () => (
  <Scene aria-hidden="true">
    <AnimatedBackdrop />
    <LightRays />
    <CausticLayer />
    <CausticLayerAlt />
  </Scene>
);

export default AnimatedBackground;
