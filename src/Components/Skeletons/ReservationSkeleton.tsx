import Skeleton from "react-loading-skeleton";

interface TReservationSkeletonProps {
  count: number;
}
const ReservationSkeleton: React.FC<TReservationSkeletonProps> = ({
  count,
}) => {
  const CardCount: number[] = new Array(count).fill(0);

  return CardCount.map((v, i) => (
    <div
      key={i + v}
      className=" mx-auto h-[270px]  w-[90%] rounded-xl bg-white px-4 py-6  shadow-md sm:min-h-[280px]"
    >
      <div className="  h-full  items-center   gap-3     ">
        <div className=" px-2    pb-3  ">
          <Skeleton className="   rounded-md" />
        </div>

        <div className="  h-2/3   ">
          <Skeleton className=" h-full rounded-xl" />
        </div>
        <div className="  py-4   ">
          <div className=" flex justify-between  gap-3 ">
            <p className=" w-1/2 ">
              <Skeleton height={25} />
            </p>
            <p className=" w-1/2">
              <Skeleton height={25} />
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default ReservationSkeleton;
