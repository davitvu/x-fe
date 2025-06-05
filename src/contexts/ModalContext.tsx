import React, { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal';

interface ModalContextType {
    isOpen: boolean;
    content: React.ReactNode | null;
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<React.ReactNode | null>(null);

    const openModal = (modalContent: React.ReactNode) => {
        setContent(modalContent);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    };

    return (
        <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
            {children}
            <Modal show={isOpen} onClose={closeModal}>
                {content}
            </Modal>
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
