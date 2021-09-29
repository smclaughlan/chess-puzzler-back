/**
 * Returns random number inclusive of min and max.
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
function randNum(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  randNum,
};
