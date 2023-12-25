import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import styles from '../Home/Home.module.css';

function Home(){
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        //IIFE
        (async function newsApiCall(){
            const response = await getNews();
            console.log(response);
            setArticles(response);

        })();

        //cleanup Function
        setArticles([]);
    },[]);

    return(
        <>
        <div className={styles.header}>
            Latest Articles
        </div>
        <div className={styles.grid}>
            {
                articles.map((article) => (
                    <div className={styles.card}>
                        <img src={article.urlToImage} alt="bitcoin_1"/>
                        <h3>{article.title}</h3>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default Home;