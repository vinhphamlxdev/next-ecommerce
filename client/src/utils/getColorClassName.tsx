export default function getColorClassName(colorName: string) {
  switch (colorName) {
    case "Black":
      return "bg-[#000000]";
      break;
    case "White":
      return "bg-[#adb5bd] text-black";
      break;
    case "Green":
      return "bg-[#114b1c]";
      break;
    case "Blue":
      return "bg-[#4cc9f0]";
      break;
    case "Dark Red":
      return "bg-red-700";
      break;
    case "Belge":
      return "bg-[#e7cea4]";
      break;
    case "Metal Blue":
      return "bg-[#6f7e97]";
      break;
    default:
      return "";
      break;
  }
}
