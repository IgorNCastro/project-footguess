import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NotFound from './components/NotFound'
import { playersEngland } from './API-Data/data';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.compareInputToPlayers = this.compareInputToPlayers.bind(this);
    this.compareToRightPlayer = this.compareToRightPlayer.bind(this);
    this.coloringGuessedPlayer = this.coloringGuessedPlayer.bind(this);
    this.playersProximityValues = this.playersProximityValues.bind(this);
    this.compareProximityValues = this.compareProximityValues.bind(this);
    this.noMoreChances = this.noMoreChances.bind(this);
    this.finishGame = this.finishGame.bind(this);
    this.selectPlayerFromList = this.selectPlayerFromList.bind(this);
    this.showListPlayers = this.showListPlayers.bind(this);
    this.togglePopupW = this.togglePopupW.bind(this);
    this.togglePopupNo = this.togglePopupNo.bind(this);
    this.state = {
      dayResult: {
        id: 2728,
        name: "Kasper Schmeichel",
        age: 36,
        number: 1,
        position: "Goalkeeper",
        photo: "https://media.api-sports.io/football/players/2728.png",
        league: "Premier League",
        team: "Leicester City",
        country: "Denmark",
        region: "Europe",
        height: 189,
      },
      isGameFinished: false,
      userAttempts: 0,
      playerInput: '',
      playerName: false,
      cases: {},
      guessedPlayers: [],
      allEnglandPlayers: playersEngland.map((item) => item),
      nameAllEnglandPlayers: [],
      winPopUp: false,
      endGame: false,
    };
  }

  onInputChange({ target }) {
    const { isGameFinished, playerInput } = this.state;
    if (!isGameFinished) {
      const { name, value } = target;
      if (playerInput.length === 0) {
        const upperFirst = value.toUpperCase();
        return this.setState({
          [name]: upperFirst,
        }, () => {
          this.compareInputToPlayers();
        });
      }
      this.setState({
        [name]: value,
      }, () => {
        this.compareInputToPlayers();
        if (value.length >= 3) this.showListPlayers();
      });
    }
  }

  async compareInputToPlayers() {
    const MAX_ATTEMPTS = 6;
    const { playerInput, allEnglandPlayers, userAttempts } = this.state;
    if (userAttempts >= MAX_ATTEMPTS) return this.noMoreChances();
    const selectedPlayer = allEnglandPlayers.find((player) => playerInput === player.name);
    if (selectedPlayer) {
      await this.compareToRightPlayer(selectedPlayer);
      await this.playersProximityValues(selectedPlayer);
      const { cases } = this.state;
      const playerWithCases = {...selectedPlayer, ...cases};
      this.setState((prevState) => ({
        guessedPlayers: [...prevState.guessedPlayers, playerWithCases],
        userAttempts: prevState.userAttempts + 1,
        cases: {},
        playerInput: '',
        nameAllEnglandPlayers: [],
      }));
    };
  }

  compareToRightPlayer(player) {
    const { dayResult } = this.state;
    if (player.name === dayResult.name) return this.finishGame();
    if (player.league === dayResult.league) this.coloringGuessedPlayer('league');
    if (player.team === dayResult.team) this.coloringGuessedPlayer('team');
    if (player.position === dayResult.position) this.coloringGuessedPlayer('position');
    if (player.country === dayResult.country) this.coloringGuessedPlayer('country');
    if (player.region === dayResult.region) this.coloringGuessedPlayer('region');
    if (player.height === dayResult.height) this.coloringGuessedPlayer('height');
    if (player.age === dayResult.age) this.coloringGuessedPlayer('age');
    if (player.number === dayResult.number) this.coloringGuessedPlayer('number');
  }

  compareProximityValues(value01, value02) {
    if (value01 === (value02 + 1) || value01 === (value02 + 2) || value01 === (value02 - 1) || value01 === (value02 - 2)) return true;
    return false;
  }
  
  playersProximityValues(player) {
    const { dayResult } = this.state;
    if (this.compareProximityValues(player.height, dayResult.height)) this.coloringGuessedPlayer('heightProx');
    if (this.compareProximityValues(player.age, dayResult.age)) this.coloringGuessedPlayer('ageProx');
    if (this.compareProximityValues(player.number, dayResult.number)) this.coloringGuessedPlayer('numberProx');
  }

  coloringGuessedPlayer(input) {
    const { cases } = this.state;
    switch(input){
    case 'league':
      cases.playerLeague = true;
      return this.setState({ cases });
    case 'team':
      cases.playerTeam = true;
      return this.setState({ cases });
    case 'position':
      cases.playerPosition = true;
      return this.setState({ cases });
    case 'country':
      cases.playerCountry = true;
      return this.setState({ cases });
    case 'region':
      cases.playerRegion = true;
      return this.setState({ cases });
    case 'height':
      cases.playerHeight = true;
      return this.setState({ cases });
    case 'age':
      cases.playerAge = true;
      return this.setState({ cases });
    case 'number':
      cases.playerNumber = true;
      return this.setState({ cases });
    case 'heightProx':
      cases.playerHeightProx = true;
      return this.setState({ cases });
    case 'ageProx':
      cases.playerAgeProx = true;
      return this.setState({ cases });
    case 'numberProx':
      cases.playerNumberProx = true;
      return this.setState({ cases });
    default:
      return;
    }
  }

  noMoreChances() {
    this.setState({
      playerInput: '',
      endGame: true,
     });
  }

  finishGame() {
    this.setState({
      isGameFinished: true,
      winPopUp: true,
      cases: {
        playerName: true,
        playerTeam: true,
        playerLeague: true,
        playerPosition: true,
        playerCountry: true,
        playerHeight: true,
        playerAge: true,
        playerNumber: true,
      },
    });
  }

  showListPlayers() {
    const { playerInput, allEnglandPlayers } = this.state;
    const filteredPlayers = allEnglandPlayers
      .filter((item) => item.name.includes(playerInput))
      .map((player) => player.name);
    this.setState({ nameAllEnglandPlayers: filteredPlayers });
  }

  selectPlayerFromList({ target }) {
    const playerSelected = target.innerHTML;
    this.setState({
      playerInput: playerSelected,
      nameAllEnglandPlayers: [],
    }, () => this.compareInputToPlayers());
  }

  togglePopupW() {
    const { winPopUp } = this.state;
    this.setState({ winPopUp: !winPopUp});
  }

  togglePopupNo() {
    const { endGame } = this.state;
    this.setState({ endGame: !endGame});
  }

  render() {
    const {
      playerInput,
      guessedPlayers,
      nameAllEnglandPlayers,
      winPopUp,
      dayResult,
      userAttempts,
      endGame
    } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => (<Home
          { ...props }
          playerInput={ playerInput }
          guessedPlayers={ guessedPlayers }
          nameAllEnglandPlayers={ nameAllEnglandPlayers }
          winPopUp={ winPopUp }
          dayResult={ dayResult }
          userAttempts={ userAttempts }
          endGame={ endGame }
          selectPlayerFromList={ this.selectPlayerFromList }
          onInputChange= { this.onInputChange }
          togglePopupW={ this.togglePopupW }
          togglePopupNo={ this.togglePopupNo }
          />) }
        />
        <Route path="*" component={ NotFound } />
      </Switch>
    )
  }
}

export default App;
