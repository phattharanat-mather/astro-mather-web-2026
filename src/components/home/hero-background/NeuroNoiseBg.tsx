import { NeuroNoise } from "@paper-design/shaders-react/dist/shaders/neuro-noise.js";
import { useCssColor } from "./useCssColor";

export function NeuroNoiseBg() {
  const bgColor = useCssColor("--background");
  const primaryColor = useCssColor("--primary");

  return (
    <NeuroNoise
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      colorFront={primaryColor}
      colorMid={primaryColor}
      colorBack={bgColor}
      brightness={0.06}
      contrast={0.25}
      speed={0.5}
    />
  );
}
