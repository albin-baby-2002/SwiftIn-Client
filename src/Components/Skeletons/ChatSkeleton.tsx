import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TcardSkeletonProps {
  count: number;
}

const ChatSkeleton: React.FC<TcardSkeletonProps> = ({ count }) => {
  const CardCount: number[] = new Array(count).fill(0);

  return CardCount.map((v, i) => (
    <div key={i}>
      <div className=" flex h-14   items-center gap-3 rounded-md border-2  border-[#808080] px-4  ">
        <div className=" w-8  ">
          <Skeleton circle width={26} height={26} />
        </div>
        <div className=" w-32  pb-2 ">
          <p>
            <Skeleton height={10} />
          </p>
          <p className=" h-2 w-full rounded bg-[#808080]"></p>
        </div>
      </div>
    </div>
  ));
};

export default ChatSkeleton;
