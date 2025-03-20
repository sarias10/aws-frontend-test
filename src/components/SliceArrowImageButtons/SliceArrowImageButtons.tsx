import styles from './SliceArrowImageButtons.module.css';

interface SliceArrowImageButtonsProps {
    handlePrevious: () => void;
    handleNext: () => void;
    disabledLeft: boolean;
    disabledRight: boolean;

}
export const SliceArrowImageButtons = ({ handlePrevious, handleNext, disabledLeft, disabledRight }: SliceArrowImageButtonsProps) => {
    return (
        <div className={styles['button-container']}>
            <button
                onClick={handlePrevious}
                disabled={disabledLeft} // disabled solo acepta valores booleanos. Aquí evalua la condición.
                className={styles['custom-button']}
            >
                &lt;
            </button>
            <button
                onClick={handleNext}
                disabled={disabledRight}
                className={styles['custom-button']}
            >
                &gt;
            </button>
        </div>
    );
};
