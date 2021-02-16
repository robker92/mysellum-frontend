export function compareArrayAsc(field) {
  return function(a, b) {
    return (a[field] > b[field]) - (a[field] < b[field]);
  };
}

export function compareArrayDesc(field) {
  return function(a, b) {
    return (a[field] < b[field]) - (a[field] > b[field]);
  };
}
