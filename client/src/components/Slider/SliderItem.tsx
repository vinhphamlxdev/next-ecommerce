import * as React from "react";
import style from "@/styles/client/slider/slider.module.scss";
export interface ISliderItemProps {
  item: any;
  className: string;
}

export default function SliderItem({ item, className }: ISliderItemProps) {
  return (
    <div className={`relative w-full home-slider-item ${style} ${className}`}>
      <img src={item.thumbnail} alt="" />
      {/* <div
        style={{
          backgroundImage: `url(${item.thumbnail})`,
        }}
        className="slider"
      >
        <div className="px-10 home-slider-slide py-[140px]">
          <div className="flex flex-col">
            <div className="pl-[100px] home-slider-heading text-white font-light text-base slide__content relative mb-3">
              Discover our best furniture collection from home
            </div>
            <h3 className="mb-4 text-4xl font-semibold text-white home-slider-header slide-title">
              Stylish Furniture
              <br />
              Bring Beauti
            </h3>
            <div className="mb-4 text-base font-light text-white home-slider-desc">
              Great furniture can bring beauty at your home, So buy our popular
              <br />
              and stylish furniture. Now you get up to 100 % discount now.
            </div>
            <div className="home-banner-btn">
              <div className="text-secondary hover:text-white inline-block py-2 bg-white font-semibold tracking-[0.2px] px-4 rounded-md transition-all hover:bg-bgPrimary">
                Shop Now
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
