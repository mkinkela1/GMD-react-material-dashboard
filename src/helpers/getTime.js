import leadingZeros from './leadingZeros';

export default function getTime(date) {

  const parsedDate = new Date(date);

  return `${leadingZeros(parsedDate.getHours())}:${leadingZeros(parsedDate.getMinutes())}`;
}
