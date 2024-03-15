import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./ParentModal/Modal";
import { FaTrashCan } from "react-icons/fa6";
import { TbCameraPlus } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import {
  SINGLE_LISTING_IMAGE_UPDATE_URL,
  SINGLE_LISTING_URL,
} from "../../Api/EndPoints";
import useEditListingsModal from "../../Hooks/zustandStore/useEditListingsModal";
import { EditListingImageSchema } from "../../Schemas/User/editListingImageSchema";
import { TEditListingImageModalProps } from "../../Types/GeneralTypes/propsTypes";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../Enums/statusCodes";
import { TGetListingDataResp } from "../../Types/GeneralTypes/apiResponseTypes";

const EditListingImageModal: React.FC<TEditListingImageModalProps> = ({
  reFetchData,
}) => {
  const AxiosPrivate = useAxiosPrivate();

  const editListingModalState = useEditListingsModal();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, watch, setValue, reset } = useForm<FieldValues>({
    defaultValues: {
      mainImage: "",
      otherImages: ["", "", "", ""],
    },
    resolver: zodResolver(EditListingImageSchema),
  });

  const imgSelectedForUploadRef = useRef(0);

  const [mainImage, otherImages] = watch(["mainImage", "otherImages"]) as [
    string,
    string[],
  ];

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
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<TGetListingDataResp>(
          SINGLE_LISTING_URL + `/${editListingModalState.listingID}`,
        );

        if (isMounted) {
          reset({
            mainImage: response.data.listing.mainImage,
            otherImages: response.data.listing.otherImages,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    if (editListingModalState.listingID) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [editListingModalState.imageModalIsOpen]);

  const cloudinaryRef = useRef<any>();
  const imageWidgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    if (cloudinaryRef.current) {
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
            } catch (err: any) {
              toast.error(" Failed image Upload");
            }
          }
        },
      );
    }
  }, [otherImages, mainImage]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await AxiosPrivate.patch(
        SINGLE_LISTING_IMAGE_UPDATE_URL + `/${editListingModalState.listingID}`,
        data,
      );

      setIsLoading(false);

      toast.success(" Images Updated ");

      editListingModalState.onClose();

      reFetchData();
    } catch (err) {
      setIsLoading(false);

      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Updation Failed");
      }
    }
  };

  const onSubmittionInvalid = (err: FieldErrors<FieldValues>) => {
    if (err.otherImages || err.mainImage) {
      toast.error("All Image Fields Are Mandatory");
    } else {
      toast.error("Unexpected error : try again ");
    }
  };

  const bodyContent = (
    <div>
      <div className=" mx-auto mt-10 flex max-w-[80%] gap-4">
        <div
          className={`${mainImage ? "" : " border-4 "}  relative flex  h-[230px] w-[50%] rounded-l-xl  border-gray-400   xl:h-[300px]`}
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
                  className="  text-xs"
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

        <div className=" gap- flex h-[230px] w-[25%]  flex-col justify-between   xl:h-[300px]   ">
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
                    className=" text-[10px]"
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
                    className=" text-[10px]"
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

        <div className=" gap- flex h-[230px] w-[25%]  flex-col justify-between   xl:h-[300px]   ">
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
                    className=" text-[10px]"
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
                    className=" text-[10px]"
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
    </div>
  );

  return (
    <Modal
      title="Edit Images Modal"
      onClose={editListingModalState.onClose}
      onSubmit={handleSubmit(onSubmit, onSubmittionInvalid)}
      isOpen={editListingModalState.imageModalIsOpen}
      submitActionLabel="Change Listing Images"
      body={bodyContent}
      disabled={isLoading}
      wider
    />
  );
};

export default EditListingImageModal;
