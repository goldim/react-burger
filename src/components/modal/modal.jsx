import styles from './modal.module.css'

const Modal = (props) => {
    return props.show && (
        <div className={styles.Modal}>
            <button onClick={props.closeHandler}>X</button>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;