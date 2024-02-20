import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../../UiComponents/Button";

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
            fixed inset-0 z-20 flex items-center justify-center bg-black/25  "
    >
      <div
        className="
       mx-auto  my-6 h-full w-full  md:h-auto md:w-2/3 lg:w-2/5  xl:w-2/5   "
      >
        <div
          className={` 
        translate duration-300 
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}  `}
        >
          <div
            className="
                translate relative flex h-full max-h-[95vh] w-full flex-col rounded-lg border-0  bg-white pb-4 shadow-lg md:h-auto  lg:h-auto
            "
          >
            <div className=" flex items-center justify-center rounded-t border-b-[1px] px-4 py-4  ">
              <button className="absolute left-9 " onClick={handleClose}>
                <IoMdClose size={25} />
              </button>

              <p className=" text-md font-bold">{title}</p>
            </div>

            <div className="max-h-[95vh]  overflow-y-scroll">
              <div className="px-8 py-4 ">{body}</div>

              <div className="px-8 py-4">
                <Button label={submitActionLabel} onClick={handleSubmit} />
              </div>

              {footer && <div className="px-8 py-2">{footer}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
