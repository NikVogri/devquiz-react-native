import React, { createContext, useState } from "react";
import OutOfHeartsModal from "../components/UI/Modal/OutOfHeartsModal";
import StoreModal from "../components/UI/Modal/StoreModal";
export enum Modal {
  outOfHearts = "outOfHearts",
  store = "store",
}

interface ModalContextInterface {
  openModal: (type: Modal) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextInterface>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: any) => {
  const [modal, setModal] = useState<Modal | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (type: Modal) => {
    setModal(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal === Modal.outOfHearts && (
        <OutOfHeartsModal closeModal={closeModal} showModal={showModal} />
      )}
      {modal === Modal.store && (
        <StoreModal closeModal={closeModal} showModal={showModal} />
      )}
    </ModalContext.Provider>
  );
};

export default ModalContext;
