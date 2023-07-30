import * as React from "react";
import { AiFillFacebook, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { styled } from "styled-components";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <StyledFooter className="pt-8 footer-section">
      <div className="grid py-10 bg-slate-800 grid-cols-3 text-gray-300 px-6 pb-5 gap-x-7">
        <div className="relative">
          <img
            className="h-64"
            src="https://file.hstatic.net/1000321269/file/724bab05b6a96cf735b8_b7969b41ce6c43cd98ea90d7c56abefc.jpg"
            alt=""
          />
        </div>
        <div className="flex text-gray-300 flex-col gap-y-3 ">
          <span className="text-xl font-medium">Thông tin liên hệ</span>
          <div className="flex flex-col gap-y-3">
            <div className="relative pl-7">
              <IoLocationOutline
                style={{ color: "#fff" }}
                className="text-lg left-[10px] absolute text-white"
              ></IoLocationOutline>
              <span className="text-sm  left-0 top-0 font-normal">
                * FLAGSHIP STORE: 26 Trần Quang Diệu, phường 14, quận 3
                ---------------- * G-TOWN: 350 Điện Biên Phủ, phường 17, quận
                Bình Thạnh ---------- * G-TOWN 2: 136 Nguyễn Hồng Đào, phường
                13, quận Tân Bình ---------------- * Đồng Nai: 47 Dương Tử
                Giang, phường Tân Tiến, TP. Biên Hoà -------
              </span>
            </div>
            <div className="relative pl-7">
              <AiOutlinePhone className="text-lg left-[10px] absolute text-white "></AiOutlinePhone>
              <div className="ml-3">0364 407 6342</div>
            </div>
            <div className="relative pl-7">
              <AiOutlineMail className="text-lg left-[10px] absolute text-white "></AiOutlineMail>
              <div className="ml-3">vinhpham@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <h3 className="text-xl font-medium text-gray-300">Fanpage</h3>
          <div className="h-32 relative">
            <div className="w-64 h-32 relative overflow-hidden">
              <img
                src="https://product.hstatic.net/1000321269/product/typoflame1_d06ca57b84ed47c884bf7c2020d25d03_master.jpg"
                alt=""
              />
            </div>
            <div className="clear-fix px-3 flex items-center gap-x-3">
              {/* <img
                className="w-12 h-12"
                src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/333973720_148309664752997_8700433039816522932_n.jpg?stp=cp0_dst-jpg_p50x50&_nc_cat=104&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=ek7DoEukDikAX_FOGlx&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBx2W5uv51KrY_boVeW9D-KAbciWPbOwqTluSLdckZ5nQ&oe=64B7C699"
                alt=""
              /> */}
              <span className="text-black">Fashion</span>
            </div>
            <div className="px-2 flex gap-x-2 cursor-pointer absolute bottom-2 left-4 rounded-sm py-2 bg-white">
              <AiFillFacebook className="text-blue-500 text-sm"></AiFillFacebook>

              <span className="text-gray-400 text-xs font-light">
                Follow Page
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-3 border border-gray-300">
        <span className="text-sm font-light text-textPrimary">
          Copyright Pham Huu Vinh© 2023
        </span>
        <div className="copy-right-img">
          <img
            src="https://risingtheme.com/html/demo-furea/furea/assets/img/other/payment-visa-card.webp"
            alt=""
          />
        </div>
      </div>
    </StyledFooter>
  );
}
const StyledFooter = styled.div`
  .clear-fix {
    bottom: 40px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
`;
