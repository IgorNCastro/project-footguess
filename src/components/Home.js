import React from 'react';
import '../App.css';
import PopupCp from './PopupCp';
import PopupW from './PopupW';
import PopupNoChances from './PopupNoChances';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  togglePopup = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen});
  }

  render() {
    const { isOpen } = this.state;
    const {
      playerInput,
      onInputChange,
      guessedPlayers,
      nameAllEnglandPlayers,
      selectPlayerFromList,
      winPopUp,
      togglePopupW,
      dayResult,
      userAttempts,
      endGame,
      togglePopupNo
    } = this.props;
    return (
      <main>
        <header>
          <nav>
            <div>
              <button
                type="button"
                onClick={ this.togglePopup }
              >
                HOW TO PLAY
              </button>
              {isOpen && <PopupCp
                content={<>
                  <h3>This is how you play...</h3>
                  <ul className="list-how">
                    <li>
                      Discover the Premier League player in no more than six guesses
                    </li>
                    <li>
                      If you get <span className="right-guess">GREEN</span> in any column it indicates a match
                    </li>
                    <li>
                      If you get <span className="close-guess">YELLOW</span> in the country column it indicates that the mystery player is from the same continent, but not the same country
                    </li>
                    <li>
                      If you get <span className="close-guess">YELLOW</span> in the height column it indicates that the mystery player is at least 2cm taller or short
                    </li>
                    <li>
                      If you get <span className="close-guess">YELLOW</span> in the age column it indicates that the mystery player is at least 2 years younger or older
                    </li>
                    <li>
                      And if you get <span className="close-guess">YELLOW</span> in the jersey column it indicates that the mystery player jersey number is at least 2 numbers above or bellow
                    </li>
                  </ul>
                  <h3>Good luck</h3>
                  <button
                    onClick={ this.togglePopup }
                  >
                    Got it!
                  </button>
                </>}
                handleClose={ this.togglePopup }
              />}
              {winPopUp && <PopupW
                content={<>
                  <h2>Congratulations</h2>
                  <h3>Today's mystery player is...</h3>
                  <h2>{ dayResult.name }</h2>
                  <img src={ dayResult.photo } alt={ dayResult.name } />
                  <h3>You solved it in {userAttempts} guesses!</h3>
                  <button
                    onClick={ togglePopupW }
                  >
                    Close
                  </button>
                </>}
                handleClose={ togglePopupW }
              />}
              {endGame && <PopupNoChances
                content={<>
                  <h2>Sorry!</h2>
                  <h3>You used your SIX chances</h3>
                  <h3>Come back tomorrow to try again with another mystery player</h3>
                  <img
                    src="https://i.pinimg.com/originals/1d/90/14/1d901474a4fe251860914420959c551c.gif"
                    alt="FAIL GIF"
                  />
                  <br />
                  <button
                    onClick={ togglePopupNo }
                  >
                    Close
                  </button>
                </>}
                handleClose={ togglePopupNo }
              />}
            </div>
          </nav>
        </header>
        <section>
          <h1 id="title">FOOTGUESS</h1>
          <h4>Find out who the mystery player is</h4>
          <input
            className="input-name"
            type="text"
            name="playerInput"
            placeholder="Guess the player"
            value={ playerInput }
            onChange={ onInputChange }
          />
          <ul className="input-list">
            { nameAllEnglandPlayers.map((player) => (
              <li
                key={ player }
                onClick={ selectPlayerFromList }
              >
                { player }
              </li>
            ))}
          </ul>
        </section>
        <table className='game-input'>
          <thead>
            <tr className="player-input">
              <th className="info-row"></th>
              <th className="info-row">NAME</th>
              <th className="info-row">TEAM</th>
              <th className="info-row">LEAGUE</th>
              <th className="info-row">POSITION</th>
              <th className="info-row">COUNTRY</th>
              <th className="info-row">HEIGHT</th>
              <th className="info-row">AGE</th>
              <th className="info-row">JERSEY</th>
            </tr>
          </thead>
          <tbody>
            {guessedPlayers.map((player) => (
            <tr key={ player.id } className="player-input">
              {player.playerName ?
              <><img src={ player.photo } alt={ player.name } className="info-row right-guess" /></>
              : <><img src={ player.photo } alt={ player.name } className="info-row" /></>}
              {player.playerName ?
              <td className="info-row right-guess">{ player.name }</td>
              : <td className="info-row">{ player.name }</td>}
              {player.playerTeam ?
              <td className="info-row right-guess">{ player.team }</td>
              : <td className="info-row">{ player.team }</td>}
              {player.playerLeague ?
              <td className="info-row right-guess">{ player.league }</td>
              : <td className="info-row">{ player.league }</td>}
              {player.playerPosition ?
              <td className="info-row right-guess">{ player.position }</td>
              : <td className="info-row">{ player.position }</td>}
              {player.playerCountry ?
              <td className="info-row right-guess">{ player.country }</td>
              : (player.playerRegion ?
              <td className="info-row close-guess">{ player.country }</td>
              : <td className="info-row">{ player.country }</td>)}
              {player.playerHeight ?
              <td className="info-row right-guess">{ player.height }cm</td>
              : (player.playerHeightProx ?
              <td className="info-row close-guess">{ player.height }cm</td>
              : <td className="info-row">{ player.height }cm</td>)}
              {player.playerAge ?
              <td className="info-row right-guess">{ player.age }</td>
              : (player.playerAgeProx ?
              <td className="info-row close-guess">{ player.age }</td>
              : <td className="info-row">{ player.age }</td>)}
              {player.playerNumber?
              <td className="info-row right-guess">#{ player.number }</td>
              : (player.playerNumberProx ?
              <td className="info-row close-guess">#{ player.number }</td>
              : <td className="info-row">#{ player.number }</td>)}
            </tr>))}
          </tbody>
        </table>
        <section className='footer'>
          <footer></footer>
        </section>
      </main>
    )
  }
}

export default Home;
