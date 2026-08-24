export function PanelHeader({
  title,
  description,
  actions = null,
}) {
  return (
    <div className="panel-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actions}
    </div>
  );
}
