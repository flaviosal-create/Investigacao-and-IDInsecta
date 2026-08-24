export const sectionTitle = {
  margin: 0,
  fontSize: 21,
  lineHeight: 1.15,
};

export const sectionSubtitle = {
  margin: "4px 0 14px",
  color: "var(--color-muted)",
};

export const twoColumns = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

export const choiceGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginTop: 14,
};

export const choiceBox = {
  padding: 13,
  borderRadius: 16,
  border: "1px solid var(--color-border)",
  background: "color-mix(in srgb, var(--color-surface-soft) 82%, var(--color-surface))",
  boxShadow: "var(--shadow-sm)",
};

export const choiceTitle = {
  margin: "0 0 10px",
  fontSize: 16,
};

export const fieldWrap = {
  display: "block",
  marginBottom: 10,
};

export const labelStyle = {
  display: "block",
  marginBottom: 5,
  color: "var(--color-muted)",
  fontWeight: 800,
  fontSize: 12.5,
};

export const textarea = {
  minHeight: 88,
  resize: "vertical",
};

export const textareaSmall = {
  minHeight: 70,
  resize: "vertical",
};

export const segmented = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 6,
  marginBottom: 10,
};

export const segment = {
  minHeight: 38,
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  cursor: "pointer",
  fontWeight: 800,
};

export const segmentActive = {
  ...segment,
  background: "var(--color-primary)",
  color: "var(--color-hero-text)",
  borderColor: "var(--color-primary)",
};

export const subsectionTitle = {
  margin: "0 0 8px",
  fontSize: 16,
  lineHeight: 1.2,
};
