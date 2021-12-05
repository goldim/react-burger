import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

import ModalOverlay from '../modal-overlay'
import styles from './modal.module.css'
import { CloseIcon } from '../../utils/yandex-components'

const Modal = ({caption, closeHandler, show, children}) => {
    const root = document.getElementById("react-modals");

    React.useEffect(() => {
        function onEscape(e) {
            if (e.key === "Escape") {
                closeHandler();
            }
        }

        document.body.addEventListener("keyup", onEscape);

        return () => {
            document.body.removeEventListener("keyup", onEscape);
        };
    }, [closeHandler]);

    return show && ReactDOM.createPortal(
        (<>
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
        </>),
        root
    )
};

Modal.defaultProps = {
    caption: ""
}

Modal.propTypes = {
    closeHandler: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal;