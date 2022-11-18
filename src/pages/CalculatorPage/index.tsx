import Typography from '@mui/material/Typography';
import Calculator from '../../components/Calculator';
import styles from './index.module.scss';

const CalculatorPage = () => {
    return (
        <div className={styles.calculatorPageContainer}>
            <Typography variant="h4" component="div" className={styles.heading}>
                Calculator
            </Typography>
            <Calculator />
        </div>
    )
}
export default CalculatorPage