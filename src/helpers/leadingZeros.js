export default function leadingZeros(num, places = 2) {
  return String(num).padStart(places, '0');
}
