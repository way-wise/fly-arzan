import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const Modal = ({ children, isOpen = false, isPending = false, onClose }) => {
  // Close modal if closable
  const close = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      transition
      className="tw:relative tw:z-[99999]"
    >
      <DialogBackdrop
        transition
        className="tw:fixed tw:inset-0 tw:bg-black/10 tw:md:bg-white/10 tw:duration-300 tw:ease-out tw:data-[closed]:opacity-0"
      />
      <div className="tw:fixed tw:inset-0 tw:flex tw:size-full tw:items-center tw:justify-center tw:p-4">
        <DialogPanel
          transition
          className="tw:w-full tw:max-w-sm tw:md:max-w-md tw:rounded-lg tw:bg-white tw:shadow-xl tw:duration-300 tw:ease-out tw:data-[closed]:scale-95 tw:data-[closed]:opacity-0"
        >
          <div className="tw:p-4">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export { Modal };
