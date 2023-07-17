import setToCookie from "./setToCookie";

export default function deleteFromCookie(name: string) {
  setToCookie(name, "", {
    "max-age": -1,
  });
}
