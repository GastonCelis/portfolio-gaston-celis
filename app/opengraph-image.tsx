import { ImageResponse } from "next/og";
import { identity } from "@/lib/data";

export const alt = `${identity.name} — ${identity.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0F",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(139,92,246,0.35), transparent 55%), radial-gradient(circle at 10% 85%, rgba(139,92,246,0.25), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#8B5CF6",
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          ¡Hola! Soy
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 800,
            color: "#F4F4F5",
            letterSpacing: -2,
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {identity.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            color: "#F4F4F5",
            textTransform: "uppercase",
            marginTop: 24,
          }}
        >
          {identity.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#9CA3AF",
            marginTop: 28,
          }}
        >
          React · Next.js · TypeScript · Node.js · .NET
        </div>
      </div>
    ),
    { ...size }
  );
}
