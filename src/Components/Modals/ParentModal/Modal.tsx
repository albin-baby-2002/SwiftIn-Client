import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../../UiComponents/Button";
import { TModalProps } from "../../../Types/GeneralTypes/propsTypes";

const Modal: React.FC<TModalProps> = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  wider,
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
    if (onSubmit) {
      onSubmit();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className=" 
            fixed inset-0 z-30 flex items-center justify-center bg-black/25  "
    >
      <div
        className={`${wider ? " md:w-2/3 lg:w-3/4" : " sm:w-3/4 md:w-2/3 lg:w-2/5  xl:w-2/5"} mx-auto  my-6 h-full w-full  sm:h-auto  `}
      >
        <div
          className={` 
        translate h-full duration-300 sm:h-auto
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}  `}
        >
          <div
            className="
                translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white  pb-4 shadow-lg sm:h-auto sm:max-h-[95vh]  
            "
          >
            <div className=" flex items-center justify-center rounded-t border-b-[1px] px-4 py-4  ">
              <button className="absolute left-9 " onClick={handleClose}>
                <IoMdClose size={25} />
              </button>

              <p className=" text-md font-bold">{title}</p>
            </div>

            <div className="max-h-[95vh]  overflow-y-scroll">
              <div className=" px-4 py-4 sm:px-8 ">{body}</div>

              {submitActionLabel && (
                <div className="px-8 py-4">
                  {wider ? (
                    <div className=" mx-auto my-3 w-4/5">
                      <Button
                        label={submitActionLabel}
                        onClick={handleSubmit}
                        outline
                      />
                    </div>
                  ) : (
                    <>
                      <Button
                        label={submitActionLabel}
                        onClick={handleSubmit}
                      />
                    </>
                  )}
                </div>
              )}

              {footer && <div className="px-8 py-2">{footer}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
