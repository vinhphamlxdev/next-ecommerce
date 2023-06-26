import * as React from "react";
import { IMG_SRC } from "@/common/constanst";
import Image from "next/image";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import validateImage from "@/utils/validateImage";
export interface ISelectImageProps {
  images: string[];
  setImage: React.Dispatch<React.SetStateAction<string[]>>;
  file: File[];
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
  setDeleteImgs?: React.Dispatch<React.SetStateAction<string[]>>;
  deleteImgs?: string[] | any;
  colums?: number;
  columGap?: number;
}

export default function SelectImage(props: ISelectImageProps) {
  const {
    images,
    setFile,
    setImage,
    file,
    setDeleteImgs,
    deleteImgs,
    colums = 5,
    columGap = 4,
  } = props;
  const [key, setKey] = React.useState(1);
  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    const check = validateImage(event);
    if (!check) {
      return;
    }

    let arr: any[] = [];
    let filesArr: any[] = [];
    //check is an array key:[0,1,2...]
    check.forEach((val) => {
      const fileValid = event.target?.files[val];
      const reader = new FileReader();
      // Hàm xử lý sự kiện `onload` sau khi file được load
      reader.onload = function (event) {
        // Truy cập vào thuộc tính `result` để lấy được dữ liệu File dưới dạng `data URL
        arr = [...arr, event.target?.result];
        filesArr = [...filesArr, fileValid];
      };
      //when file loaded, we need to get array file and array image url, with array file to send to server,
      // with arr img url to display
      reader.onloadend = function () {
        setFile([...file, ...filesArr]);
        setImage([...images, ...arr]);
      };
      reader.readAsDataURL(fileValid);
    });
  };

  const handleDeleteImg = (imgUrl: string, e: any) => {
    console.log("imgUrl", imgUrl);
    const newImages = images.filter((img) => img != imgUrl);
    setImage(newImages);
    if (setDeleteImgs && imgUrl.startsWith("https")) {
      setDeleteImgs([...deleteImgs, imgUrl]);
    }
    if (setDeleteImgs && !imgUrl.startsWith("https")) {
      let filesNotDelete: any;
      file.forEach((val) => {
        const reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onload = function (event: any) {
          if (event.target.result === imgUrl) {
            filesNotDelete = val;
            //set lại list file khác với file click xóa
            setFile(file.filter((value) => value !== filesNotDelete));
            return;
          }
        };
      });
    }
  };
  return (
    <div className="flex flex-col gap-y-3">
      {images && (
        <div className={`grid grid-cols-5 gap-y-3 gap-x-${columGap}`}>
          {images?.map((img, index) => {
            return (
              <div key={index} className="relative  w-full image-product">
                <Image
                  width={176}
                  height={176}
                  className="object-cover h-44 border border-gray-300"
                  src={img}
                  alt=""
                />
                <GrFormClose
                  onClick={(e) => handleDeleteImg(img, e)}
                  className="cursor-pointer text-white absolute top-2 right-2 hover:text-red-500 text-2xl"
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="relative">
        <label
          className="text-white flex gap-x-2 shadow-md justify-center items-center bg-pink-500 px-3 py-2 text-xs font-normal rounded-2xl cursor-pointer"
          htmlFor="img-product"
        >
          Choose file
          <AiOutlineCloudUpload className="text-base  leading-[0px]" />
        </label>
        <input
          key={key}
          onChange={(e) => {
            handleFileSelect(e);
            setKey((key) => key + 1);
          }}
          hidden
          id="img-product"
          type="file"
          multiple
        />
      </div>
    </div>
  );
}
