export default function splitArray(array, parts) {
  const copiedArray = [...array];
  const result = [];
  for (let i = parts; i > 0; i--) {
    result.push(copiedArray.splice(0, Math.ceil(copiedArray.length / i)));
  }
  return result;
}
