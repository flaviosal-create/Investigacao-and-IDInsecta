/**
 * Componente Suspense Wrapper
 * Exibe SkeletonLoader enquanto aguarda conteúdo assíncrono
 */
import { Suspense } from "react";
import SkeletonLoader from "./SkeletonLoader";

export default function SuspenseWrapper({
  children,
  fallback = null,
  skeletonType = "card",
  skeletonCount = 1,
}) {
  const defaultFallback = (
    <div style={{ padding: "20px 0" }}>
      <SkeletonLoader type={skeletonType} count={skeletonCount} />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}
