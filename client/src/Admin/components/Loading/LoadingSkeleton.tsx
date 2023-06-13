import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface ILoadingSkeletonProps {
  columns?: number;
  columnGap?: number;
  count: number;
  columnRow?: number;
  height?: number;
}

export default function LoadingSkeleton({
  columns = 1,
  columnGap = 5,
  columnRow = 0,
  count = 1,
  height = 10,
}: ILoadingSkeletonProps) {
  return (
    <div
      className={`grid gap-y-${columnRow} grid-cols-${columns} gap-x-${columnGap}`}
    >
      {new Array(count).fill(0).map((e: any, index: number) => {
        return <Skeleton key={index} className={`h-${height}`} />;
      })}
    </div>
  );
}
