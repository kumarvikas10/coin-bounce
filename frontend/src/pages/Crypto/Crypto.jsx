import { useEffect, useState } from "react";
import styles from './Cryto.module.css';
import Loader from "../../components/Loader/Loader";
import { getCrypto } from "../../api/external";

function Crypto (){
    const [data, setData] = useState([]);
    useEffect (() => {
        //IIFE
        (async function getCryptoApiCall(){
            const response = await getCrypto();
            setData(response);
        })
        //Cleanup
        setData([]);
    }, []);

    if (data.length === 0){
        return <Loader text="cryptocurrencies" />
    }

    return(
        <table className={styles.table}>
            <thead>
                <tr className={styles.head}>
                    <th>#</th>
                    <th>Coin</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>24h</th>
                </tr>
            </thead>
        </table>
    )
}

export default Crypto;