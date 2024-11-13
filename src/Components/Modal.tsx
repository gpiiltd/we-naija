import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ICustomModalProps } from "./types";



const CustomModal: React.FC<ICustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => (
    <Modal
    open={isOpen}
    onClose={onClose}
    center
    styles={{
      overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      modal: {
        borderRadius: '10px',
        width: '30%', 
       
      },
    }}
  >
    <div>{children}</div>
  </Modal>
);

export default CustomModal;
