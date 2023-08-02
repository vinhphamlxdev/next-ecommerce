export default function isValidPrice(number: any) {
  if (isNaN(number)) {
    return false;
  }
  // Kiểm tra nếu số là vô cùng (+Infinity, -Infinity)
  if (!isFinite(number)) {
    return false;
  }
  // Kiểm tra nếu số là NaN (Not-a-Number)
  if (typeof number === "number" && !Number.isFinite(number)) {
    return false;
  }
  if (number < 0) {
    return false;
  }
  return true;
}
