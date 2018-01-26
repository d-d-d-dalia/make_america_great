import React, { Component } from 'react';
import './App.css'
import { connect } from 'react-redux';
import fetchJsonp from 'fetch-jsonp'
import Guesses from './Guesses'
import CurrentForecast from '../components/CurrentForecast'

import {  Route, 	Switch , Link } from 'react-router-dom'

const APIURL = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_KEY}`

class App extends Component {

	constructor (props) {
		super ()

		this.state = {
			fetchingData: true,
			weatherData: {}
		}
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords

			fetchJsonp(`${APIURL}/${latitude},${longitude}`)
				.then(response => response.json())
				.then(weatherData => this.setState( {fetchingData: false, weatherData} ))
				.catch(error => console.error(error))
		})
	}
	
	render() {
		
		let GuessesLog = (
		<div>
		< Link to="/guesses" > Guesses Log </Link>
		< Route path="/guesses" component={ Guesses } />
		</div>
		)

		const { fetchingData, weatherData } = this.state
		console.log(fetchingData)
		console.log("weather data: ", weatherData)
		return (
			<div className="App">
			  <div className="App-header">
			    <h1> Make America Great </h1>
			    <h3> one degree at a time </h3>
			  </div>
			  { GuessesLog }
			  <div className="App-intro">
			 { weatherData.currently ?  <CurrentForecast forecast={weatherData.currently} /> : "" }
			  </div>
			  <div> <Guesses/> </div>
			</div>
		)
	}
}

export default App