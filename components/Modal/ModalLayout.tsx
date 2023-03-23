import { Dispatch, FunctionComponent, SetStateAction } from "react";
import CloseIcon from "../Icons/CloseIcon";

interface Props {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  handleClose?: Function,
  title: string,
  size?: string,
  position?: string,
  bgColor?: string,
  children: React.ReactNode
}

const ModalLayout : FunctionComponent<Props> = ({
  open,
  setOpen,
  title = "",
  size = "max-w-lg",
  children,
  position = "center",
  bgColor = "bg-white",
}) => {
  if (!open) {
    return null;
  }

  function handleClose() {
    setOpen(false)
  }

  let classPosition;
  if (position === "right") {
    classPosition =
      "fixed xs:top-0 inset-x-0 md:inset-x-auto mx-auto md:top-4 md:right-4";
  } else if (position === "left") {
    classPosition =
      "fixed xs:top-0   inset-x-0 md:inset-x-auto mx-auto md:top-4 md:left-4";
  } else if (position === "center") {
    classPosition = "flex flex-col justify-center";
  }

  return (
    <div id="modal" className="print:hidden ">
      <div
        className="fixed z-50 inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 "
        onClick={handleClose}
      >
        <div
          className={classPosition}
          style={{ minHeight: "-webkit-fill-available" }}
          role="dialog"
          aria-modal="true"
        >
          <div className={"overflow-auto  mx-auto max-h-fit  " + size}>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[80vh] overflow-auto font-semibold  rounded-lg shadow-lg p-6 text-base  text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5 ${bgColor}`}
            >
              <div className="flex justify-between">
                <h3>{title}</h3>
                <CloseIcon onClick={handleClose} />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLayout;