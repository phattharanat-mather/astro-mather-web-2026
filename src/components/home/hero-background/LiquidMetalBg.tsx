import { LiquidMetal } from "@paper-design/shaders-react/dist/shaders/liquid-metal.js";
import { useCssColor } from "./useCssColor";

export function LiquidMetalBg() {
  const bgColor = useCssColor("--background");
  const primaryColor = useCssColor("--primary");

  return (
    <LiquidMetal
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      colorBack={bgColor}
      colorTint={primaryColor}
      speed={0.35}
      softness={0.6}
      repetition={1.2}
      distortion={0.03}
      contour={0.2}
      shape="diamond"
      shiftRed={0.08}
      shiftBlue={0.08}
    />
  );
}
