// Get last index value of string / array
const tail = i => {
  return i[i.length - 1];
};

// Get function displayName(non-standard) or name.
const getFunctionName = fn => {
  if (typeof fn !== 'function') {
    throw new Error('getFunctionName expected a function');
  }

  return fn.displayName || fn.name || 'anonymous';
};

module.exports = {
  tail,
  getFunctionName,
};
