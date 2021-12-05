import { FC, forwardRef, LegacyRef, PropsWithChildren } from 'react';
import styles from './modal-overlay.module.css'

interface IModalOverlayProps {
    onClick: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = forwardRef<HTMLButtonElement, PropsWithChildren<IModalOverlayProps>>((props, ref) => (
    <div className={styles.ModalOverlay} onClick={props.onClick}/>
))

export default ModalOverlay;