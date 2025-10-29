export function criarEnderecoVazio() {
  return {
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    referencia: "",
    latitude: null,
    longitude: null,
  };
}

export function normalizarEnderecoObjeto(valor) {
  if (!valor) {
    return criarEnderecoVazio();
  }

  if (typeof valor === "string") {
    const base = criarEnderecoVazio();
    base.logradouro = valor.trim();
    return base;
  }

  const base = criarEnderecoVazio();
  Object.keys(base).forEach((chave) => {
    if (valor[chave] !== undefined && valor[chave] !== null) {
      const item = valor[chave];
      base[chave] = typeof item === "string" ? item.trim() : item;
    }
  });

  if (!base.logradouro && typeof valor.endereco === "string") {
    base.logradouro = valor.endereco.trim();
  }

  if (!base.cidade && typeof valor.municipio === "string") {
    base.cidade = valor.municipio.trim();
  }

  if (!base.uf && typeof valor.estado === "string") {
    base.uf = valor.estado.trim().slice(0, 2).toUpperCase();
  }

  return base;
}

export function enderecoPossuiDados(endereco) {
  if (!endereco) return false;
  return ["cep", "logradouro", "numero", "complemento", "bairro", "cidade", "uf", "referencia"].some((chave) => {
    const valor = endereco[chave];
    return typeof valor === "string" ? valor.trim().length > 0 : valor !== null && valor !== undefined;
  });
}

export function formatarEnderecoCurto(endereco) {
  if (!endereco) return "";
  const dados = typeof endereco === "string" ? normalizarEnderecoObjeto(endereco) : normalizarEnderecoObjeto({ ...endereco });
  const partes = [];

  if (dados.logradouro) {
    partes.push(dados.logradouro);
  }

  if (dados.numero) {
    partes.push(`Nº ${dados.numero}`);
  }

  const cidadeUf = [dados.cidade, dados.uf].filter(Boolean).join("/");
  if (cidadeUf) {
    partes.push(cidadeUf);
  }

  return partes.join(", ");
}
