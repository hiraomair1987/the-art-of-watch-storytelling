import { ImageResponse } from "next/og";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/lib/logo";

export const alt = "efficiovirtual — Make your next digital move count.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          color: "#f6efe6",
          background: "radial-gradient(circle at 80% 20%, #8e1a7d 0%, #610955 35%, #1f0519 75%, #14030f 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <svg width="120" height="120" viewBox={LOGO_VIEWBOX} style={{ marginBottom: 36 }}>
          <path d={LOGO_PATH} fill="#f6efe6" fillRule="evenodd" />
        </svg>
        <div style={{ fontSize: 40, display: "flex" }}>
          efficio<span style={{ color: "#f07ac8" }}>virtual</span>
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.02, marginTop: 24, maxWidth: 900 }}>Make your next digital move count.</div>
      </div>
    ),
    size,
  );
}
