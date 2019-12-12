exports.cleanId = id => {
  const [firstId, secondId] = id.split('-');

  if (!!firstId && !!secondId) {
    // eg: `1861-2328`
    return id;
  } else if (!secondId) {
    // eg: `1861-`
    return firstId;
  } else {
    // eg: `-2328`
    return secondId;
  }
};
