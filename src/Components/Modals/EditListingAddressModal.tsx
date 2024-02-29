import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import Modal from "./ParentModal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { SINGLE_LISTING_ADDRESS_UPDATE_URL } from "../../Api/EndPoints";
import useEditListingsModal from "../../Hooks/zustandStore/useEditListingsModal";
import { z } from "zod";
import Input from "../Inputs/Input";

const EditListingAddressSchema = z.object({
  addressLine: z.string().min(3, " Min length For address is 3").max(20),
  city: z.string().min(3, " Min length For city is 3").max(15),
  district: z.string().min(3, " Min length For district is 3").max(15),
  state: z.string().min(3, " Min length is 3").max(15),
  pinCode: z.string().refine((value) => {
    const INDIAN_PINCODE_REGEX = /^[1-9][0-9]{5}$/;
    return INDIAN_PINCODE_REGEX.test(value);
  }, "Invalid Indian Pincode"),
});

interface AddressInfo {
  addressLine: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
}
interface ListingAddressDataResponse {
  listing: AddressInfo;
}

interface EditListingAddressModal {
  reFetchData: () => void;
}

const EditListingAddressModal: React.FC<EditListingAddressModal> = ({
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
        const response = await AxiosPrivate.get<ListingAddressDataResponse>(
          `user/listing/address/${editListingModalState.listingID}`,
        );

        if (isMounted) {
          //   console.log(response.data, "address");

          reset(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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

      toast.success("Listing address Updated SuccessFully");

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
