import { connect } from 'react-redux'
import { guessesFetchData } from '../actions/Guesses'
import React, { Component } from 'react'
import {  Route, 	Switch , Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { CurrentForecast } from '../components/CurrentForecast'
import Footer from '../components/Footer'
  
const checkGuess = (guess, i) => {
    let temperatureC = (guess.temperature - 32) / 1.8
    let absoluteValue = Math.abs(guess.guess - temperatureC)
    return (absoluteValue <= 3 ? "yaaaaaass" : "womp-womp")
}

class Guesses extends Component {

    componentDidMount() {

        this.props.fetchData('/api/guesses')
    }

    render() {
        if (this.props.hasErrored) {
            return (
             <p> Sorry, there was a loading error </p>
            )
        }

        if (this.props.isLoading) {
            return (
            <p> Loading… </p>
            )
        }

        let modifiedGuesses = this.props ? this.props.guesses.map(checkGuess)
        : []

        return (
        	<div className="Guesses Container">
			  <h4> Your Guesses: </h4>
				{this.props ? this.props.guesses.map((guess, i) =>
				  <div key={i}>
				    <p> {guess.date} - {modifiedGuesses[i]} - {guess.guess} - {guess.temperature} </p>
                  </div>
                ) : 'uh oh' }
              <div>
			    <Link to={`/about`} > <h5> the purpose </h5> </Link>
                <Link to={`/howitworks`} > <h5> how it works </h5> </Link>
                <Link to={`/`} > <h5> home </h5> </Link>
              </div>
                <div>
                  < Footer />
                </div>
			</div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('yes im being called')
    return {
        guesses: state.guessesReducer.guesses,
        hasErrored: state.guessesReducer.error,
        isLoading: state.guessesReducer.loading,
        temperature: state.temperature
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData: guessesFetchData }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Guesses);
export { checkGuess };