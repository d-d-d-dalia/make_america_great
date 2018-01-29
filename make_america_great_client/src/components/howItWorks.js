import React from 'react';
import {  Route, 	Switch , Link } from 'react-router-dom'

const howItWorks = () => {
  return (
    <div className='howItWorks'>
      <h1> - how it works - </h1>
      <p> Make America Great is a React app using Redux middleware, connected to a Rails api backend. It pulls temperature data for your current location using the darksky.net api. When you make a guess in Celsius, it compares that to the current temperture reading. If you are within 5 degrees of accuracy, you get a point! </p>
	  <Link to={`/guesses`} > <h5> guesses log </h5> </Link>
	  <Link to={`/about`} > <h5> about the app </h5> </Link>
	  <Link to={`/`} > <h5> home </h5> </Link>
    </div>
  )
}

export default howItWorks;