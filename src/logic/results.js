
export const decodeMbldResult = value => {
  if (value <= 0) return { solved: 0, attempted: 0, centiseconds: value };
  const missed = value % 100;
  const seconds = Math.floor(value / 100) % 1e5;
  const difference = 99 - (Math.floor(value / 1e7) % 100);
  const solved = difference + missed;
  const attempted = solved + missed;
  const centiseconds = seconds === 99999 ? null : seconds * 100;
  return { solved, attempted, centiseconds };
};

export const encodeMbldResult = ({ solved, attempted, centiseconds }) => {
  if (centiseconds <= 0) return centiseconds;
  const missed = attempted - solved;
  const dd = 99 - (solved - missed);
  const seconds = Math.round(
    (centiseconds || 9999900) / 100
  ); /* 99999 seconds is used for unknown time. */
  return dd * 1e7 + seconds * 1e2 + missed;
};

const timeInSecToValue = resultString =>
  Math.floor(parseFloat(resultString)*100);

const timeInMinutesToValue = resultString => {
  let [min, rest] = resultString.split(":");
  min = parseInt(min);
  const centisec = timeInSecToValue(rest);
  return min * 6000 + centisec;
};

export const timeToValue = resultString => {
  switch (resultString) {
    case "DNF":
      return -1;
    case "DNS":
      return -2;
    default:
      if (!resultString) {
        return 0;
      } else if (resultString.includes(":")) {
        return timeInMinutesToValue(resultString);
      } else {
        return timeInSecToValue(resultString);
      }
  }
};

