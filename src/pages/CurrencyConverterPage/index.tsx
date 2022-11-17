import Typography from '@mui/material/Typography';
import CurrencyConverter from '../../components/CurrencyConverter';
import styles from './index.module.scss';
const CurrencyConverterPage = () => {
    return (
        <div>
            <Typography variant="h3" noWrap component="div" className={styles.heading}>
                Currency Converter
            </Typography>
            <CurrencyConverter />
        </div>
    )
}
export default CurrencyConverterPage