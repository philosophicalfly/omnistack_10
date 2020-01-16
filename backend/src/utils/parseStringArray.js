module.exports = arrayAsString => {
  return arrayAsString.split(',').map(string => string.trim());
}
