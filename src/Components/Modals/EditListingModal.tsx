import useEditProfileModal from "../../Hooks/zustandStore/useEditProfileModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../Inputs/Input";

import { useEffect, useState } from "react";
import Modal from "./ParentModal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "../../Schemas/editProfileSchema";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { PROFILE_DATA_URL, SINGLE_LISTING_URL } from "../../Api/EndPoints";
import useEditListingsModal from "../../Hooks/zustandStore/useEditListingsModal";
import { z } from "zod";

const EditListingSchema = z.object({
  totalRooms: z.number().min(1),
  maxGuestsPerRoom: z.number().min(1),
  bedsPerRoom: z.number().min(1),
  bathroomPerRoom: z.number().min(1),
  amenities: z.array(z.string()),
  aboutHotel: z.string().min(20),
  listingTitle: z.string().min(10).max(30),
  roomType: z.string().min(3),
  rentPerNight: z.number().min(1000),
});

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

  type amenity = (typeof amenitiesTypes)[keyof typeof amenitiesTypes];

  const editListingModalState = useEditListingsModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
    resolver: zodResolver(EditListingSchema),
  });

  const [amenities] = watch(["amenities"]) as [string[]];

  const handleAmenitiesCheckBox = (val: "on" | "off", amenity: amenity) => {
    console.log(val === "on");

    if (val === "on") {
      let existingAmenities = amenities;

      if (existingAmenities.includes(amenity)) return;

      let newAmenities = [...existingAmenities, amenity];
      console.log(newAmenities);

      setValue("amenities", newAmenities);
    } else {
      let existingAmenities = amenities;

      if (!existingAmenities.includes(amenity)) return;

      let newAmenities = existingAmenities.filter((val) => val !== amenity);
      console.log(newAmenities);

      setValue("amenities", newAmenities);
    }
  };

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
      setIsLoading(true);

      console.log(data);

      await AxiosPrivate.patch(
        SINGLE_LISTING_URL + `/${editListingModalState.listingID}`,
        data,
      );

      setIsLoading(false);

      toast.success("Listing Edited SuccessFully");

      editListingModalState.onClose();

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
    <div className=" flex flex-col gap-2">
      <Input
        id="listingTitle"
        label="Listing Title"
        errors={errors}
        register={register}
      />

      <div className=" flex justify-between  gap-4">
        <Input
          id="totalRooms"
          label="Total Rooms"
          errors={errors}
          register={register}
          HalfWidth
          type="number"
        />

        <Input
          id="maxGuestsPerRoom"
          label="Max Guest Per Room"
          errors={errors}
          register={register}
          HalfWidth
          type="number"
        />
      </div>

      <div className=" flex justify-between  gap-4">
        <Input
          id="bedsPerRoom"
          label="Beds Per Room"
          errors={errors}
          HalfWidth
          register={register}
          type="number"
        />

        <Input
          id="bathroomPerRoom"
          label="Bathroom Per Room"
          errors={errors}
          HalfWidth
          register={register}
          type="number"
        />
      </div>

      <div className="flex justify-between  gap-4">
        <Input
          id="roomType"
          label="Room Type"
          errors={errors}
          HalfWidth
          register={register}
        />
        <Input
          id="rentPerNight"
          label="Rent Per Night"
          errors={errors}
          HalfWidth
          register={register}
          type="number"
        />
      </div>

      <div className=" mt-3 flex flex-col gap-3">
        <p className="  ps-2 font-Inter text-sm font-bold  text-neutral-400">
          Amenities
        </p>

        <div className=" flex flex-col gap-6 rounded-md border-2  border-neutral-400 py-4 ps-3">
          <div className="  grid grid-cols-3 ">
            <div className=" flex gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                id="myCheckbox"
                name="myCheckbox"
                checked={amenities.includes(amenitiesTypes.WIFI)} // Set the checked attribute based on the state
                onChange={(e) => {
                  let val = e.target.checked;

                  console.log(val);

                  if (val) {
                    handleAmenitiesCheckBox("on", amenitiesTypes.WIFI);

                    return;
                  } else {
                    handleAmenitiesCheckBox("off", amenitiesTypes.WIFI);
                  }
                }} // Handle checkbox change
              />
              <label
                className="   text-sm  font-semibold   tracking-wider  text-neutral-500"
                htmlFor="myCheckbox"
              >
                Free Wifi
              </label>
            </div>

            <div className=" flex gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                id="myCheckbox"
                name="myCheckbox"
                checked={amenities.includes(amenitiesTypes.POOL)} // Set the checked attribute based on the state
                onChange={(e) => {
                  let val = e.target.checked;

                  console.log(val);

                  if (val) {
                    handleAmenitiesCheckBox("on", amenitiesTypes.POOL);

                    return;
                  } else {
                    handleAmenitiesCheckBox("off", amenitiesTypes.POOL);
                  }
                }} // Handle checkbox change
              />
              <label
                className="   text-sm  font-semibold   tracking-wider  text-neutral-500"
                htmlFor="myCheckbox"
              >
                Common Pool
              </label>
            </div>

            <div className=" flex gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                id="myCheckbox"
                name="myCheckbox"
                checked={amenities.includes(amenitiesTypes.AC)} // Set the checked attribute based on the state
                onChange={(e) => {
                  let val = e.target.checked;

                  console.log(val);

                  if (val) {
                    handleAmenitiesCheckBox("on", amenitiesTypes.AC);

                    return;
                  } else {
                    handleAmenitiesCheckBox("off", amenitiesTypes.AC);
                  }
                }} // Handle checkbox change
              />
              <label
                className="   text-sm  font-semibold   tracking-wider  text-neutral-500"
                htmlFor="myCheckbox"
              >
                Air Conditioner
              </label>
            </div>
          </div>

          <div className="  grid grid-cols-3 ">
            <div className=" flex gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                id="myCheckbox"
                name="myCheckbox"
                checked={amenities.includes(amenitiesTypes.PARKING)} // Set the checked attribute based on the state
                onChange={(e) => {
                  let val = e.target.checked;

                  console.log(val);

                  if (val) {
                    handleAmenitiesCheckBox("on", amenitiesTypes.PARKING);

                    return;
                  } else {
                    handleAmenitiesCheckBox("off", amenitiesTypes.PARKING);
                  }
                }} // Handle checkbox change
              />
              <label
                className="   text-sm  font-semibold   tracking-wider  text-neutral-500"
                htmlFor="myCheckbox"
              >
                Car Parking
              </label>
            </div>

            <div className=" flex gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                id="myCheckbox"
                name="myCheckbox"
                checked={amenities.includes(amenitiesTypes.TV)} // Set the checked attribute based on the state
                onChange={(e) => {
                  let val = e.target.checked;

                  console.log(val);

                  if (val) {
                    handleAmenitiesCheckBox("on", amenitiesTypes.TV);

                    return;
                  } else {
                    handleAmenitiesCheckBox("off", amenitiesTypes.TV);
                  }
                }} // Handle checkbox change
              />
              <label
                className="   text-sm  font-semibold   tracking-wider  text-neutral-500"
                htmlFor="myCheckbox"
              >
                Cable TV
              </label>
            </div>

            <div className=" flex gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                id="myCheckbox"
                name="myCheckbox"
                checked={amenities.includes(amenitiesTypes.HOT_TUB)} // Set the checked attribute based on the state
                onChange={(e) => {
                  let val = e.target.checked;

                  console.log(val);

                  if (val) {
                    handleAmenitiesCheckBox("on", amenitiesTypes.HOT_TUB);

                    return;
                  } else {
                    handleAmenitiesCheckBox("off", amenitiesTypes.HOT_TUB);
                  }
                }} // Handle checkbox change
              />
              <label
                className="   text-sm  font-semibold   tracking-wider  text-neutral-500"
                htmlFor="myCheckbox"
              >
                Hot Tub
              </label>
            </div>
          </div>
        </div>
      </div>

      <Input
        id="aboutHotel"
        label="About Hotel"
        errors={errors}
        register={register}
        textBox
      />
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