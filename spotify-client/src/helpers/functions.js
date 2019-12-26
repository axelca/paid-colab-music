export const getMin = (data, parameter) => {
  return data.reduce(
    (min, p) => (p[parameter] < min ? p[parameter] : min),
    data[0][parameter]
  );
};

export const getMax = (data, parameter) => {
  return data.reduce(
    (max, p) => (p[parameter] > max ? p[parameter] : max),
    data[0][parameter]
  );
};

export const inRange = (songValue, peopleValue, playlistData) => {
  const min =
    parseFloat(playlistData.range * peopleValue + playlistData.low) - 0.03;
  const max =
    parseFloat(playlistData.range * peopleValue + playlistData.low) + 0.03;

  return songValue >= min && songValue <= max;
};
