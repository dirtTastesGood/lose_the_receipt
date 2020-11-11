export default (bottom, top) => {
  let len = top - bottom + 1;
  return [...Array(len)].map((e, i) => bottom + i);
};
