export default (bottom, top) => {
  if (bottom && top) {
    let len = top - bottom + 1;
    return [...Array(len)].map((e, i) => bottom + i);
  } else {
    return [];
  }
};
