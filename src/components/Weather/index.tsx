import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import styles from './index.module.scss';
import axios from 'axios';

const Weather = () => {
    // Setting and Getting the Weather data from API
    const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({})
    // Setting and getting the marks for slider.
    const [marks, setMarks] = useState<Array<any>>([])
    // setting and getting the loader for when we hit the API.
    const [isLoading, setIsloading] = useState(false);

    // This hooks is fired every time this component loads.
    // We are fetching the user's current location in this hook and using this location we are fetching the weather data using API.
    useEffect(() => {
        setIsloading(true)
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getWeatherData, () => { }, {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: Infinity
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }


        // After getting the location we fetch the weather data using the API.
        const getWeatherData = async (position: any) => {
            const { latitude, longitude } = position.coords
            const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(2)}&lon=${longitude.toFixed(2)}&units=metric&appid=7827823101d2b73da072f3788992569f`)
            setWeatherData(data.data);
        }
        getLocation()
    }, [])

    // This hooks is fired everytime the weather data changes, we are setting the value of marks to be used in slider.
    useEffect(() => {
        setIsloading(true)
        if (weatherData) {
            setMarks([
                {
                    value: weatherData?.main?.temp_min,
                    label: `${weatherData?.main?.temp_min}°C`,
                },
                {
                    value: weatherData?.main?.temp,
                    label: `${weatherData?.main?.temp}°C`,
                },
                {
                    value: weatherData?.main?.temp_max,
                    label: `${weatherData?.main?.temp_max}°C`,
                },
            ])
            setIsloading(false)
        }

    }, [weatherData])


    // This function return the formatted temp.
    const valuetext = (value: string | number) => {
        return `${value}°C`;
    }
    return isLoading ? (<div className={styles.weatherContainer}>Loading......</div>) :
        (weatherData && weatherData?.weather?.length > 0 && marks.length > 0 ?
            <div className={styles.weatherContainer}>
                <div className={styles.weatherContent} >
                    <div className={styles.weatherInfo}>
                        <div className={styles.weatherData}>
                            <span>Weather:<span className={styles.value}> {weatherData?.weather[0].main}</span></span>
                            <span>Real Feel:<span className={styles.value}>{weatherData?.main?.feels_like}°C</span></span>
                            <span>Humidity:<span className={styles.value}>{weatherData?.main?.humidity}</span></span>
                            <span>Preassure:<span className={styles.value}>{weatherData?.main.pressure}</span></span>
                        </div>
                        <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt="weahter" />
                    </div>
                    <Slider
                        key={"temp-slider"}
                        aria-label="Custom marks"
                        defaultValue={weatherData.main.temp}
                        getAriaValueText={valuetext}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={weatherData.main.temp_min}
                        max={weatherData.main.temp_max}
                        disabled
                        color="primary"
                        className={styles.weatherSlider}
                    />
                </div>
            </div > : <></>
        )
}

export default Weather