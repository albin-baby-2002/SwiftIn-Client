import {
  FaCar,
  FaHotTub,
  FaMinus,
  FaPlus,
  FaRegSnowflake,
  FaRupeeSign,
} from "react-icons/fa";

import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { RiTvLine } from "react-icons/ri";
import { TiWiFi } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import toast from "react-hot-toast";
import { TbCameraPlus } from "react-icons/tb";
import { MdOutlinePool } from "react-icons/md";
import Input from "../../Components/Inputs/Input";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaTrashCan } from "react-icons/fa6";
import { LIST_PROPERTY_URL } from "../../Api/EndPoints";
import { HotelListingSchema } from "../../Schemas/User/hotelListingSchema";
import Logo from "../../Components/Navbar/SubComponents/Logo";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../Enums/statusCodes";
import CenterNav from "../../Components/Navbar/SubComponents/CenterNav";

// types used

type fields = z.infer<typeof HotelListingSchema>;

type keyOfFields = keyof fields;

interface step {
  id: string;
  fields: keyOfFields[];
}

type hotelCapactiyFields =
  | "totalRooms"
  | "maxGuests"
  | "bedsPerRoom"
  | "bathroomPerRoom";

const PropertyListingPage = () => {
  const navigate = useNavigate();
  // steps and fields to validate by trigger

  const steps: step[] = [
    {
      id: "Step 1",
      fields: ["addressLine", "city", "district", "state", "pinCode"],
    },

    {
      id: "Step 2",
      fields: ["totalRooms", "maxGuests", "bedsPerRoom", "bathroomPerRoom"],
    },

    {
      id: "Step 3",
      fields: ["amenities"],
    },

    {
      id: "Step 4",

      fields: ["mainImage", "otherImages"],
    },

    {
      id: "Step 5",
      fields: ["listingTitle", "aboutHotel", "hotelLicenseUrl", "roomType"],
    },

    {
      id: "Step 6",
      fields: [
        "rentPerNight",
        "addressLine",
        "city",
        "district",
        "state",
        "pinCode",
        "totalRooms",
        "maxGuests",
        "bedsPerRoom",
        "bathroomPerRoom",
        "amenities",
        "mainImage",
        "otherImages",
        "listingTitle",
        "aboutHotel",
        "hotelLicenseUrl",
        "roomType",
      ],
    },
  ];

  // definition for amenities

  const amenitiesTypes = {
    WIFI: "freeWifi",
    POOL: "commonPool",
    AC: "airConditioning",
    PARKING: "carParking",
    TV: "cableTv",
    HOT_TUB: "hotTub",
  } as const;

  // literal types from value of amenities

  type amenity = (typeof amenitiesTypes)[keyof typeof amenitiesTypes];

  // add or remove amenities from the list of amenities

  const manageAmenities = (amenity: amenity) => {
    if (amenities.includes(amenity)) {
      let newAmenities = amenities.filter((val) => {
        return val !== amenity;
      });

      setValue("amenities", newAmenities);
    } else {
      let newAmenities = [...amenities, amenity];

      setValue("amenities", newAmenities);
    }
  };

  // useForm hook with initial values

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      addressLine: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
      totalRooms: 1,
      maxGuests: 1,
      bedsPerRoom: 1,
      bathroomPerRoom: 1,
      amenities: [],
      mainImage: "",
      otherImages: ["", "", "", ""],
      listingTitle: "",
      roomType: "",
      hotelLicenseUrl: "",
      aboutHotel: "",
      rentPerNight: 1000,
    },
    resolver: zodResolver(HotelListingSchema),
  });

  // watch field values with destructuring

  const [
    totalRooms,
    maxGuests,
    bedsPerRoom,
    bathroomPerRoom,
    amenities,
    mainImage,
    otherImages,
    hotelLicenseUrl,
  ] = watch([
    "totalRooms",
    "maxGuests",
    "bedsPerRoom",
    "bathroomPerRoom",
    "amenities",
    "mainImage",
    "otherImages",
    "hotelLicenseUrl",
  ]) as [number, number, number, number, string[], string, string[], string];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "data");

    try {
      await AxiosPrivate.post(LIST_PROPERTY_URL, data);

      toast.success("Listing successful");

      toast.success("Wait For Admin to verify to start hosting");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log(err);

      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (
        err.response?.status === STATUS_CODES.UNAUTHORIZED ||
        err.response?.status === STATUS_CODES.FORBIDDEN
      ) {
        toast.error("Login to list the property");
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Listing Failed");
      }
    }
  };

  // handle hotel capacity values updating

  const updateCapacityValues = (
    field: hotelCapactiyFields,
    operation: "add" | "sub",
  ) => {
    let RoomCapacity = { totalRooms, maxGuests, bedsPerRoom, bathroomPerRoom };

    if (operation === "add") {
      setValue(field, RoomCapacity[field] + 1);
    } else {
      if (RoomCapacity[field] <= 1) return;

      setValue(field, RoomCapacity[field] - 1);
    }
  };

  const handleDeleteImage = (imageNo: number) => {
    if (imageNo >= 0 && imageNo < 5) {
      if (imageNo === 0) {
        setValue("mainImage", "");
      } else {
        let values = otherImages;

        values[imageNo - 1] = "";

        setValue("otherImages", values);
      }
    }
  };

  useEffect(() => {
    console.log(errors, "error");
  });

  const AxiosPrivate = useAxiosPrivate();

  const [page, setPage] = useState<number>(1);

  const imgSelectedForUploadRef = useRef(0);

  const prevFunction = () => {
    if (page > 0) {
      setPage((val) => val - 1);
    }
  };

  const nextFunction = async () => {
    if (page <= 6) {
      let fields = steps[page - 1]?.fields;

      if (fields) {
        const noError = await trigger(fields);

        console.log(errors);

        if (!noError) return;
      }

      if (page < 6) {
        setPage((val) => val + 1);
      }
    }
  };

  const cloudinaryRef = useRef<any>();
  const imageWidgetRef = useRef<any>();
  const pdfWidgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    if (cloudinaryRef.current) {
      // hotel image upload widget

      imageWidgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dfm8vhuea",
          uploadPreset: "lmyyofoj",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webP"],
          maxFiles: 1,
        },
        async function (error: any, result: any) {
          if (error) {
            toast.error("Failed to upload  Img");
          }

          if (result.info.public_id) {
            try {
              if (imgSelectedForUploadRef.current === 0) {
                setValue("mainImage", result.info.public_id);
              } else if (imgSelectedForUploadRef.current < 5) {
                let values = otherImages;

                values[imgSelectedForUploadRef.current - 1] =
                  result.info.public_id;

                setValue("otherImages", values);
              }

              toast.success(" Image Uploaded");
            } catch (err) {
              toast.error(" Failed image Upload");
            }
          }
        },
      );

      pdfWidgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dfm8vhuea",
          uploadPreset: "lmyyofoj",
          clientAllowedFormats: ["pdf", "docx"],
          maxFiles: 1,
        },
        async function (error: any, result: any) {
          if (error) {
            toast.error("Failed to upload  Document");
          }

          if (result.info.public_id) {
            try {
              setValue("hotelLicenseUrl", result.info.public_id);

              toast.success("pdf upload successful");
            } catch (err) {
              toast.error(" Failed File Upload");
            }
          }
        },
      );
    }
  }, [mainImage, otherImages]);

  const pageOne = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full border-b-2 bg-white  px-2 text-sm lg:px-6  ">
          <div className=" py-6">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <div className=" flex w-[120px] justify-center ">
                  <Logo />
                </div>

              <CenterNav/>

                <div className=" flex gap-2 font-Inter  ">
                  <button className=" w-14 rounded-md bg-black    py-[6px] font-semibold text-white">
                    Exit
                  </button>

                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={() => {
                      nextFunction();
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="  pt-[140px]  ">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>1</p>
              </div>

              <div>
                <h1 className="   text-[25px]  font-bold">
                  Enter Your Hotel Address And Location
                </h1>

                <p className=" pt-[2px]  text-sm font-semibold text-neutral-400">
                  This address will be visible by every user of the application{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="  flex w-full justify-center  py-7 font-Inter">
            <div className="   flex w-full flex-col gap-1   text-sm">
              <Input
                id="addressLine"
                label="Address Line"
                register={register}
                errors={errors}
                labelBlack
                textBase
              />

              <Input
                id="city"
                label="City"
                register={register}
                errors={errors}
                labelBlack
                textBase
              />

              <Input
                id="district"
                label="District"
                register={register}
                errors={errors}
                labelBlack
                textBase
              />

              <div className=" flex   justify-between gap-3">
                <Input
                  id="state"
                  label="State"
                  register={register}
                  errors={errors}
                  labelBlack
                  textBase
                  HalfWidth
                />

                <Input
                  id="pinCode"
                  label="PinCode"
                  register={register}
                  errors={errors}
                  labelBlack
                  textBase
                  HalfWidth
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const pageTwo = (
    <>
      <header className=" ">
        <nav className="  fixed z-10 w-full border-b-2 bg-white  px-2 text-sm lg:px-6  ">
          <div className=" py-6">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <div className=" flex w-[120px] justify-center ">
                  <Logo />
                </div>

                <CenterNav />

                <div className=" flex gap-2 font-Inter ">
                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={prevFunction}
                  >
                    Prev
                  </button>

                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={() => {
                      nextFunction();
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {(errors["totalRooms"] ||
            errors["maxGuests"] ||
            errors["bedsPerRoom"] ||
            errors["bathroomPerRoom"]) && (
            <div className="   absolute inset-10 top-10  z-0 flex items-center justify-center">
              <p className="  rounded-lg bg-black px-2 py-2  font-Inter  font-semibold text-rose-500">
                All Fields Should be greater than zero
              </p>
            </div>
          )}
        </nav>
      </header>

      <main className="  pt-[140px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>2</p>
              </div>

              <div>
                <h1 className="   text-[25px]  font-bold">
                  Total Rooms And Facilities Property Have
                </h1>

                <p className=" pt-[2px]  text-sm font-semibold text-neutral-400">
                  Give important details of the type of room you wish to list
                  now
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-8 flex flex-col  gap-6 text-sm">
            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-400   px-4 py-3 font-Inter ">
              <p className="   ms-2 font-bold">Total Rooms Available</p>

              <div className=" flex items-center gap-4">
                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaMinus
                    className=" cursor-pointer text-xs"
                    onClick={() => {
                      updateCapacityValues("totalRooms", "sub");
                    }}
                  />
                </div>

                <p className="  w-5 text-center font-bold text-[16]">
                  {totalRooms}
                </p>

                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaPlus
                    className=" cursor-pointer text-xs"
                    onClick={() => {
                      updateCapacityValues("totalRooms", "add");
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-400   px-4 py-3 font-Inter ">
              <p className="   ms-2 font-bold">
                Maximum Guests Allowed Per Room
              </p>

              <div className=" flex items-center gap-4">
                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaMinus
                    className=" cursor-pointer text-xs"
                    onClick={() => {
                      updateCapacityValues("maxGuests", "sub");
                    }}
                  />
                </div>

                <p className=" w-5 text-center font-bold text-[16]">
                  {maxGuests}
                </p>

                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaPlus
                    className=" cursor-pointer text-xs"
                    onClick={() => {
                      updateCapacityValues("maxGuests", "add");
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-400   px-4 py-3 font-Inter ">
              <p className="   ms-2 font-bold">Beds Available Per Room</p>

              <div className=" flex items-center gap-4">
                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaMinus
                    className=" cursor-pointer text-xs"
                    onClick={() => {
                      updateCapacityValues("bedsPerRoom", "sub");
                    }}
                  />
                </div>

                <p className=" w-5 text-center font-bold text-[16]">
                  {bedsPerRoom}
                </p>

                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaPlus
                    className=" cursor-pointer  text-xs"
                    onClick={() => {
                      updateCapacityValues("bedsPerRoom", "add");
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-400   px-4 py-3 font-Inter ">
              <p className="   ms-2 font-bold">Bathrooms Available Per Room</p>

              <div className=" flex items-center gap-4">
                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaMinus
                    className=" cursor-pointer  text-xs"
                    onClick={() => {
                      updateCapacityValues("bathroomPerRoom", "sub");
                    }}
                  />
                </div>

                <p className=" w-5 text-center font-bold text-[16]">
                  {bathroomPerRoom}
                </p>

                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaPlus
                    className=" cursor-pointer text-xs"
                    onClick={() => {
                      updateCapacityValues("bathroomPerRoom", "add");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const PageThree = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full border-b-2 bg-white  px-2 text-sm lg:px-6  ">
          <div className=" py-6">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <div className=" flex w-[120px] justify-center ">
                  <Logo />
                </div>

                <CenterNav />

                <div className=" flex gap-2 font-Inter ">
                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={prevFunction}
                  >
                    Prev
                  </button>

                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={() => {
                      nextFunction();
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {errors["amenities"] && (
            <div className="   absolute inset-10 top-10  z-0 flex items-center justify-center">
              <p className="  rounded-lg bg-black px-2 py-2  font-Inter  font-semibold text-rose-500">
                Unexpected Error : Try again and if issue persist contact
                support
              </p>
            </div>
          )}
        </nav>
      </header>

      <main className="  pt-[140px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>3</p>
              </div>

              <div>
                <h1 className="   text-[25px]  font-bold">
                  Choose Basic Amenities you will provide ?
                </h1>

                <p className=" pt-[2px]  text-sm font-semibold text-neutral-400">
                  Select facilities and services you offer to all the customers
                  as complimentary
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-10 flex flex-col gap-10 font-Inter text-sm font-bold">
            <div className=" flex justify-between">
              <div
                className={` flex w-[48%] cursor-pointer  items-center justify-center gap-4 rounded-lg border-2 px-4 py-3 ${amenities.includes(amenitiesTypes.WIFI) ? "border-black" : "border-neutral-400"}   `}
                onClick={() => {
                  manageAmenities(amenitiesTypes.WIFI);
                }}
              >
                <TiWiFi className=" text-xl" />
                <p className=" ">Free wifi</p>
              </div>

              <div
                className={` flex w-[48%] cursor-pointer  items-center justify-center gap-4 rounded-lg border-2 px-4 py-3 ${amenities.includes(amenitiesTypes.POOL) ? "border-black" : "border-neutral-400"}   `}
                onClick={() => {
                  manageAmenities(amenitiesTypes.POOL);
                }}
              >
                <MdOutlinePool className=" text-xl" />
                <p className=" ">Common Pool</p>
              </div>
            </div>

            <div className=" flex justify-between">
              <div
                className={` flex w-[48%] cursor-pointer  items-center justify-center gap-4 rounded-lg border-2 px-4 py-3 ${amenities.includes(amenitiesTypes.AC) ? "border-black" : "border-neutral-400"}   `}
                onClick={() => {
                  manageAmenities(amenitiesTypes.AC);
                }}
              >
                <FaRegSnowflake className=" text-xl" />
                <p className=" ">Air Conditioning</p>
              </div>

              <div
                className={` flex w-[48%] cursor-pointer  items-center justify-center gap-4 rounded-lg border-2 px-4 py-3 ${amenities.includes(amenitiesTypes.PARKING) ? "border-black" : "border-neutral-400"}   `}
                onClick={() => {
                  manageAmenities(amenitiesTypes.PARKING);
                }}
              >
                <FaCar className=" text-xl" />
                <p className=" ">Car Parking</p>
              </div>
            </div>

            <div className=" flex justify-between">
              <div
                className={` flex w-[48%] cursor-pointer  items-center justify-center gap-4 rounded-lg border-2 px-4 py-3 ${amenities.includes(amenitiesTypes.TV) ? "border-black" : "border-neutral-400"}   `}
                onClick={() => {
                  manageAmenities(amenitiesTypes.TV);
                }}
              >
                <RiTvLine className=" text-xl" />
                <p className=" ">Cable Tv</p>
              </div>

              <div
                className={` flex w-[48%] cursor-pointer  items-center justify-center gap-4 rounded-lg border-2 px-4 py-3 ${amenities.includes(amenitiesTypes.HOT_TUB) ? "border-black" : "border-neutral-400"}   `}
                onClick={() => {
                  manageAmenities(amenitiesTypes.HOT_TUB);
                }}
              >
                <FaHotTub className=" text-xl" />
                <p className=" ">Hot Tub</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const PageFour = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full border-b-2 bg-white  px-2 text-sm lg:px-6  ">
          <div className=" py-6">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <div className=" flex w-[120px] justify-center ">
                  <Logo />
                </div>

                <CenterNav />

                <div className=" flex gap-2 font-Inter ">
                  <button
                    className=" w-14 rounded-md bg-black   py-[2px] font-semibold text-white"
                    onClick={prevFunction}
                  >
                    prev
                  </button>

                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={() => {
                      nextFunction();
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {(errors["mainImage"] || errors["otherImages"]) && (
            <div className="   absolute inset-10 top-12 z-0  flex items-center justify-center text-xs">
              <p className="  rounded-lg bg-black px-2 py-2  font-Inter  font-semibold text-rose-500">
                You need to fill all the Img fields
              </p>
            </div>
          )}
        </nav>
      </header>

      <main className="  grid h-screen grid-rows-[60px,1fr] pt-[130px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10 ">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>4</p>
              </div>

              <div>
                <h1 className="   text-[25px]  font-bold">
                  Photos Of Your Property And Rooms
                </h1>

                <p className=" pt-[2px]  text-sm font-semibold text-neutral-400">
                  Add Minimum 5 photos of rooms and amenities and surroundings
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-auto mt-9 flex w-full max-w-[75%] gap-4 pb-10">
          <div
            className={`${mainImage ? "" : " border-4 "}  relative flex   min-h-[260px] w-[50%]  rounded-l-xl   border-gray-400`}
          >
            {mainImage ? (
              <>
                <img
                  className="  h-full w-full rounded-l-lg"
                  src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${mainImage}`}
                  alt=""
                />

                <div className=" absolute right-2 top-2 cursor-pointer rounded-lg bg-black px-2 py-2 text-white">
                  <FaTrashCan
                    className=" text-sm"
                    onClick={() => {
                      handleDeleteImage(0);
                    }}
                  />
                </div>
              </>
            ) : (
              <div className=" flex  h-full w-full items-center justify-center">
                <TbCameraPlus
                  className=" cursor-pointer  text-6xl text-gray-400 "
                  onClick={() => {
                    imgSelectedForUploadRef.current = 0;

                    imageWidgetRef.current.open();
                  }}
                />
              </div>
            )}
          </div>

          <div className=" gap- flex min-h-[260px]  w-[25%] flex-col   justify-between   ">
            <div
              className={`${otherImages[0] ? "" : "  border-4"} relative  h-[47%]    border-gray-400 `}
            >
              {otherImages[0] ? (
                <>
                  <img
                    className="  h-full w-full "
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${otherImages[0]}`}
                    alt=""
                  />

                  <div className=" absolute right-2 top-2 cursor-pointer rounded-lg bg-black px-[6px] py-[6px] text-white">
                    <FaTrashCan
                      className=" text-xs"
                      onClick={() => {
                        handleDeleteImage(1);
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className=" flex  h-full w-full items-center justify-center">
                  <TbCameraPlus
                    className=" cursor-pointer  text-4xl text-gray-400 "
                    onClick={() => {
                      imgSelectedForUploadRef.current = 1;

                      imageWidgetRef.current.open();
                    }}
                  />
                </div>
              )}
            </div>

            <div
              className={`${otherImages[1] ? "" : "  border-4"} relative  h-[47%]    border-gray-400 `}
            >
              {otherImages[1] ? (
                <>
                  <img
                    className="  h-full w-full "
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${otherImages[1]}`}
                    alt=""
                  />

                  <div className=" absolute right-2 top-2 cursor-pointer rounded-lg bg-black px-[6px] py-[6px] text-white">
                    <FaTrashCan
                      className=" text-xs"
                      onClick={() => {
                        handleDeleteImage(2);
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className=" flex  h-full w-full items-center justify-center">
                  <TbCameraPlus
                    className=" cursor-pointer  text-4xl text-gray-400 "
                    onClick={() => {
                      imgSelectedForUploadRef.current = 2;

                      imageWidgetRef.current.open();
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className=" gap- flex min-h-[260px]  w-[25%] flex-col   justify-between   ">
            <div
              className={`${otherImages[2] ? "" : "border-4"} relative  h-[47%]  rounded-tr-lg  border-gray-400 `}
            >
              {otherImages[2] ? (
                <>
                  <img
                    className="  h-full w-full rounded-tr-lg"
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${otherImages[2]}`}
                    alt=""
                  />

                  <div className=" absolute right-2 top-2 cursor-pointer rounded-lg bg-black px-[6px] py-[6px] text-white">
                    <FaTrashCan
                      className=" text-xs"
                      onClick={() => {
                        handleDeleteImage(3);
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className=" flex  h-full w-full items-center justify-center">
                  <TbCameraPlus
                    className=" cursor-pointer  text-4xl text-gray-400 "
                    onClick={() => {
                      imgSelectedForUploadRef.current = 3;

                      imageWidgetRef.current.open();
                    }}
                  />
                </div>
              )}
            </div>

            <div
              className={`${otherImages[3] ? "" : "border-4"} relative  h-[47%]  rounded-br-lg  border-gray-400 `}
            >
              {otherImages[3] ? (
                <>
                  <img
                    className="  h-full w-full rounded-br-lg"
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${otherImages[3]}`}
                    alt=""
                  />

                  <div className=" absolute right-2 top-2 cursor-pointer rounded-lg bg-black px-[6px] py-[6px] text-white">
                    <FaTrashCan
                      className=" text-xs"
                      onClick={() => {
                        handleDeleteImage(4);
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className=" flex  h-full w-full items-center justify-center">
                  <TbCameraPlus
                    className=" cursor-pointer  text-4xl text-gray-400 "
                    onClick={() => {
                      imgSelectedForUploadRef.current = 4;

                      imageWidgetRef.current.open();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const PageFive = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full border-b-2 bg-white  px-2 text-sm lg:px-6  ">
          <div className=" py-6">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <div className=" flex w-[120px] justify-center ">
                  <Logo />
                </div>

                <CenterNav />

                <div className=" flex gap-2 font-Inter ">
                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={prevFunction}
                  >
                    prev
                  </button>

                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={() => {
                      nextFunction();
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="  pb-10 pt-[140px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full items-center  overflow-y-scroll bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>5</p>
              </div>

              <div>
                <h1 className="   text-[25px]  font-bold">
                  Title And More Details Of The Property
                </h1>

                <p className=" pt-[2px]  text-sm font-semibold text-neutral-400">
                  Tell more about hotel and add a valid document to verify the
                  hotel
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-6 font-Inter text-[15px]">
            <Input
              id="listingTitle"
              label="Listing Title"
              register={register}
              errors={errors}
              textBase
              labelBlack
              placeholder="enter an attractive title"
            />

            <div className=" mt-3">
              <Input
                id="roomType"
                label="Room Type"
                register={register}
                errors={errors}
                textBase
                labelBlack
                placeholder="standard / deluxe / suite / custom name"
              />
            </div>

            <div className=" ms-2 mt-6 font-Inter text-[15px]  font-bold">
              Hotel License
            </div>

            <div
              className={`${errors["hotelLicenseUrl"] ? "border-rose-400" : " border-neutral-400"} mt-4 flex items-center rounded-md border-2    py-2 text-lg`}
            >
              {/* <MdBedroomChild className=" ms-4 text-xl" /> */}

              <div className=" flex w-full  items-center justify-between px-4 font-Inter">
                {hotelLicenseUrl ? (
                  <a
                    href={`https://res.cloudinary.com/dfm8vhuea/raw/upload/${hotelLicenseUrl}`}
                  >
                    {" "}
                    <p className=" cursor-pointer py-1  text-sm font-semibold ">
                      View File
                    </p>
                  </a>
                ) : (
                  <p className=" text-[15px]  text-neutral-400">
                    {" "}
                    your listing will be verified based on hotel license
                  </p>
                )}

                <p
                  className=" cursor-pointer ps-4 text-sm font-semibold "
                  onClick={() => {
                    pdfWidgetRef.current.open();
                  }}
                >
                  Select File
                </p>
              </div>
            </div>

            {errors["hotelLicenseUrl"] && (
              <p className=" ps-1  pt-2 text-xs  font-semibold text-rose-400  ">
                This field cannot be empty
              </p>
            )}

            <div className=" mt-2">
              <Input
                id="aboutHotel"
                label="Give a detailed explanation of this place"
                register={register}
                errors={errors}
                textBox
                labelBlack
                textBase
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const PageSix = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full border-b-2 bg-white  px-2 text-sm lg:px-6  ">
          <div className=" py-6">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <div className=" flex w-[138px] justify-center ">
                  <Logo />
                </div>

                <CenterNav />

                <div className=" flex gap-2 font-Inter ">
                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={prevFunction}
                  >
                    prev
                  </button>

                  <button
                    className="     rounded-md bg-black px-2   py-[6px] font-semibold text-white"
                    onClick={handleSubmit(onSubmit, (err, e) => {
                      console.log(err, "handle error", e);
                    })}
                  >
                    List Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="  pb-10 pt-[140px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>6</p>
              </div>

              <div>
                <h1 className="   text-[25px]  font-bold">
                  Set The Standard Price For The Rooms
                </h1>

                <p className=" pt-[2px]  text-sm font-semibold text-neutral-400">
                  Give the standard rate per night basis. You can change it any
                  time
                </p>
              </div>
            </div>
          </div>

          {errors["rentPerNight"] && (
            <div className="    mt-6 flex items-center justify-center">
              <p className="  rounded-lg bg-black px-2 py-2  font-Inter  text-xs font-semibold text-rose-500">
                {errors["rentPerNight"]?.message as string}
              </p>
            </div>
          )}

          <div className=" mt-10 flex h-[240px] items-center justify-center rounded-xl border-2 border-gray-400">
            <div className="  flex  items-center justify-center">
              <div>
                <FaRupeeSign className=" text-6xl" />
              </div>

              <div className="  w-[200px]">
                <input
                  id="rentPerNight"
                  {...register("rentPerNight", { valueAsNumber: true })}
                  className="  w-full font-Sen text-7xl font-semibold   outline-none"
                  type="Number"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const pagesList: { [key: number]: any } = {
    1: pageOne,
    2: pageTwo,
    3: PageThree,
    4: PageFour,
    5: PageFive,
    6: PageSix,
  };

  return pagesList[page];
};

export default PropertyListingPage;
