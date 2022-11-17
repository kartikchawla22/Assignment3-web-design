import { useEffect, useState } from "react"
import styles from './index.module.scss';
import axios from "axios"

const NewsFeed = () => {
    const [newsData, setNewsData] = useState<{ [key: string]: any }>({});
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsloading(true)
            const newsData = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=a058eb099f404d14a491583b0afaa01c");
            setNewsData(newsData.data)
            setIsloading(false)
        })();
    }, []);

    return (
        isLoading ? <div className={styles.newsContainer}>Loading......</div> :
            newsData &&
            <div className={styles.newsContainer}>
                <div className={styles.articles}>
                    {newsData.articles?.map((article: any, index: number) =>
                        <div className={styles.content}>
                            {
                                article?.title ?
                                    <h2 className={styles.title}>
                                        {article.title}
                                    </h2>
                                    : <></>
                            }
                            {
                                article?.author ?
                                    <div className={styles.author}>
                                        By: {article.author}
                                    </div>
                                    :
                                    <></>
                            }
                            {
                                article?.urlToImage ?
                                    <div className={styles.articleImage}>
                                        <img src={article.urlToImage} alt={article.title} />
                                    </div>
                                    : <></>
                            }
                            {
                                article?.description ?
                                    <div className={styles.description}>
                                        {article.description}
                                    </div>
                                    : <></>
                            }
                        </div>

                    )}
                </div>
            </div>
    )
}
export default NewsFeed