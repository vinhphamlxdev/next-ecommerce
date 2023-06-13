import * as React from "react";
import Image from "next/image";
import convertToRelativePath from "@/utils/convertToRelativePath";

export interface IImageComponentProps {
  path: string;
}

export default function ImageComponent({ path = "" }: IImageComponentProps) {
  const relativePath = convertToRelativePath(path);

  return (
    <>
      <Image
        priority
        width={200}
        height={200}
        src={relativePath}
        className="h-12 w-12 opacity-0 bg-white rounded-full border"
        alt=""
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
      />
    </>
  );
}
