import { ImageResponse } from "next/og";
import { LOGO_PATH, LOGO_VIEWBOX } from "./logo";

export const ogSize = { width: 1200, height: 630 };

/** Shared design for link-preview images (Open Graph). */
export function renderOg(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#eeebe4",
          background: "radial-gradient(circle at 80% 20%, #8e1a7d 0%, #5d0755 35%, #1f0519 75%, #14030f 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox={LOGO_VIEWBOX}>
            <path d={LOGO_PATH} fill="#039efd" fillRule="evenodd" />
          </svg>
          <div style={{ fontSize: 38, display: "flex" }}>
            efficio<span style={{ color: "#a0d3f1" }}>virtual</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#a0d3f1" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 40 ? 68 : 80, lineHeight: 1.05, marginTop: 18, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", height: 10, width: "100%" }}>
          <div style={{ flex: 1, background: "#5d0755" }} />
          <div style={{ flex: 1, background: "#371321" }} />
          <div style={{ flex: 1, background: "#a75337" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
