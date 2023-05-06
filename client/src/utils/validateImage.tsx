import * as React from "react";
import { toast } from "react-toastify";

export default function validateImage(
  event: React.ChangeEvent<HTMLInputElement> | any
) {
  const data = Object.keys(event.target.files);
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const check = data.every((val) =>
      /(\.|\/)(gif|jpe?g|png)$/i.test(event.target.files[val].type)
    );
    if (!check) {
      toast.error("File invalid. Please choose correct file!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
      return 0;
    }
  } else {
    toast.error("File invalid. Please choose correct file!", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
    return 0;
  }
  return data;
}
