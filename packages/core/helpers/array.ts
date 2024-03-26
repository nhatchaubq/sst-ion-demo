export function* chunkArray(arr: any[], chunkSize: number) {
  if (!arr || !arr.length) {
    return [];
  }
  for (let i = 0; i < arr.length; i += chunkSize) {
    yield arr.slice(i, i + chunkSize);
  }
  return [];
}
