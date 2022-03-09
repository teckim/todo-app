import IconButton from "./IconButton";
import { CloseIcon } from "../icons";

function Dialog({ children, open, onClose }) {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-600/75 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>{children}</div>
        <span className="absolute top-0 right-0 p-2">
          <IconButton onClick={() => onClose()}>
            <CloseIcon className="w-4 h-4 text-red-600" />
          </IconButton>
        </span>
      </div>
    </div>
  );
}

export default Dialog;
