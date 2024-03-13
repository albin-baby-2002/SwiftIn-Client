import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TcardSkeletonProps {
  count: number;
}

const ProductSkeleton: React.FC<TcardSkeletonProps> = ({ count }) => {
  const CardCount: number[] = new Array(count).fill(0);

  return CardCount.map((v, i) => (
    <div key={i} className=" min-h-[270px] sm:min-h-[330px] w-[90%]">
      <div className="  h-full  items-center   gap-3    ">
        <div className="  h-2/3   ">
          <Skeleton className=" h-full rounded-xl" />
        </div>
        <div className=" h-1/3 py-4   ">
          <div className=" flex justify-between px-2">
            <p className=" w-[25%]">
              <Skeleton />
            </p>
            <p className=" w-[25%]">
              <Skeleton />
            </p>
          </div>

          <div className=" mt-2 flex justify-between px-2">
            <p className=" w-2/5">
              <Skeleton height={10} />
            </p>
            <p className=" w-[35%]">
              <Skeleton height={10} />
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default ProductSkeleton;
