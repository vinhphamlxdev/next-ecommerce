import * as React from "react";

export interface IHeaderTableProps {
  data: string[];
}

export default function HeaderTable({ data }: IHeaderTableProps) {
  return (
    <thead className="bg-gray-700">
      <tr>
        {data &&
          data.map((header, index) => {
            return (
              <th
                key={header}
                className={`${
                  index === 4 ? "pl-10" : ""
                } px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left`}
              >
                {header}
              </th>
            );
          })}
      </tr>
    </thead>
  );
}
