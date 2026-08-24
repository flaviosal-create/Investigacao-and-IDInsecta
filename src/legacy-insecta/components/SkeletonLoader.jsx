/**
 * Componente de Skeleton Loader
 * Usado para mostrar um placeholder enquanto o conteúdo carrega
 */
export default function SkeletonLoader({
  type = "card",
  count = 1,
  height = "20px",
}) {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const skeletonItemStyle = {
    height,
    borderRadius: "var(--radius-md)",
    background: "var(--skeleton-bg)",
    backgroundSize: "200% 100%",
    animation: "loading-shimmer 2s infinite",
  };

  const cardStyle = {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const renderSkeleton = () => {
    const skeletons = [];

    if (type === "card") {
      for (let i = 0; i < count; i++) {
        skeletons.push(
          <div key={i} style={cardStyle}>
            <div style={{ ...skeletonItemStyle, height: "28px" }} />
            <div style={{ ...skeletonItemStyle, height: "16px" }} />
            <div style={{ ...skeletonItemStyle, height: "16px", width: "80%" }} />
            <div style={{ ...skeletonItemStyle, height: "44px", marginTop: "8px" }} />
          </div>
        );
      }
    } else if (type === "list") {
      for (let i = 0; i < count; i++) {
        skeletons.push(
          <div
            key={i}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              padding: "8px 0",
            }}
          >
            <div
              style={{
                ...skeletonItemStyle,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ ...skeletonItemStyle, height: "16px", marginBottom: "8px" }} />
              <div style={{ ...skeletonItemStyle, height: "12px", width: "60%" }} />
            </div>
          </div>
        );
      }
    } else if (type === "text") {
      for (let i = 0; i < count; i++) {
        skeletons.push(
          <div key={i} style={{ ...skeletonItemStyle, height: "16px" }} />
        );
      }
    } else if (type === "button") {
      for (let i = 0; i < count; i++) {
        skeletons.push(
          <div key={i} style={{ ...skeletonItemStyle, height: "44px" }} />
        );
      }
    }

    return skeletons;
  };

  return <div style={containerStyle}>{renderSkeleton()}</div>;
}
