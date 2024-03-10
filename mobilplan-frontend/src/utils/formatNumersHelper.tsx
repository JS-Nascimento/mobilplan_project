// Função para formatar o valor para exibição
export function formatarPreco(valor: string): string {
  const numero = Number(valor);
  if (!isNaN(numero)) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numero);
  }
  return "";
}
