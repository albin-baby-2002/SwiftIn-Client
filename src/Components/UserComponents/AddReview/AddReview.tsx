import { useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import useAxiosPrivate from "../../../Hooks/AxiosPrivate/useAxiosPrivate";

interface TaddReviewProps {
  listingID: string;
}

const AddReview: React.FC<TaddReviewProps> = ({ listingID }) => {
  const [review, setReview] = useState("");

  const [rating, setRating] = useState(1);

  const AxiosPrivate = useAxiosPrivate();

  const addReview = async () => {
    try {
      let data = { rating, reviewMessage: review };

      await AxiosPrivate.post("/user/listing/review/add/" + listingID, data);

      toast.success(" Review Added");
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 401) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed To Add Review");
      }
    }
  };

  const increaseRating = () => {
    if (rating < 5) {
      setRating((val) => val + 1);
    } else {
      toast.error("maximum rating is 5");
    }
  };

  const decreaseRating = () => {
    if (rating > 1) {
      setRating((val) => val - 1);
    } else {
      toast.error("minimum rating is 1");
    }
  };

  return (
    <div className=" flex h-[200px] lg:h-[240px] md:w-[46%]  items-center justify-center gap-3 rounded-xl  border-2  px-3  lg:gap-6   lg:py-5 ">
      <div className="  text-neutral-500 md:w-1/3 lg:w-1/2 ">
        <div className=" ps-1">
          <p className="  mt-2 hidden font-Sen text-lg font-bold text-black lg:block lg:text-[24px]">
            Add Your Review
          </p>

          <p className="  mt-2 block font-Sen text-lg font-bold text-black lg:hidden lg:text-[24px]">
            Add Review
          </p>
          <p className=" mt-3  text-xs font-bold   lg:text-sm">
            {" "}
            tell us about your experience
          </p>

          <p className=" mt-2 w-[80%]  text-xs font-bold   lg:text-sm">
            {" "}
            Also give rating
          </p>
        </div>

        <button
          onClick={addReview}
          className=" mt-5 rounded-md bg-black px-4 py-2 text-xs font-semibold text-white  lg:hidden lg:text-sm"
        >
          Submit Review
        </button>
        <button
          onClick={addReview}
          className=" mt-5 hidden rounded-md bg-black px-4 py-2 text-xs font-semibold text-white  lg:block lg:text-sm"
        >
          Submit Your Review
        </button>
      </div>

      <div className="   flex  flex-col justify-center gap-2 ">
        <div className=" flex justify-center gap-2 text-xs lg:text-sm"></div>

        <div className="   flex items-center justify-between  gap-2 rounded-md border-2  border-gray-200   px-4  py-2 ">
          <p className=" font-Sen text-xs font-bold  lg:text-base">Rating</p>

          <div className=" flex  items-center gap-4">
            <p
              className=" cursor-pointer rounded-md border-2 px-1 py-1 hover:bg-black hover:text-white"
              onClick={decreaseRating}
            >
              <FaMinus size={10} />
            </p>
            <p className=" font-bold"> {rating}</p>
            <p
              className=" cursor-pointer rounded-md border-2 px-1 py-1 hover:bg-black hover:text-white "
              onClick={increaseRating}
            >
              <FaPlus size={10} />
            </p>
          </div>
        </div>

        <textarea
          className="   mt-3 h-[80px] w-full rounded-lg border-2 border-gray-200 px-2 py-2 font-Sen text-sm font-semibold  outline-none  focus:border-black lg:h-[100px] "
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default AddReview;
