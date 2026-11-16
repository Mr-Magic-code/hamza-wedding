import { ImageResponse } from "next/og";
import { wedding } from "@/config/wedding";

export const alt = `${wedding.couple.bride.firstName} & ${wedding.couple.groom.firstName} — Wedding Invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { bride, groom } = wedding.couple;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(900px 500px at 50% 0%, #efe0c4 0%, #f7f1e6 55%, #eee2cd 100%)",
          color: "#2b2118",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(169,127,63,0.5)",
            borderRadius: 18,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 14,
              textTransform: "uppercase",
              color: "#a97f3f",
              marginBottom: 34,
            }}
          >
            Together with their families
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 30,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 108,
              lineHeight: 1,
              color: "#8a6530",
            }}
          >
            <span>{bride.firstName}</span>
            <span style={{ fontSize: 54, color: "#a97f3f", fontStyle: "normal" }}>
              &amp;
            </span>
            <span>{groom.firstName}</span>
          </div>
          <div
            style={{
              marginTop: 40,
              width: 260,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #a97f3f, transparent)",
            }}
          />
          <div
            style={{
              marginTop: 34,
              fontFamily: "Georgia, serif",
              fontSize: 32,
              letterSpacing: 2,
              color: "#2b2118",
            }}
          >
            {wedding.displayDate}
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 17,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: "#7c6a54",
            }}
          >
            {`${wedding.venue.name} · ${wedding.venue.address}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
