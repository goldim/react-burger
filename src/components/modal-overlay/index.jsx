import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css'

const ModalOverlay = React.forwardRef((props, ref) => (
    <div className={styles.ModalOverlay} ref={ref} onClick={props.onClick}/>
))

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay;