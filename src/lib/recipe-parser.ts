export default function parse(value: string | null) {
  if (!value) {
    return [];
  }

  return value.split("\n").filter(Boolean);
}
