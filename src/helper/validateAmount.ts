/**
 * @description Validates the amount to be a number and returns a string with 2 decimal places.
 * @param {string | number} amount
 * @returns  {string}
 */
export default function validateAmount(amount: number | string): string {
  if (!amount) throw new Error("Amount is required");
  if (typeof amount === "string") amount = Number(amount);
  if (isNaN(amount)) throw new Error("Amount must be a number");
  if (Number(amount) === amount && amount % 1 === 0) amount = amount.toFixed(2);
  return String(amount);
}
