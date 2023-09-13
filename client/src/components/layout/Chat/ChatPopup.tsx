import { IMG_SRC } from "@/common/constanst";
import { CheckIcon } from "@/components/Icons/AppIcon";
import * as React from "react";
import brand from "@/assets/logo.png";
import Image from "next/image";
import { GrEmoji } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import IconPopup from "./IconPopup";
import useClickOutSide from "@/hooks/useClickOutSide";
export interface IChatPopupProps {
  showChatPopup: boolean;
  setShowChatPopup: any;
}

export default function ChatPopup({
  showChatPopup,
  setShowChatPopup,
}: IChatPopupProps) {
  const {
    menuRef,
    popupRef,
    setShow: setShowIconPopup,
    show: showIconPopup,
  } = useClickOutSide();
  const [inputMessage, setInputMessage] = React.useState<string>("");
  return (
    <div
      style={{
        display: showChatPopup ? "" : "none",
      }}
      className="absolute chat-popup bottom-0  right-11 flex flex-col bg-white rounded-md  h-[450px] w-96"
    >
      <div className="flex p-3 justify-between">
        <div className="flex gap-x-3 items-center">
          <div className="avatar-mess  rounded-full">
            <Image width={40} height={40} src={brand} alt="" />
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-lg select-none font-medium">
              Beauty Fashion
            </span>
            <CheckIcon />
          </div>
        </div>
        <i
          onClick={() => setShowChatPopup(false)}
          className="bi text-3xl text-black  cursor-pointer hover:opacity-80 bi-dash-lg"
        ></i>
      </div>
      <div className="has-scrollbar chat-container mb-3 h-[280px] mt-2 px-2 flex flex-col gap-y-1">
        <div className="flex flex-col message-element mr-auto  max-w-[85%] gap-y-2 other-message">
          <div className="flex flex-col">
            <div className="message-block  bg-[#e5e5e5] px-3 py-2  text-black  rounded-xl    leading-[18px] text-sm">
              Xin chào Khách mời 8534! Cảm ơn bạn đã nhắn tin. Hiện tại, chúng
              tôi không ở đây, nhưng chúng tôi sẽ sớm liên hệ lại với bạn!
            </div>
            <Image width={20} height={20} src={brand} alt="" />
          </div>
          <span className="real-time-message text-white text-xs text-center font-light">
            00:13
          </span>
        </div>
        <div className="flex flex-col ml-auto message-element  max-w-[85%] gap-y-2 my-message">
          <div className="flex flex-col">
            <div className="message-block  bg-bluePrimary  px-3 py-2  text-white  rounded-xl    leading-[18px] text-sm">
              Xin chào Khách mời 7573! Cảm ơn bạn đã nhắn tin. Hiện tại, chúng
              tôi không ở đây, nhưng chúng tôi sẽ sớm liên hệ lại với bạn!
            </div>
            <span className="text-xs peer-name  font-light text-primary hidden">
              🐹vinh
            </span>
          </div>
          <span className="real-time-message text-white text-xs text-center font-light">
            00:13
          </span>
        </div>
      </div>
      <div className="message-form-container pr-2 mt-auto flex gap-x-3 items-center">
        <div className=" relative flex-1  bg-[#e5e5e5 rounded-md ">
          <input
            placeholder="Enter text here"
            className="border border-bordermood pl-2 pr-[38px] py-3 rounded-md bg-inherit w-full outline-none "
            type="text"
          />
          <div className="right-3 -translate-y-2/4 absolute top-2/4">
            <div onClick={() => setShowIconPopup(!showIconPopup)} ref={menuRef}>
              <GrEmoji className="text-xl transition-all hover:text-primary cursor-pointer z-50  text-black"></GrEmoji>
            </div>
            <IconPopup
              inputMessage={inputMessage}
              setInputValue={setInputMessage}
              setShow={setShowIconPopup}
              show={showIconPopup}
            />
          </div>
        </div>
        <div className="btn-send-message">
          <IoMdSend className="text-blue-500 text-lg hover:text-primary transition-all cursor-pointer"></IoMdSend>
        </div>
      </div>
    </div>
  );
}
