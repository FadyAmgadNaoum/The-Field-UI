interface LogoMarkProps {
  size?: number;
}

/** The bars-based "F" glyph used in the header, footer, and preloader. */
export function LogoMark({ size = 32 }: LogoMarkProps) {
  const barW = Math.round(size * 0.31);
  const armW = size - barW - Math.round(size * 0.06);
  return (
    <span style={{ position: "relative", display: "block", width: size, height: size, flex: "0 0 auto" }}>
      <span
        style={{
          position: "absolute",
          insetInlineStart: 0,
          top: 0,
          width: barW,
          height: size,
          borderRadius: 5,
          background: "var(--terra)",
        }}
      />
      <span
        style={{
          position: "absolute",
          insetInlineStart: barW + 2,
          top: 0,
          width: armW,
          height: Math.round(size * 0.31),
          borderRadius: 5,
          background: "var(--terra)",
        }}
      />
      <span
        style={{
          position: "absolute",
          insetInlineStart: barW + 2,
          top: Math.round(size * 0.38),
          width: Math.round(armW * 0.7),
          height: Math.round(size * 0.28),
          borderRadius: 5,
          background: "var(--terra)",
        }}
      />
    </span>
  );
}
