import React from 'react';
import styles from './modal-overlay.module.css'

const ModalOverlay = React.forwardRef((props, ref) => (
    <div className={styles.ModalOverlay} ref={ref} onClick={props.onClick}/>
))

export default ModalOverlay;