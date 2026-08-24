import { Suspense } from "react";

import SidebarMenu from "./SidebarMenu.jsx";

const shellStyle = {
  display: "flex",
  height: "100vh",
};

const contentStyle = {
  flex: 1,
  overflow: "auto",
};

export default function AppComSidebar({
  children,
  contexto,
  fallback = null,
  fillViewport = false,
  hideSidebar = false,
  onOpenTaxonomy,
  roteiro,
  sidebar = null,
  shellClassName = "",
  contentClassName = "",
  tela,
  variante,
}) {
  const conteudo = fallback ? (
    <Suspense fallback={fallback}>{children}</Suspense>
  ) : (
    children
  );

  const menu = hideSidebar
    ? null
    : sidebar || (
        <SidebarMenu
          tela={tela}
          contexto={contexto}
          onOpenTaxonomy={onOpenTaxonomy}
          variante={variante}
          roteiro={roteiro}
        />
      );

  if (fillViewport) {
    return (
      <div
        style={shellStyle}
        className={shellClassName || undefined}
      >
        {menu}
        <div
          style={contentStyle}
          className={contentClassName || undefined}
        >
          {conteudo}
        </div>
      </div>
    );
  }

  return (
    <>
      {menu}
      {conteudo}
    </>
  );
}
