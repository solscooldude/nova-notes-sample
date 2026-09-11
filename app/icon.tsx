import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1830",
          color: "#e8c56a",
          fontSize: 20,
          fontFamily: "Georgia, serif",
          borderRadius: 6,
        }}
      >
        N
      </div>
    ),
    size,
  );
}
