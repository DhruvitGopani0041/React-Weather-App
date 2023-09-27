import React from 'react';
import '../style.css'

const weatherData = (props) => {
    return (
        <>
            <div className='container'>
                <div className='weather'>

                    {/* This is for Searching data */}
                    <div className='search'>
                        <input type='text' placeholder='Enter City Name'
                            onChange={e => props.setname(e.target.value)}
                        />
                        <button onClick={props.func}><img src='/Images/search.png' alt='' /></button>
                    </div>

                    {/* This is for invalid city error */}
                    <div className='error'>
                        <p>{props.error}</p>
                    </div>

                    {/* This is for Image,name and celcius */}
                    <div className='winfo'>
                        <img src={props.data.image} alt='' className='icon' />
                        <h1>{Math.round(props.data.celcius)}°c</h1>
                        <h2>{props.data.name}</h2>

                        {/* This is for Humidity and Wind */}
                        <div className='details'>
                            <div className='col'>
                                <img src='/Images/humidity.png' alt='' />
                                <div className='humidity'>
                                    <p>{Math.round(props.data.humidity)}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>

                            <div className='col'>
                                <img src='/Images/wind.png' alt='' />
                                <div className='wind'>
                                    <p>{Math.round(props.data.speed)} km/h</p>
                                    <p>Wind</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default weatherData;