import { useEffect, useState } from "react";
import styles from './index.module.scss';
import axios from 'axios';

const CurrencyConverter = () => {
    // Setting and Getting the Exchange rates from the API
    const [exchangeRateData, setExchangeRateData] = useState<{ [key: string]: any }>({})

    // Setting and Getting result of currency conversion.
    const [result, setResult] = useState<number>(0.0)
    // Setting and Getting the currency we want to convert FROM
    const [fromCurrency, setFromCurrency] = useState<number>(1.0)
    // Setting and Getting the currency we want to convert TO
    const [toCurrency, setToCurrency] = useState<number>(1.0)
    // Setting and Getting the Loader while we fetch the data
    const [isLoading, setIsloading] = useState(false);

    // This hook is fired every time this component loads. We are getting the exchange rate data from API in this hook.
    useEffect(() => {
        setIsloading(true)
        const getExchangeRates = async () => {
            const data = await axios.get(`https://v6.exchangerate-api.com/v6/3d83131519ed1611512aeecd/latest/USD`)
            setIsloading(false)
            setExchangeRateData(data.data["conversion_rates"]);
        }
        getExchangeRates()
    }, [])
    // This hook is fired every time user changes the To or FROM currency.
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