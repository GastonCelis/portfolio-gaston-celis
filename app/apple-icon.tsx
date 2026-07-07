import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0F",
          color: "#F4F4F5",
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        GC
      </div>
    ),
    { ...size }
  );
}
