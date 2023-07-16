import * as React from "react";
import { toast } from "react-toastify";

export default function validateImage(
  event: React.ChangeEvent<HTMLInputElement> | any
) {
  //data is an array key of file
  const data = Object.keys(event.target.files);
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const check = data.every((val) =>
      /(\.|\/)(gif|jpe?g|png|webp)$/i.test(event.target.files[val].type)
    );
    if (!check) {
      toast.error("Vui lòng chọn ảnh định dạng png, gif hoặc jpeg!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "light",
      });
      return false;
    }
  } else {
    toast.error("File invalid. Please choose correct file!", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "light",
    });
    return false;
  }
  return data;
}
