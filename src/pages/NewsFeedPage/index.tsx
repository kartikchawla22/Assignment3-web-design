import Typography from '@mui/material/Typography';
import NewsFeed from '../../components/NewsFeed';
import styles from './index.module.scss';

const NewsFeedPage = () => {
    return (
        <div>
            <Typography variant="h4" component="div" className={styles.heading}>
                Latest News Feed
            </Typography>
            <NewsFeed />
        </div>
    )
}
export default NewsFeedPage