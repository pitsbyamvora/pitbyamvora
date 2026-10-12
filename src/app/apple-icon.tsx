import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  const logoPath = path.join(process.cwd(), "public", "logo.jpg");
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          overflow: "hidden",
          border: "4px solid #ff5500",
        }}
      >
        <img
          src={logoBase64}
          alt="AMVORALIGHT Apple Icon"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
