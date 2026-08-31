import { ReactNode, useState } from "react";
import styled from "styled-components";

export const Overlay = styled.div`
  align-items: center;
  background: linear-gradient(135deg, #aa2bd1 0%, #0d7b7b 100%);
  display: flex;
  height: 100dvh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
`;

type ModalProps = {
  children: ReactNode;
};

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const Modal = ({ children }: ModalProps) =>
    isOpen ? <Overlay>{children}</Overlay> : null;

  return { Modal, closeModal, isOpen, openModal };
};

export default useModal;
