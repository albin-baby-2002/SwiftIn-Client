import { RiBuilding2Fill, RiBuilding4Fill, RiTvLine } from "react-icons/ri";

import hotel from "../../Assets/hotel.webp";
import hotel2 from "../../Assets/hotel2.webp";
import hotel3 from "../../Assets/hotel3.webp";
import hotel4 from "../../Assets/hotel4.webp";
import hotel5 from "../../Assets/hotel5.webp";

import { Link } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import swiftin from "../../Assets/logo3.png";

import {
  FaBuilding,
  FaCamera,
  FaCar,
  FaEdit,
  FaHotTub,
  FaMinus,
  FaPlus,
  FaRegSnowflake,
  FaRupeeSign,
} from "react-icons/fa";
import { TiWiFi } from "react-icons/ti";
import { MdBedroomChild, MdOutlinePool } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../Components/Inputs/Input";
import toast from "react-hot-toast";
import { TbCameraPlus } from "react-icons/tb";

const HotelListingSchema = z.object({
  addressLine: z.string().min(3, " Min length For addressLine is 3").max(20),
  city: z.string().min(3, " Min length For city is 3").max(15),
  district: z.string().min(3, " Min length For district is 3").max(15),
  state: z.string().min(3, " Min length is 3").max(15),
  pinCode: z.string().refine((value) => {
    const INDIAN_PINCODE_REGEX = /^[1-9][0-9]{5}$/;
    return INDIAN_PINCODE_REGEX.test(value);
  }, "Invalid Indian Pincode"),
  totalRooms: z.number(),
  maxGuests: z.number(),
  bedsPerRoom: z.number(),
  bathroomPerRoom: z.number(),
  amenities: z.array(z.string()),
  mainImage: z.string(),
  otherImages: z.array(z.string()),
});

type fields = z.infer<typeof HotelListingSchema>;

type keyOfFields = keyof fields;

interface step {
  id: string;
  name: string;
  fields: keyOfFields[];
}

const PropertyListingPage = () => {
  const steps: step[] = [
    {
      id: "Step 1",
      name: "Personal Information",
      fields: ["addressLine", "city", "district", "state", "pinCode"],
    },
  ];

  const amenitiesTypes = {
    WIFI: "freeWifi",
    POOL: "commonPool",
    AC: "airConditioning",
    PARKING: "carParking",
    TV: "cableTv",
    HOT_TUB: "hotTub",
  } as const;

  type amenity = (typeof amenitiesTypes)[keyof typeof amenitiesTypes];

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
      mainImg: "",
      otherImages: ["", "", "", ""],
    },
    resolver: zodResolver(HotelListingSchema),
  });

  const [
    totalRooms,
    maxGuests,
    bedsPerRoom,
    bathroomPerRoom,
    amenities,
    mainImage,
    otherImages,
  ] = watch([
    "totalRooms",
    "maxGuests",
    "bedsPerRoom",
    "bathroomPerRoom",
    "amenities",
    "mainImage",
    "otherImages",
  ]) as [number, number, number, number, string[], string, string[]];

  const updateCapacityValues = (
    field: "totalRooms" | "maxGuests" | "bedsPerRoom" | "bathroomPerRoom",
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

  const [mainMenu, setMainMenu] = useState(false);

  const AxiosPrivate = useAxiosPrivate();

  const auth = useAuth();

  const logout = useLogout();

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };

  const [page, setPage] = useState<number>(1);

  const prevFunction = () => {
    if (page > 0) {
      setPage((val) => val - 1);
    }
  };

  const nextFunction = async () => {
    if (page < 6) {
      let fields = steps[page - 1]?.fields;

      if (fields) {
        const noError = await trigger(fields);

        if (!noError) return;
      }

      setPage((val) => val + 1);
    }
  };

  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dfm8vhuea",
          uploadPreset: "lmyyofoj",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webP"],
        },
        async function (error: any, result: any) {
          if (error) {
            toast.error("Failed to upload  Img");
          }

          if (result.info.public_id) {
            try {
              toast.success("profile img updated");
            } catch (err: any) {
              console.log(err);

              if (!err?.response) {
                toast.error("No Server Response");
              } else if (err.response?.status === 400) {
                toast.error(err.response.data.message);
              } else if (err.response?.status === 500) {
                toast.error(
                  "Oops! Something went wrong. Please try again later.",
                );
              } else {
                toast.error("Login Failed");
              }
            }
          }
        },
      );
    }
  }, []);

  const pageOne = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full bg-white  px-2 text-sm lg:px-6  ">
          <div className=" pt-8">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={100} width={100} alt="" />
                  </div>
                </Link>

                <div className=" flex gap-6 font-Inter ">
                  <button className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white">
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

      <main className="  pt-[105px]">
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

          <div className="  flex w-full justify-center  py-8 font-Inter">
            <div className="   flex w-full flex-col gap-1   text-sm">
              <Input
                id="addressLine"
                label="Address Line"
                register={register}
                errors={errors}
              />

              <Input
                id="city"
                label="City"
                register={register}
                errors={errors}
              />

              <Input
                id="district"
                label="District"
                register={register}
                errors={errors}
              />

              <div className=" flex   justify-between gap-3">
                <div className=" flex w-[50%]   ">
                  <Input
                    id="state"
                    label="State"
                    register={register}
                    errors={errors}
                    HalfWidth
                  />
                </div>
                <div className=" flex w-[50%]  ">
                  <Input
                    id="pinCode"
                    label="PinCode"
                    register={register}
                    errors={errors}
                    HalfWidth
                  />
                </div>
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
        <nav className=" fixed z-10 w-full bg-white  px-2 text-sm lg:px-6  ">
          <div className=" pt-8">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={100} width={100} alt="" />
                  </div>
                </Link>

                <div className=" flex gap-6 font-Inter ">
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
        </nav>
      </header>

      <main className="  pt-[110px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>2</p>
              </div>

              <div>
                <h1 className="   text-[25px]  font-bold">
                  Total Rooms And Facilities You Have
                </h1>

                <p className=" pt-[2px]  text-sm font-semibold text-neutral-400">
                  Give details of the type of room you wish to list now
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
        <nav className=" fixed z-10 w-full bg-white  px-2 text-sm lg:px-6  ">
          <div className=" pt-8">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={100} width={100} alt="" />
                  </div>
                </Link>

                <div className=" flex gap-6 font-Inter ">
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
        </nav>
      </header>

      <main className="  pt-[105px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>3</p>
              </div>

              <div>
                <h1 className="   text-[25px]  font-bold">
                  Choose Basic Amenities you provide ?
                </h1>

                <p className=" pt-[2px]  text-sm font-semibold text-neutral-400">
                  Select facilities you offer to all customers as complimentary
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
        <nav className=" fixed z-10 w-full bg-white  px-2 text-sm lg:px-6  ">
          <div className=" pt-8">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={100} width={100} alt="" />
                  </div>
                </Link>

                <div className=" flex gap-6 font-Inter ">
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

      <main className="  pt-[110px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
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

          <div
            className="  mt-10    hidden h-60 w-[90%] items-center justify-center  rounded-lg border-2 border-black"
            onClick={() => {
              widgetRef.current.open();
            }}
          >
            <FaCamera className="  text-9xl" />
          </div>
        </div>

        <div className=" mx-auto mt-10 flex max-w-[80%] gap-4">
          <div className=" flex  h-[270px] w-[50%]  rounded-l-xl   border-4 border-gray-400  ">
            {mainImage ? (
              <img
                className="  h-full w-full rounded-l-xl"
                src={hotel}
                alt=""
              />
            ) : (
              <div className=" flex  h-full w-full items-center justify-center">
                <TbCameraPlus className=" text-6xl  text-gray-400 cursor-pointer " />
              </div>
            )}
          </div>

          <div className=" gap- flex h-[270px]  w-[25%] flex-col   justify-between   ">
            <div className="  h-[47%] border-4 border-gray-400   ">
              {otherImages[0] ? (
                <img
                  className="  h-full w-full rounded-l-xl"
                  src={hotel}
                  alt=""
                />
              ) : (
                <div className=" flex  h-full w-full items-center justify-center">
                  <TbCameraPlus className=" text-4xl  text-gray-400 cursor-pointer " />
                </div>
              )}
            </div>

            <div className="  h-[47%] border-4 border-gray-400   ">
              {otherImages[1] ? (
                <img
                  className="  h-full w-full rounded-l-xl"
                  src={hotel}
                  alt=""
                />
              ) : (
                <div className=" flex  h-full w-full items-center justify-center">
                  <TbCameraPlus className=" text-4xl  text-gray-400 cursor-pointer " />
                </div>
              )}
            </div>
          </div>

          <div className=" gap- flex h-[270px]  w-[25%] flex-col   justify-between   ">
            <div className="  h-[47%]  rounded-tr-lg border-4 border-gray-400   ">
              {otherImages[2] ? (
                <img
                  className="  h-full w-full rounded-l-xl"
                  src={hotel}
                  alt=""
                />
              ) : (
                <div className=" flex  h-full w-full items-center justify-center">
                  <TbCameraPlus className=" text-4xl  text-gray-400 cursor-pointer " />
                </div>
              )}
            </div>

            <div className="  h-[47%] rounded-br-lg  border-4 border-gray-400  ">
              {otherImages[3] ? (
                <img
                  className="  h-full w-full rounded-l-xl"
                  src={hotel}
                  alt=""
                />
              ) : (
                <div className=" flex  h-full w-full items-center justify-center">
                  <TbCameraPlus className=" text-4xl  text-gray-400 cursor-pointer " />
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
        <nav className=" fixed z-10 w-full bg-white  px-2 text-sm lg:px-6  ">
          <div className=" pt-8">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={100} width={100} alt="" />
                  </div>
                </Link>

                <div className=" flex gap-6 font-Inter ">
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

      <main className="  pb-10 pt-[105px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-6">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
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

          <div className="  ms-2 mt-10 font-Inter  text-[15px]  font-semibold">
            Name of the Hotel
          </div>
          <div className=" mt-4 font-Inter text-[15px]">
            <div className=" flex items-center rounded-xl border-2   border-neutral-400 text-lg">
              {/* <RiBuilding4Fill className=" ms-4 text-xl" /> */}
              <input
                className=" w-full rounded-xl py-3 ps-4 text-sm font-semibold   placeholder-gray-400 outline-none"
                type="text"
                placeholder=" Add attractive title "
              />
            </div>

            <div className=" ms-2 mt-6 font-Inter text-[15px]  font-semibold">
              Room Type
            </div>

            <div className=" mt-4 flex items-center rounded-xl border-2   border-neutral-400 text-lg">
              {/* <MdBedroomChild className=" ms-4 text-xl" /> */}

              <input
                className=" w-full  rounded-xl py-3 ps-4 text-sm   font-semibold  placeholder-gray-400  outline-none"
                type="text"
                placeholder=" standard / deluxe / suite / custom name "
              />
            </div>

            <div className=" ms-2 mt-6 font-Inter text-[15px]  font-semibold">
              Hotel License - For verification
            </div>

            <div className=" mt-4 flex items-center rounded-xl border-2   border-neutral-400 py-2 text-lg">
              {/* <MdBedroomChild className=" ms-4 text-xl" /> */}

              <input
                className=" w-full rounded-xl py-2 ps-4 text-xs  font-bold   placeholder-slate-500 outline-none"
                type="file"
                placeholder=" "
              />
            </div>

            <div className=" relative w-full ">
              <div className=" ms-2 mt-6 font-Inter text-[15px]  font-semibold">
                Give a detailed explanation of this place
              </div>

              <textarea
                className=" mt-4 h-32 w-full rounded-xl border-2  border-neutral-400 px-4 pt-3 text-lg font-bold outline-none"
                name=""
                id=""
              ></textarea>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const PageSix = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full bg-white  px-2 text-sm lg:px-6  ">
          <div className=" pt-8">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={100} width={100} alt="" />
                  </div>
                </Link>

                <div className=" flex gap-6 font-Inter ">
                  <button
                    className=" w-14 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={prevFunction}
                  >
                    prev
                  </button>

                  <button
                    className="     w-36 rounded-md bg-black   py-[6px] font-semibold text-white"
                    onClick={() => {
                      nextFunction();
                    }}
                  >
                    List The Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="  pb-10 pt-[110px]">
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

          <div className=" mt-12 flex h-[240px] items-center justify-center rounded-xl border-2 border-gray-400">
            <div className="  flex  items-center justify-center">
              <div>
                <FaRupeeSign className=" text-6xl" />
              </div>

              <div className="  w-[200px]">
                <input
                  className="  w-full font-Sen text-7xl font-semibold placeholder-black outline-none"
                  type="text"
                  placeholder="15000"
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
