export default function splitArray(array, parts) {
  if (array.length === 0) return;
  const copiedArray = [...array];
  const result = [];
  let innerIndex = 0;
  for (let i = 0; i < parts; i++) result.push([]);
  for (let i = 0; i < copiedArray.length; i++) {
    result[innerIndex].push(copiedArray[i]);
    innerIndex++;
    if (innerIndex === parts) innerIndex = 0;
  }
  return result;
}
