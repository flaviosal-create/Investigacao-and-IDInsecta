import { Panel } from "../ui/Panel.jsx";
import { PanelHeader } from "../ui/PanelHeader.jsx";

export function SidebarContextPanel({
  domains,
  selectedDomainId,
  onDomainChange,
  groupedProtocols,
  selectedProtocolId,
  onProtocolChange,
  selectedProtocol,
  domainProtocols,
  getProtocolMetadata = () => null,
  actions = null,
}) {
  return (
    <Panel>
      <PanelHeader title="Universo" />

      <label className="field">
        <span>Domínio</span>
        <select
          value={selectedDomainId}
          onChange={(event) =>
            onDomainChange(
              event.target.value
            )
          }
        >
          {domains.map((domain) => (
            <option
              key={domain.id}
              value={domain.id}
            >
              {domain.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Protocolo investigativo</span>
        <select
          value={selectedProtocolId ?? ""}
          onChange={(event) =>
            onProtocolChange(
              event.target.value
            )
          }
        >
          {groupedProtocols.map(
            ([groupLabel, items]) => (
              <optgroup
                key={groupLabel}
                label={groupLabel}
              >
                {items.map((protocol) => {
                  const metadata =
                    getProtocolMetadata(
                      protocol.id
                    );

                  return (
                    <option
                      key={protocol.id}
                      value={protocol.id}
                    >
                      {`${
                        metadata?.stage ??
                        "Protocolo"
                      } - ${protocol.name}`}
                    </option>
                  );
                })}
              </optgroup>
            )
          )}
        </select>
      </label>

      {selectedProtocol ? (
        <div className="protocol-meta">
          <div className="protocol-map">
            <p className="protocol-map-note">
              Cada protocolo deste
              domínio abre um universo
              próprio de hipóteses. Selecione
              uma opção abaixo para mudar o
              foco da investigação.
            </p>
            {domainProtocols.map(
              (protocol) => {
                const isCurrent =
                  protocol.id ===
                  selectedProtocol.id;

                return (
                  <button
                    type="button"
                    key={protocol.id}
                    className={`protocol-map-item ${
                      isCurrent
                        ? "is-current"
                        : ""
                    }`}
                    aria-pressed={isCurrent}
                    onClick={() =>
                      onProtocolChange(protocol.id)
                    }
                  >
                    <div className="protocol-map-copy">
                      <strong>
                        {protocol.name}
                      </strong>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>
      ) : null}

      {actions ? (
        <div className="protocol-actions">
          {actions}
        </div>
      ) : null}
    </Panel>
  );
}
