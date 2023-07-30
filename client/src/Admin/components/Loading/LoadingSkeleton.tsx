import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface ILoadingSkeletonProps {
  columns?: number;
  columnGap?: number;
  count: number;
  columnRow?: number;
  height?: number;
  className?: string;
}

export default function LoadingSkeleton({
  columns = 1,
  columnGap = 5,
  columnRow = 0,
  count = 1,
  height = 10,
  className,
}: ILoadingSkeletonProps) {
  return (
    <div
      className={`grid gap-y-${columnRow} grid-cols-${columns} gap-x-${columnGap} ${className}`}
    >
      {new Array(count).fill(0).map((e: any, index: number) => {
        return (
          <div key={index}>
            <Skeleton style={{ height: height }} />
          </div>
        );
      })}
    </div>
  );
}
