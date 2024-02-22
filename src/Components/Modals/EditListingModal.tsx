import useEditProfileModal from "../../Hooks/zustandStore/useEditProfileModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../Inputs/Input";

import { useEffect, useState } from "react";
import Modal from "./ParentModal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "../../Schemas/editProfileSchema";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { PROFILE_DATA_URL } from "../../Api/EndPoints";
import useEditListingsModal from "../../Hooks/zustandStore/useEditListingsModal";

interface ListingInfo {
  _id: string;
  userID: string;
  totalRooms: number;
  amenities: string[];
  maxGuestsPerRoom: number;
  listingTitle: string;
  bedsPerRoom: number;
  bathroomPerRoom: number;
  roomType: string;
  aboutHotel: string;
  rentPerNight: number;
}
interface SingleListingDataResponse {
  listing: ListingInfo;
}

interface EditListingModal {
  reFetchData: () => void;
}

const EditListingModal: React.FC<EditListingModal> = ({ reFetchData }) => {
  const AxiosPrivate = useAxiosPrivate();

  // definition for amenities

  const amenitiesTypes = {
    WIFI: "freeWifi",
    POOL: "commonPool",
    AC: "airConditioning",
    PARKING: "carParking",
    TV: "cableTv",
    HOT_TUB: "hotTub",
  } as const;

  const editListingModalState = useEditListingsModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      totalRooms: 1,
      amenities: [],
      maxGuestsPerRoom: 1,
      listingTitle: "",
      bedsPerRoom: 1,
      bathroomPerRoom: 1,
      roomType: "",
      aboutHotel: "",
      rentPerNight: 1,
    },
    resolver: zodResolver(EditProfileSchema),
  });

  const [amenities] = watch(["amenities"]) as [string[]];

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<SingleListingDataResponse>(
          `user/listing/${editListingModalState.listingID}`,
        );

        if (isMounted) {
          console.log(response.data, "edit listing");

          reset(response.data.listing);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [editListingModalState.isOpen]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      //   setIsLoading(true);
      //   await AxiosPrivate.patch("/user/profile", data);

      //   setIsLoading(false);

      //   toast.success("Profile Edited SuccessFully");

      //   editProfileModalState.onClose();

      reFetchData();
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  const bodyContent = (
    <div>
      <Input
        id="listingTitle"
        label="Listing Title"
        errors={errors}
        register={register}
      />

      <Input
        id="totalRooms"
        label="Total Rooms"
        errors={errors}
        register={register}
      />

      <Input
        id="maxGuestsPerRoom"
        label="Max Guest Per Room"
        errors={errors}
        register={register}
      />

      <Input
        id="bedsPerRoom"
        label="Beds Per Room"
        errors={errors}
        register={register}
      />

      <Input
        id="bathroomPerRoom"
        label="Bathroom Per Room"
        errors={errors}
        register={register}
      />

      <Input
        id="roomType"
        label="Room Type"
        errors={errors}
        register={register}
      />
      <Input
        id="rentPerNight"
        label="Rent Per Night"
        errors={errors}
        register={register}
      />

      <Input
        id="aboutHotel"
        label="About Hotel"
        errors={errors}
        register={register}
        textBox
      />

      <div>
        <input
          type="checkbox"
          id="myCheckbox"
          name="myCheckbox"
          checked={amenities.includes(amenitiesTypes.WIFI)} // Set the checked attribute based on the state
          onChange={() => {}} // Handle checkbox change
        />
        <label className=" font-Inter font-semibold" htmlFor="myCheckbox">
          {amenitiesTypes.WIFI}
        </label>
      </div>
    </div>
  );

  return (
    <Modal
      title="Edit Listing"
      onClose={editListingModalState.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={editListingModalState.isOpen}
      submitActionLabel="Edit"
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default EditListingModal;
