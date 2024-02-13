import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../UiComponents/Button";

interface ModelProps {
  isOpen: boolean;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  submitActionLabel: string;
}

const Modal: React.FC<ModelProps> = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  submitActionLabel,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    if (disabled) {
      return;
    }

    onSubmit();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className=" 
            fixed flex justify-center items-center inset-0 bg-black/25 z-20  "
    >
      <div
        className="
       w-full  xl:w-2/5 lg:w-2/5 md:w-2/3  my-6 mx-auto h-full  md:h-auto   "
      >
        <div
          className={` 
        translate duration-300 
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}  `}
        >
          <div
            className="
                translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex  flex-col w-full bg-white pb-4  max-h-[95vh]
            "
          >
            <div className=" flex items-center rounded-t justify-center border-b-[1px] py-4 px-4  ">
              <button className="absolute left-9 " onClick={handleClose}>
                <IoMdClose size={25} />
              </button>

              <p className=" font-bold text-md">{title}</p>
            </div>

            <div className="overflow-y-scroll  max-h-[95vh]">
              <div className="py-4 px-8 ">{body}</div>

              <div className="py-4 px-8">
                <Button label={submitActionLabel} onClick={handleSubmit} />
              </div>

              {footer && <div className="py-4 px-8">{footer}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
