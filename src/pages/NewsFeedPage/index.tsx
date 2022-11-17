import Typography from '@mui/material/Typography';
import NewsFeed from '../../components/NewsFeed';
import styles from './index.module.scss';

const NewsFeedPage = () => {
    return (
        <div>
            <Typography variant="h6" noWrap component="div" className={styles.heading}>
                This is News Feed
            </Typography>
            <NewsFeed />
        </div>
    )
}
export default NewsFeedPage