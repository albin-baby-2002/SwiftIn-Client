import { TbAlertTriangleFilled } from "react-icons/tb";

import Modal from "./ParentModal/Modal";
import useHostConfirmReservationCancel from "../../Hooks/zustandStore/useHostConfirmCancelReservation";

interface THostCancelReservationConfirmProps {
  cancelReservation: (reservationID: string) => Promise<void>;
}

const HostCancelReservationConfirm: React.FC<
  THostCancelReservationConfirmProps
> = ({ cancelReservation }) => {
  const HostConfirmCancelReserationModal = useHostConfirmReservationCancel();

  const bodyContent = (
    <>
      <div className=" flex w-full justify-center py-3">
        <TbAlertTriangleFilled size={42} className=" text-yellow-500" />
      </div>

      <p className=" my-3 text-center font-Sen text-lg font-semibold">
        Are you sure you want to cancel{" "}
      </p>
      <p className=" py-1 text-center font-Sen text-sm font-semibold text-gray-600">
        if yes press confirm or press cancel
      </p>

      <div className=" mt-5 flex w-full  justify-center  gap-4 text-sm">
        <button
          className="  rounded-md bg-gray-500 px-2 py-1 font-Sen font-bold text-white  hover:bg-gray-700"
          onClick={() => {
            HostConfirmCancelReserationModal.onClose();
          }}
        >
          No Cancel
        </button>

        <button
          className=" rounded-md bg-red-500 px-2 py-1 font-Sen font-bold text-white  hover:bg-red-600 hover:shadow-md"
          onClick={() => {
            cancelReservation(HostConfirmCancelReserationModal.reservationID);
          }}
        >
          Yes Confirm
        </button>
      </div>
    </>
  );

  return (
    <Modal
      title="Confirmation Box"
      onClose={HostConfirmCancelReserationModal.onClose}
      isOpen={HostConfirmCancelReserationModal.isOpen}
      body={bodyContent}
    />
  );
};

export default HostCancelReservationConfirm;
