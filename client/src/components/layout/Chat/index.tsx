import Tippy from "@tippyjs/react";
import * as React from "react";
import { BsMessenger } from "react-icons/bs";
import "tippy.js/dist/tippy.css";
import ChatPopup from "./ChatPopup";
import useClickOutSide from "@/hooks/useClickOutSide";

export interface IChatProps {}

export default function Chat(props: IChatProps) {
  const {
    menuRef,
    popupRef,
    setShow: setShowChatPopup,
    show: showChatPopup,
  } = useClickOutSide();
  return (
    <div className="chat-container fixed z-[500] right-8 bottom-20">
      <Tippy content="Inbox với shop">
        <div
          onClick={() => setShowChatPopup(!showChatPopup)}
          className=" chat-button cursor-pointer hover:opacity-80 shadow-md  bg-white w-10 h-10 rounded-full flex justify-center items-center"
        >
          <BsMessenger className="text-blue-500 text-lg"></BsMessenger>
        </div>
      </Tippy>
      <ChatPopup
        showChatPopup={showChatPopup}
        setShowChatPopup={setShowChatPopup}
      />
    </div>
  );
}
