import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = (props) => {
    return props.show && (
        <>
            <div className={`${styles.Modal}`}>
                <div className={styles.TopPanel}>
                    <div className={`${styles.Caption} text text_type_main-medium`}>
                        {props.caption}
                    </div>
                    <div className={styles.CloseButton}>
                        <CloseIcon type="primary" onClick={props.closeHandler}/>
                    </div>
                </div>
                
                <div className={styles.ModalContent}>
                    {props.children}
                </div>
            </div>
            <ModalOverlay onClick={props.closeHandler}/>
        </>
    );
}

export default Modal;