export default function areSetsEqual(set1, set2) {
  if (set1.size !== set2.size) {
    return false;
  }

  const union = new Set([...set1, ...set2]);
  return union.size === set1.size;
}
