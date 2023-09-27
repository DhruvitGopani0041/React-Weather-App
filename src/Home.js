import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios'; 
import WeatherData from './components/WeatherData';

function Home() {
    const apiKey = '0a50e98f01edd83531816d088650e228';

    //This is for Fatch Live Location with geolocation
    const getLocation = () => {
        const p = new Promise((resolve,reject)=>{
            navigator.geolocation.getCurrentPosition((suc)=>{
                resolve(suc);
            }); 
            const err = (er) => {
                reject(er);
            }
        })
        return p;
    }

    //Geolocation data enter in url and set fatch current city data and print it
    async function getData() {
        try {
          const result = await getLocation();
          const unit = 'metric';
          const GeoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${result.coords.latitude}&lon=${result.coords.longitude}&units=${unit}&appid=${apiKey}`;
          const response = await axios.get(GeoURL);

          setdata({
            ...data,
            celcius: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            speed: response.data.wind.speed,
            image: '/Images/cloud.png'
          });
          seterror('');
        } catch (err) {
          if (err.response && err.response.status === 404) {
            seterror("* Please Enter Correct City Name");
          } else {
            seterror('');
          }
        }
      }

    // useeffect for onload call function for one time
    useEffect(() => {
        getData()
    },[]);

    //usestate for seting data and default data
    const [data, setdata] = useState({
        celcius: '',
            name: 'Please Allow Nevigation',
            humidity: '',
            speed: '',
            image: '/Images/cloud.png'
    })

    const [name, setname] = useState('');   //usestate for fatching input values
    const [error, seterror] = useState(''); //usestate for giving city name error

    //This function is called click on the search button and execute and show the data
    const handleClick = () => { 
        if (name !== "") {
            const unit = 'metric'
            const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=${unit}&appid=${apiKey}`;
            axios.get(apiurl) //for fatching api from openweathermap
            
                .then(res => {
                    let imagePath = ''; 
                    //If-else is work for cloud related change images
                    if(res.data.weather[0].main === 'Clouds'){
                        imagePath = "/Images/cloud.png"
                    }else if(res.data.weather[0].main === 'Clear'){
                        imagePath = "/Images/clearcloud.png"
                    }else if(res.data.weather[0].main === 'Rain'){
                        imagePath = "/Images/rain.png"
                    }else if(res.data.weather[0].main === 'Drizzle'){
                        imagePath = "/Images/drizzle.png"
                    }else if(res.data.weather[0].main === 'Mist'){
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
                    if(err.response.status === 404){
                        seterror("* Please Enter Correct City Name");
                    }
                    else{
                        seterror('');
                    }
                });
        }
    }

    // Current date time and day 
    const d = new Date();
    const weekDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const day = weekDay[d.getDay()];
    const month = months[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();
    
    let time = new Date().toLocaleTimeString();
    const [ctime, setctime] = useState(time);
    const TimeFuntion = () => {
        time = new Date().toLocaleTimeString();
        setctime(time);
    };

    setInterval(()=>{
        TimeFuntion();
    },1000);

    return (
        <>
            {/* Called jsx Component */}
            <WeatherData 
                func={handleClick}
                data={data}
                error={error}
                name={name}
                setname={setname}
                day={day} month={month} date={date} year={year} ctime={ctime}
            />
        </>
    )
}

export default Home