import { Modal } from "antd";

export const SuccessModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      onCancel={onClose}
      mask={false}
      wrapClassName="bg-[#231F20C0]"
      styles={{
        container: {
          backgroundColor: "#231F20",
        },
        body: {
          backgroundColor: "#231F20",
        },
      }}
    >
      {children}
    </Modal>
  );
};
