import { DotGrid } from "@paper-design/shaders-react/dist/shaders/dot-grid.js";
import { useCssColor } from "./useCssColor";

export function DotGridBg() {
  const bgColor = useCssColor("--background");
  const primaryColor = useCssColor("--primary");

  return (
    <DotGrid
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      colorBack={bgColor}
      colorFill={primaryColor}
      colorStroke="#00000000"
      size={2}
      gapX={36}
      gapY={36}
      strokeWidth={0}
      sizeRange={0.15}
      opacityRange={0}
      shape="circle"
    />
  );
}
