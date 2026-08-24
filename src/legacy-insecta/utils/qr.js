export function decodeGabaritoQR(codigo) {
  const texto = String(codigo || "").trim();
  const partes = texto
    .split("|")
    .map((parte) => parte.trim());

  if (!texto) {
    return resultadoInvalido("O QR Code está vazio.");
  }

  const identificador = partes[0]?.toUpperCase();
  if (!["PROVA", "LABSED"].includes(identificador)) {
    return resultadoInvalido(
      'QR não reconhecido. O código deve começar com "PROVA" ou "LABSED".'
    );
  }

  const formatoLegado = partes.length === 3 && partes[1]?.toLowerCase() === "v1";
  if (formatoLegado) {
    return decodificarGabarito(partes[2], {
      formato: "legado",
      qtdInsetos: null,
      tempoMinutos: 0,
    });
  }

  if (partes.length !== 4) {
    return resultadoInvalido(
      "Formato inválido. Use PROVA|quantidade|tempo|ORDEM,FAMÍLIA;ORDEM,FAMÍLIA."
    );
  }

  const qtdInsetos = lerInteiro(partes[1]);
  if (qtdInsetos === null || qtdInsetos < 1) {
    return resultadoInvalido("A quantidade de insetos deve ser um número inteiro maior que zero.");
  }

  const tempoMinutos = lerInteiro(partes[2]);
  if (tempoMinutos === null || tempoMinutos < 0) {
    return resultadoInvalido(
      "O tempo deve ser um número inteiro igual ou maior que zero. Use 0 para tempo livre."
    );
  }

  return decodificarGabarito(partes[3], {
    formato: "configurado",
    qtdInsetos,
    tempoMinutos,
  });
}

function decodificarGabarito(gabaritoTexto, configuracao) {
  const texto = String(gabaritoTexto || "").trim();
  if (!texto) {
    return resultadoInvalido("O gabarito do QR Code está vazio.");
  }

  const itensTexto = texto.split(";").map((item) => item.trim());
  if (itensTexto.some((item) => !item)) {
    return resultadoInvalido(
      "Há um item vazio no gabarito. Remova pontos e vírgulas duplicados ou no final."
    );
  }

  const gabarito = [];

  for (let indice = 0; indice < itensTexto.length; indice += 1) {
    const campos = itensTexto[indice].split(",").map((campo) => campo.trim());

    if (campos.length > 2) {
      return resultadoInvalido(
        `O item ${indice + 1} possui vírgulas demais. Use somente ORDEM,FAMÍLIA.`
      );
    }

    const [ordem, familia = ""] = campos;
    if (!ordem) {
      return resultadoInvalido(`Informe a ordem no item ${indice + 1} do gabarito.`);
    }

    gabarito.push({ ordem, familia });
  }

  if (
    configuracao.qtdInsetos !== null &&
    configuracao.qtdInsetos !== gabarito.length
  ) {
    return resultadoInvalido(
      `A quantidade informada (${configuracao.qtdInsetos}) não corresponde aos ${gabarito.length} itens do gabarito.`
    );
  }

  return {
    valido: true,
    erro: "",
    formato: configuracao.formato,
    gabarito,
    qtdInsetos: configuracao.qtdInsetos ?? gabarito.length,
    tempoMinutos: configuracao.tempoMinutos,
  };
}

function lerInteiro(valor) {
  if (!/^\d+$/.test(String(valor || ""))) return null;

  const numero = Number(valor);
  return Number.isSafeInteger(numero) ? numero : null;
}

function resultadoInvalido(erro) {
  return {
    valido: false,
    erro,
    formato: "",
    gabarito: [],
    qtdInsetos: 0,
    tempoMinutos: 0,
  };
}
