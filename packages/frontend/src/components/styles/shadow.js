// https://ethercreative.github.io/react-native-shadow-generator/
const interpolate = (i, a, b, a2, b2) => ((i - a) * (b2 - a2)) / (b - a) + a2;
const penumbra = [
  [1, 1],
  [2, 2],
  [3, 4],
  [4, 5],
  [5, 8],
  [6, 10],
  [7, 10],
  [8, 10],
  [9, 12],
  [10, 14],
  [11, 15],
  [12, 17],
  [13, 19],
  [14, 21],
  [15, 22],
  [16, 24],
  [17, 26],
  [18, 28],
  [19, 29],
  [20, 31],
  [21, 33],
  [22, 35],
  [23, 36],
  [24, 38]
];

const shadow = (depth = 10) => {
  const [y, blur] = penumbra[depth - 1];

  return {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: y === 1 ? 1 : Math.floor(y * 0.5)
    },
    shadowOpacity: interpolate(depth - 1, 1, 24, 0.2, 0.6).toFixed(2),
    shadowRadius: interpolate(blur, 1, 38, 1, 16).toFixed(2),
    elevation: depth
  };
};

export default shadow;
