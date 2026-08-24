import { useState } from "react";
import ConfigurarSessao from "./chaves/ConfigurarSessao.jsx";
import {
  chaveArtropodes,
  chavesConfig,
} from "./chaves/config/chavesConfig.js";
import ChaveBase from "./components/ChaveBase.jsx";
import { normalizar } from "./utils/text.js";

export default function LegacyInsectaKey({ onBack, onStartInvestigative }) {
  const [screen, setScreen] = useState("config");
  const [activeKey, setActiveKey] = useState("CHAVE PRINCIPAL");

  const availableKeys = {
    ...chavesConfig,
    "CHAVE ARTROPODES": chaveArtropodes,
  };

  function startKey(_mode, _aluno, _total, ordem = "") {
    const requested = ordem ? String(ordem).toUpperCase() : "CHAVE PRINCIPAL";
    const key = availableKeys[requested] ? requested : "CHAVE PRINCIPAL";
    setActiveKey(key);
    setScreen("key");
  }

  function routeResult(result) {
    const key = normalizar(result).replace(/\s+/g, "");
    const nextKey = Object.keys(chavesConfig).find(
      (candidate) => normalizar(candidate).replace(/\s+/g, "") === key,
    );

    if (nextKey) {
      setActiveKey(nextKey);
      return true;
    }

    return false;
  }

  if (screen === "config") {
    return (
      <div className="legacy-insecta-page">
        <button className="legacy-back-button" type="button" onClick={onBack}>
          ← Voltar ao universo de investigação
        </button>
        <ConfigurarSessao
          mode="pratica"
          aluno=""
          chavesPersonalizadas={[]}
          onStart={startKey}
          onStartArtropode={() => {
            setActiveKey("CHAVE ARTROPODES");
            setScreen("key");
          }}
          onStartPesquisador={() => onStartInvestigative?.()}
          onBack={onBack}
        />
      </div>
    );
  }

  const config = availableKeys[activeKey] || availableKeys["CHAVE PRINCIPAL"];
  const isPrincipal = activeKey === "CHAVE PRINCIPAL";

  return (
    <div className="legacy-insecta-page">
      <div className="legacy-key-toolbar">
        <button className="legacy-back-button" type="button" onClick={() => setScreen("config")}>
          ← Configuração da chave
        </button>
        {!isPrincipal ? (
          <button className="legacy-link-button" type="button" onClick={() => setActiveKey("CHAVE PRINCIPAL")}>
            Voltar à chave de ordens
          </button>
        ) : null}
      </div>
      <ChaveBase
        key={activeKey}
        titulo={config.titulo}
        chaveId={activeKey}
        nodes={config.nodes}
        startId={config.startId}
        ordem={isPrincipal ? "" : config.titulo}
        mode="pratica"
        aluno=""
        onResult={routeResult}
        onBack={() => setScreen("config")}
        onResetToPrincipal={() => setActiveKey("CHAVE PRINCIPAL")}
      />
    </div>
  );
}
