import simboloLasbio from "../assets/simbolo-lab-softwares-educacionais.svg";

export default function LabBioMark({ compact = false, inverted = false }) {
  const textColor = inverted ? "rgba(255,255,255,0.92)" : "#1f4e5f";
  const mutedColor = inverted ? "rgba(255,255,255,0.72)" : "#475569";

  return (
    <div
      style={{
        ...containerStyle,
        color: textColor,
        justifyContent: compact ? "center" : "flex-start",
      }}
    >
      <img
        src={simboloLasbio}
        alt="Símbolo do LABSED"
        style={{
          ...imageStyle,
          width: compact ? 38 : 58,
          height: compact ? 38 : 58,
        }}
      />

      <div style={{ textAlign: compact ? "center" : "left" }}>
        <div style={{ ...nameStyle, fontSize: compact ? 12 : 15 }}>
          LABSED
        </div>
        <div
          style={{
            ...descriptionStyle,
            color: mutedColor,
            fontSize: compact ? 10.5 : descriptionStyle.fontSize,
            lineHeight: compact ? 1.15 : descriptionStyle.lineHeight,
            marginTop: compact ? 1 : descriptionStyle.marginTop,
          }}
        >
          Laboratório de Softwares Educacionais
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  maxWidth: "100%",
};

const imageStyle = {
  flex: "0 0 auto",
  borderRadius: 12,
  boxShadow: "0 10px 22px rgba(15, 23, 42, 0.14)",
};

const nameStyle = {
  fontWeight: 900,
  lineHeight: 1.05,
  letterSpacing: "0.04em",
};

const descriptionStyle = {
  maxWidth: 280,
  marginTop: 3,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.25,
};
