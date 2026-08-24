import { SidebarContextPanel } from "./sidebar/SidebarContextPanel.jsx";
import { SidebarSummaryPanel } from "./sidebar/SidebarSummaryPanel.jsx";
import { BrandLogo } from "./ui/BrandLogo.jsx";

export function ProtocolSidebar(props) {
  return (
    <aside
      id={props.id}
      className="sidebar"
    >
      <div className="brand-block">
        <BrandLogo />
        <p>
          Plataforma educacional baseada
          em observação, evidência e
          sustentação de hipóteses.
        </p>
      </div>

      <SidebarContextPanel
        domains={props.domains}
        selectedDomainId={
          props.selectedDomainId
        }
        onDomainChange={
          props.onDomainChange
        }
        groupedProtocols={
          props.groupedProtocols
        }
        selectedProtocolId={
          props.selectedProtocolId
        }
        onProtocolChange={
          props.onProtocolChange
        }
        selectedProtocol={
          props.selectedProtocol
        }
        domainProtocols={
          props.domainProtocols
        }
      />

      <SidebarSummaryPanel
        report={props.report}
        leader={props.leader}
      />
    </aside>
  );
}
