import { TbAlertTriangleFilled } from "react-icons/tb";
import useConfirmReservationCancel from "../../Hooks/zustandStore/useConfirmReservationCancelModal";
import Modal from "./ParentModal/Modal";

interface TCancelReservationConfirmProps {
  cancelReservation: (reservationID: String) => Promise<void>;
}

const CancelReservationConfirm: React.FC<TCancelReservationConfirmProps> = ({
  cancelReservation,
}) => {
  const cancelReservationConfirmModalState = useConfirmReservationCancel();

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
            cancelReservationConfirmModalState.onClose();
          }}
        >
          No Cancel
        </button>

        <button
          className=" rounded-md bg-red-500 px-2 py-1 font-Sen font-bold text-white  hover:bg-red-600 hover:shadow-md"
          onClick={() => {
            cancelReservation(cancelReservationConfirmModalState.reservationID);
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
      onClose={cancelReservationConfirmModalState.onClose}
      isOpen={cancelReservationConfirmModalState.isOpen}
      body={bodyContent}
    />
  );
};

export default CancelReservationConfirm;
