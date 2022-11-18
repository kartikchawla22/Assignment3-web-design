import Typography from '@mui/material/Typography';
import Weather from '../../components/Weather';
import styles from './index.module.scss';

const WeatherPage = () => {
    return (
        <div>
            <Typography variant="h4" component="div" className={styles.heading}>
                Weather
            </Typography>
            <Weather />
        </div>
    )
}
export default WeatherPage