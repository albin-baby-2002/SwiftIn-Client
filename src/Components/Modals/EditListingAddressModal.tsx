import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Input from "../Inputs/Input";
import Modal from "./ParentModal/Modal";
import { useEffect, useState } from "react";
import { STATUS_CODES } from "../../Enums/statusCodes";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { SINGLE_LISTING_ADDRESS_UPDATE_URL } from "../../Api/EndPoints";
import useEditListingsModal from "../../Hooks/zustandStore/useEditListingsModal";
import { TEditListingAddressModalProps } from "../../Types/GeneralTypes/propsTypes";
import { EditListingAddressSchema } from "../../Schemas/User/editListingAddressSchema";
import { TGetListingDataResp } from "../../Types/GeneralTypes/apiResponseTypes";

const EditListingAddressModal: React.FC<TEditListingAddressModalProps> = ({
  reFetchData,
}) => {
  const AxiosPrivate = useAxiosPrivate();

  const editListingModalState = useEditListingsModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      addressLine: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
    },
    resolver: zodResolver(EditListingAddressSchema),
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<TGetListingDataResp>(
          `user/listing/address/${editListingModalState.listingID}`,
        );

        if (isMounted) {
          reset(response.data);
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    if (editListingModalState.listingID) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [editListingModalState.imageModalIsOpen]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await AxiosPrivate.patch(
        SINGLE_LISTING_ADDRESS_UPDATE_URL +
          `/${editListingModalState.listingID}`,
        data,
      );

      setIsLoading(false);

      toast.success("Address Updated");

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

  const bodyContent = (
    <div className="  ">
      <Input
        id="addressLine"
        label="Address Line"
        register={register}
        errors={errors}
      />
      <Input id="city" label="City" register={register} errors={errors} />
      <Input
        id="district"
        label="District"
        register={register}
        errors={errors}
      />
      <Input id="state" label="state" register={register} errors={errors} />
      <Input id="pinCode" label="Pincode" register={register} errors={errors} />
    </div>
  );

  return (
    <Modal
      title="Edit Address Modal"
      onClose={editListingModalState.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={editListingModalState.addressModalIsOpen}
      submitActionLabel="Change Address"
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default EditListingAddressModal;
