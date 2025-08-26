// Utility function for className merging
export function cn(...inputs: (string | undefined | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}
