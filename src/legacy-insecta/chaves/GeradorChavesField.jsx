import { fieldWrap, labelStyle } from "./GeradorChavesStyles.js";

export default function Campo({ children, label }) {
  return (
    <label style={fieldWrap}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}
