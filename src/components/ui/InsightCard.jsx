import { Panel } from "./Panel.jsx";
import { PanelHeader } from "./PanelHeader.jsx";

export function InsightCard({
  title,
  bodyClassName = "insight-card",
  children,
}) {
  return (
    <Panel>
      <PanelHeader title={title} />
      <div className={bodyClassName}>
        {children}
      </div>
    </Panel>
  );
}
