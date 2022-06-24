export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const random = (prev = 0) => {
  let next = 0;
  while (next === 0) {
    let rand = Math.floor(Math.random() * 10000);
    if (rand !== prev) next = rand;
  }
  return next;
};
