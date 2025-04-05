const tariffs: { [key: string]: { rate: number } } = {
  residential: { rate: 0.12 },
  commercial: { rate: 0.15 },
};

export function calculateBill(units: number, type: string): number {
  if (!tariffs[type] || units < 0) return 0;
  return units * tariffs[type].rate;
}
