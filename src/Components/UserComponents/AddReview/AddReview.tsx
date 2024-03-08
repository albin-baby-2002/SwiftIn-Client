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
    <div className=" flex  w-[45%] justify-center  gap-6   rounded-xl   py-5 ">
      <div className="  text-neutral-500 ">
        <div className=" ps-1">
          <p className="  mt-2  font-Sen text-[28px] font-bold text-black">
            Add Your Review
          </p>
          <p className=" mt-3   font-bold"> tell us about your experience</p>

          <p className=" mt-2 w-[80%]  font-bold"> Also give rating</p>
        </div>

        <button
          onClick={addReview}
          className=" mt-5 rounded-md bg-black px-4 py-2 text-sm  font-semibold text-white"
        >
          Submit Your Review
        </button>
      </div>

      <div className="   flex w-[45%] flex-col justify-center gap-2 ">
        <div className=" flex justify-center gap-2 text-sm"></div>

        <div className=" mt-2  flex items-center justify-between gap-2 rounded-md   border px-4 py-2 ">
          <p className=" font-Sen  font-bold">Rating</p>

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
          className="   mt-3 h-full  w-full rounded-lg border px-2 py-2 font-Sen text-sm font-semibold  outline-none focus:border-black "
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
