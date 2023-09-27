import React, { useState } from 'react';
import './style.css';
import axios from 'axios'; 
import WeatherData from './components/WeatherData';

function Home() {
    //usestate for seting data and default data
    const cityname = 'pune'
    const [data, setdata] = useState({ 
        celcius: '',
        name: '',
        humidity: '',
        speed: '',
        image: ''
    })

    const [name, setname] = useState('');   //usestate for fatching input values
    const [error, seterror] = useState(''); //usestate for giving city name error

    //This function is called click on the search button and execute and show the data
    const handleClick = () => { 
        if (name !== "") {
            const unit = 'metric'
            const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=${unit}&appid=139a5dcb83aaa62cf384f7daf6ae56e4`;
            axios.get(apiurl) //for fatching api from openweathermap
            
                .then(res => {
                    let imagePath = ''; 
                    //If-else is work for cloud related change images
                    if(res.data.weather[0].main == 'Clouds'){
                        imagePath = "/Images/cloud.png"
                    }else if(res.data.weather[0].main == 'Clear'){
                        imagePath = "/Images/clearcloud.png"
                    }else if(res.data.weather[0].main == 'Rain'){
                        imagePath = "/Images/rain.png"
                    }else if(res.data.weather[0].main == 'Drizzle'){
                        imagePath = "/Images/drizzle.png"
                    }else if(res.data.weather[0].main == 'Mist'){
                        imagePath = "/Images/mist.png"
                    }else {
                        imagePath = "/Images/cloud.png"
                    }
                    setdata({
                        ...data, celcius: res.data.main.temp, name: res.data.name,
                        humidity: res.data.main.humidity, speed: res.data.wind.speed,
                        image: imagePath
                    })
                    seterror('');
                })
                .catch(err =>{ 
                    if(err.response.status == 404){
                        seterror("* Please Enter Correct City Name");
                    }
                    else{
                        seterror('');
                    }
                    console.log(err)
                });
        }
    }
    return (
        <>
            {/* Called jsx Component */}
            <WeatherData 
                func={handleClick}
                data={data}
                error={error}
                name={name}
                setname={setname}
            />
        </>
    )
}

export default Home