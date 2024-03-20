import Skeleton from "react-loading-skeleton";

interface TWishlistSkeletonProps {
  count: number;
}
const WishlistSkeleton: React.FC<TWishlistSkeletonProps> = ({ count }) => {
  const CardCount: number[] = new Array(count).fill(0);

  return CardCount.map((v, i) => (
    <div
      key={i + v}
      className=" mx-auto h-[270px] w-[90%] rounded-xl border bg-white px-6 py-6  shadow-xl sm:min-h-[280px]"
    >
      <div className="  h-full  items-center   gap-3     ">
        <div className="  h-4/5  ">
          <Skeleton className=" h-full rounded-xl" />
        </div>
        <div className="  py-4   ">
          <div className=" flex justify-between  gap-3 ">
            <p className=" w-full">
              <Skeleton height={30} />
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default WishlistSkeleton;
