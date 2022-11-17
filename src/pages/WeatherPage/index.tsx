import Typography from '@mui/material/Typography';
import Weather from '../../components/Weather';
import styles from './index.module.scss';

const WeatherPage = () => {
    return (
        <div>
            <Typography variant="h3" noWrap component="div" className={styles.heading}>
                Weather
            </Typography>
            <Weather />
        </div>
    )
}
export default WeatherPage