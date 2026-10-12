import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
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
          border: "2px solid #ff5500",
        }}
      >
        <img
          src={logoBase64}
          alt="AMVORALIGHT icon"
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
