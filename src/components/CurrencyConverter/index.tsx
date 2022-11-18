import { useEffect, useState } from "react";
import styles from './index.module.scss';
import axios from 'axios';

const CurrencyConverter = () => {
    const [exchangeRateData, setExchangeRateData] = useState<{ [key: string]: any }>({})
    const [result, setResult] = useState<number>(0.0)
    const [fromCurrency, setFromCurrency] = useState<number>(1.0)
    const [toCurrency, setToCurrency] = useState<number>(1.0)
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setIsloading(true)
        const getExchangeRates = async () => {
            const data = await axios.get(`https://v6.exchangerate-api.com/v6/3d83131519ed1611512aeecd/latest/USD`)
            setIsloading(false)
            setExchangeRateData(data.data["conversion_rates"]);
        }
        getExchangeRates()
    }, [])
    useEffect(() => {
        if (fromCurrency > 0.0 && toCurrency > 0.0) {
            setResult(fromCurrency / toCurrency)
        }
    }, [fromCurrency, toCurrency])

    return isLoading ? (<div className={styles.currencyConverterContainer}>Loading......</div>) :
        (exchangeRateData ?
            <div className={styles.currencyConverterContainer}>
                <div className={styles.currencyConverterContent} >
                    <div className={styles.dropdownContainer}>
                        <span>From:</span>
                        <select name="fromCurrency" id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(parseFloat(e.target.value))}>
                            {
                                Object.keys(exchangeRateData).map((currency: string) => {
                                    return (
                                        <option value={exchangeRateData[currency]}>{currency}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.dropdownContainer}>
                        <span>To:</span>
                        <select name="toCurrency" id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(parseFloat(e.target.value))}>
                            {
                                Object.keys(exchangeRateData).map((currency: string) => {
                                    return (
                                        <option value={exchangeRateData[currency]}>{currency}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.result}>
                        {result}
                    </div>
                </div>
            </div > : <></>
        )
}

export default CurrencyConverter