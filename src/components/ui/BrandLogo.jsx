export function BrandLogo({ className = "" }) {
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src="/assets/logoinvest.png"
      alt="LABSED Investigação"
    />
  );
}
