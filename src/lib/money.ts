// Все суммы хранятся в тыйынах (1 сом = 100 тыйынов).

export function tyiynToSom(tyiyn: number): number {
  return Math.round(tyiyn) / 100;
}

export function somToTyiyn(som: number): number {
  return Math.round(som * 100);
}

export function formatKGS(tyiyn: number): string {
  const v = tyiynToSom(tyiyn);
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "KGS",
    minimumFractionDigits: v % 1 === 0 ? 0 : 2,
  }).format(v);
}

export function splitCommission(amount: number, commissionPercent: number) {
  const commission = Math.round((amount * commissionPercent) / 100);
  const psychologistAmount = amount - commission;
  return { commission, psychologistAmount };
}
