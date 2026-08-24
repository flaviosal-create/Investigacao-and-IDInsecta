export function CampoTexto({
  label,
  value,
  onChange,
  type = "text",
  containerStyle,
  labelStyle,
  className = "field-control",
  inputStyle,
}) {
  return (
    <label style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <input
        className={className}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={inputStyle}
      />
    </label>
  );
}

export function CampoTextarea({
  label,
  value,
  onChange,
  rows = 3,
  containerStyle,
  labelStyle,
  className = "field-control",
  textareaStyle,
  placeholder,
}) {
  return (
    <label style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <textarea
        className={className}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        style={textareaStyle}
        placeholder={placeholder}
      />
    </label>
  );
}

export function CampoSelect({
  label,
  value,
  onChange,
  options,
  containerStyle,
  labelStyle,
  selectStyle,
}) {
  return (
    <label style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={selectStyle}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ResumoLinhaCompacta({
  label,
  value,
  rowStyle,
  labelStyle,
  valueStyle,
}) {
  return (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <strong style={valueStyle}>{value}</strong>
    </div>
  );
}

export function ResumoPill({
  label,
  value,
  containerStyle,
  labelStyle,
  valueStyle,
  emptyValue = "pendente",
}) {
  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <strong style={valueStyle}>{value || emptyValue}</strong>
    </div>
  );
}
