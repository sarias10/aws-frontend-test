import styles from './ImageIndicators.module.css';

interface IndicatorsProps {
    total: number;
    currentIndex: number;
}
export const ImageIndicators = ({ total, currentIndex }: IndicatorsProps) => {
    return (
        <div className={styles['indicators-container']}>
            {Array.from({ length: total }).map((_, index) => (
                <div
                    key={index}
                    className={`${styles['indicator']} ${index === currentIndex ? styles['active']: ''}`}
                />
            ))}
        </div>
    );
};
