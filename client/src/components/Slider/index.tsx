import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { IMG_SRC } from "@/common/constanst";
import SliderItem from "./SliderItem";

export interface ISliderProps {}
const sliders = [
  {
    id: 1,
    thumbnail: `https://file.hstatic.net/200000195489/file/banner_web-01_0b869214f97d45c7a17be4c203be93f7.jpg`,
  },
  {
    id: 2,
    thumbnail:
      "https://file.hstatic.net/200000195489/file/banner_web_b3d6557ba6244c7a8cf7b72d78e7c3d5.jpg",
  },
  {
    id: 3,
    thumbnail:
      "https://file.hstatic.net/200000195489/file/website_0617672658b14fd798d1511498ae4159.jpg",
  },
];
export default function Slider(props: ISliderProps) {
  SwiperCore.use([Autoplay]);
  return (
    <div className="relative slider-home-client">
      <Swiper
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={600}
        autoplay={{ delay: 3000 }}
      >
        {sliders.map((item, index) => {
          return (
            <SwiperSlide key={item.id}>
              {({ isActive }) => (
                <SliderItem
                  item={item}
                  className={`${isActive ? "active" : ""}`}
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
