import { IconButton } from "../";
import { CloseIcon } from "../../icons";
import "./dialog.css";

function Dialog({ children, open, onClose }) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="dialog">
        <div>{children}</div>
        <IconButton
          className="dialog__close-button"
          onClick={() => onClose()}
        >
          <CloseIcon className="dialog__close-icon" />
        </IconButton>
      </div>
    </div>
  );
}

export default Dialog;
