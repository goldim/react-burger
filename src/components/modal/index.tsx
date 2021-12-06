import { FC, ReactNode, ReactPortal, useEffect } from 'react'
import { createPortal } from 'react-dom'

import ModalOverlay from '../modal-overlay'
import styles from './modal.module.css'
import { CloseIcon } from '../../utils/yandex-components'

interface IModalProps {
    closeHandler: () => void,
    caption: string,
    show: boolean,
    children: ReactNode
}

const Modal: FC<IModalProps> = ({caption, closeHandler, show, children}): ReactPortal | null => {
    const root: HTMLElement | null = document.getElementById("react-modals");

    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler();
            }
        }

        document.body.addEventListener("keyup", onEscape);

        return () => {
            document.body.removeEventListener("keyup", onEscape);
        };
    }, [closeHandler]);

    return show ? 
            createPortal(
                (
                    <>
                        <div className={`${styles.Modal}`}>
                            <div className={styles.TopPanel}>
                                <div className={`${styles.Caption} text text_type_main-medium`}>
                                    {caption}
                                </div>
                                <div className={styles.CloseButton}>
                                    <CloseIcon type="primary" onClick={closeHandler}/>
                                </div>
                            </div>
                            
                            <div className={styles.ModalContent}>
                                {children}
                            </div>
                        </div>
                        <ModalOverlay onClick={closeHandler}/>
                    </>
                ),
                root!
            )
            : null
};

export default Modal;