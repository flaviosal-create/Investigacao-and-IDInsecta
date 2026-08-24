export function clonarExsicata(item) {
  return JSON.parse(JSON.stringify(item));
}

export function resolverTituloExsicata(item) {
  return (
    item?.titulo ||
    item?.etiqueta?.nomeCientifico ||
    item?.etiqueta?.nomePopular ||
    "Exsicata sem título"
  );
}

export function formatarDataCurta(valor) {
  if (!valor) return "";
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return String(valor);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data);
}
