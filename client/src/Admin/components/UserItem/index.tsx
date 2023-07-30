import * as React from "react";
import Image from "next/image";
import { IMG_SRC } from "@/common/constanst";
import { IUser } from "@/types/authInterface";
export interface IUserItemProps {
  item: IUser;
}

export default function UserItem({ item }: IUserItemProps) {
  const { createdAt, email, fullName, enabled, roles, id } = item;
  const checkRoleAdmin = roles?.some((role) => role.name === "ROLE_ADMIN");
  return (
    <tr className="bg-gray-700 mt-2">
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        <Image
          src={IMG_SRC.avatar}
          className="h-12 w-12 bg-white rounded-full border"
          alt="..."
        />
        <span className="ml-3 font-bold text-white ">{fullName}</span>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <p aria-expanded="false">{email}</p>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {checkRoleAdmin ? (
          <button className="py-3 px-5 rounded-[5px] bg-activeBg">ADMIN</button>
        ) : (
          <button className="py-3 px-5 rounded-[5px] bg-activeBg">
            CUSTOMER
          </button>
        )}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <button className="py-3 px-5 rounded-[5px] bg-activeBg">
          Hoạt Động
        </button>
      </td>
    </tr>
  );
}
