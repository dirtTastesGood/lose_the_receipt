export default (expiry) => {
  const { days, hours, minutes, seconds } = expiry;

  const interval = days * 24 * 60 * 60 * 1000 +
                   hours * 60 * 60 * 1000 +
                   minutes * 60 * 1000 +
                   seconds * 1000

  setInterval()
};
