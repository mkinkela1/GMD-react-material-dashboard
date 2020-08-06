import leadingZeros from './leadingZeros';

export default function getDate(date) {

  const parsedDate = new Date(date);

  return `${leadingZeros(parsedDate.getDate())}.${leadingZeros(parsedDate.getMonth()+1)}.${parsedDate.getFullYear()}.`;
}
