import React, { createContext, useState } from "react";

export enum Modal {
	outOfHearts = "outOfHearts",
	notEnoughCoins = "notEnoughCoins",
	store = "store",
	quizCompleted = "quizCompleted",
}

interface ModalContextInterface {
	openModal: (type: Modal) => void;
	closeModal: () => void;
	modal: Modal | null;
	showModal: boolean;
}

const ModalContext = createContext<ModalContextInterface>({
	openModal: () => {},
	closeModal: () => {},
	modal: Modal.store,
	showModal: true,
});

export const ModalProvider = ({ children }: any) => {
	const [modal, setModal] = useState<Modal | null>(null);
	const [showModal, setShowModal] = useState(true);

	const openModal = (type: Modal) => {
		setModal(type);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	// TODO: every second modal open closes as soon as it opens for no reason
	return (
		<ModalContext.Provider
			value={{ openModal, closeModal, modal, showModal }}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContext;
