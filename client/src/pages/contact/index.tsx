import Breadcrumb from "@/components/Breadcrumb";
import LayoutClient from "@/components/layout/LayoutMain";
import * as React from "react";

export interface IContactProps {}

export default function Contact(props: IContactProps) {
  return (
    <LayoutClient>
      <Breadcrumb titlePage="Contact"></Breadcrumb>
      <div className="wrapper-layout">
        <div className="py-10">
          <h3 className="text-textColor font-bold text-base mb-7">CONTACT</h3>
          <div className="flex flex-col gap-y-5">
            <span className="text-sm text-textColor">
              • Hotline: 0933782768
            </span>
            <span className="text-sm text-textColor"> • IG: @vinhphamlx</span>
            <span className="text-sm text-textColor">
              • FB: fb.com/vinhpham
            </span>
            <span className="text-sm text-textColor">
              • Store I: 445 Sư Vạn Hạnh, P.12, Q.10, TP.HCM.
            </span>
            <span className="text-sm text-textColor">
              • Store II: 48 Trần Quang Diệu, P.14, Q.3, TP.HCM.
            </span>
            <span className="text-sm text-textColor">
              • Store III: 350 Điện Biên Phủ, P.17, Q. Bình Thạnh, TP.HCM.
            </span>
            <span className="text-sm text-textColor">
              • Store IV: G-Town 2, 136 Nguyễn Hồng Đào, P.14, Q.Tân Bình,
              TP.HCM.
            </span>
            <span className="text-sm text-textColor">
              • Store V: 463 Quang Trung, P.10, Q. Gò Vấp, TP.HCM.
            </span>
            <span className="text-sm text-textColor">
              • Store VII: TNP (Sense Market) - Đối Diện Số 90 Lê Lai, P. Bến
              Nghé, Q.1, TP.HCM.
            </span>
          </div>
          <div className="mt-10 text-textColor">______________________</div>
        </div>
      </div>
    </LayoutClient>
  );
}
