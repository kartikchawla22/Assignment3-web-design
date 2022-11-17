import * as React from 'react';
import Typography from '@mui/material/Typography';
import Calculator from '../../components/calculator';
import styles from './index.module.scss';
const CalculatorPage = () => {
    return (
        <div>
            <Typography variant="h3" noWrap component="div" className={styles.heading}>
                Calculator
            </Typography>
            <Calculator />
        </div>
    )
}
export default CalculatorPage