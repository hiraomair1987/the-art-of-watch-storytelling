import { ImageResponse } from "next/og";

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
          background: "radial-gradient(circle at 80% 20%, #5b34b0 0%, #1a0a24 55%, #12061a 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 40, display: "flex" }}>
          efficio<span style={{ color: "#f07ac8" }}>virtual</span>
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.02, marginTop: 24, maxWidth: 900 }}>Make your next digital move count.</div>
      </div>
    ),
    size,
  );
}
