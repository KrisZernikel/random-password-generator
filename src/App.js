import React, { useEffect, useState } from 'react';
import './App.css';
import '@material/slider/dist/mdc.slider.min.css';
import "@material/react-checkbox/dist/checkbox.min.css";
import Checkbox from '@material/react-checkbox';
import { MDCSlider } from '@material/slider';
import generate from 'nanoid/generate';

const pwConfig = {
  all: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-!@#$%^&*()\\/'[]{}~.?",
  digits: "0123456789",
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  symbols: "_-!@#$%^&*()\\/'[]{}~.?"
};

function RenewIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

function Slider() {
  return (
    <div
      style={{
        width: "300px"
      }}
      className="mdc-slider mdc-slider--discrete"
      tabIndex="0" role="slider"
      aria-valuemin="4"
      aria-valuemax="28"
      aria-valuenow="10"
      aria-label="Select Value"
    >
      <div className="mdc-slider__track-container">
        <div className="mdc-slider__track"></div>
      </div>
      <div className="mdc-slider__thumb-container">
        <div className="mdc-slider__pin">
          <span className="mdc-slider__pin-value-marker"></span>
        </div>
        <svg className="mdc-slider__thumb" width="21" height="21">
          <circle cx="10.5" cy="10.5" r="7.875"></circle>
        </svg>
        <div className="mdc-slider__focus-ring"></div>
      </div>
    </div>
  );
}

function App() {
  const [pwLength, setPwLength] = useState(10);
  const [preference, setPreference] = useState({
    letters: true,
    digits: true,
    symbols: true
  });


  useEffect(() => {
    const slider = new MDCSlider(document.querySelector('.mdc-slider'));
    slider.listen('MDCSlider:change', () => setPwLength(slider.value));
  });

  const { letters, digits, symbols } = preference;
  return (
    <div className="App">
      <div style={{ width: "300px", position: "relative" }}>
        <div>
          <h1
            style={{
              textAlign: "center"
            }}
          >Random Password Generator</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 0",
              borderBottom: "1px solid #000",
              position: "relative"
            }}
          >
            <p>{
              letters && digits && symbols ? (
                generate(pwConfig.all, pwLength)
              ) : letters && digits ? (
                generate(pwConfig.letters.concat(pwConfig.digits), pwLength)
              ) : letters && symbols ? (
                generate(pwConfig.letters.concat(pwConfig.symbols), pwLength)
              ) : digits && symbols ? (
                generate(pwConfig.digits.concat(pwConfig.symbols), pwLength)
              ) : letters ? (
                generate(pwConfig.letters, pwLength)
              ) : digits ? (
                generate(pwConfig.digits, pwLength)
              ) : symbols ? (
                generate(pwConfig.symbols, pwLength)
              ) : null
            }</p>
            <button
              className="renew-button"
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => setPreference({...preference})}
            ><RenewIcon /></button>
          </div>
        </div>
        <div
          style={{
            display: "flex"
          }}
        >
          <p
            style={{
              margin: "0px",
              paddingRight: "8px",
              lineHeight: "48px"
            }}
          >4</p>
          <Slider />
          <p
            style={{
              margin: "0px",
              paddingLeft: "8px",
              lineHeight: "48px"
            }}
          >28</p>
        </div>
        <hr />
        <div>
          <div
            style={{
              height: "40px",
              lineHeight: "40px"
            }}
          >
            <Checkbox
              nativeControlId="letters"
              checked={preference.letters}
              onChange={() => setPreference({
                ...preference,
                letters: !preference.letters,
              })
              }
            />
            <label htmlFor="letters">Letters</label>
          </div>
          <div
            style={{
              height: "40px",
              lineHeight: "40px"
            }}
          >
            <Checkbox
              nativeControlId="digits"
              checked={preference.digits}
              onChange={() => setPreference({
                ...preference,
                digits: !preference.digits,
              })
              }
            />
            <label htmlFor="digits">Digits</label>
          </div>
          <div
            style={{
              height: "40px",
              lineHeight: "40px"
            }}
          >
            <Checkbox
              nativeControlId="symbols"
              checked={preference.symbols}
              onChange={() => setPreference({
                ...preference,
                symbols: !preference.symbols,
              })
              }
            />
            <label htmlFor="symbols">Symbols</label>
          </div>
        </div>
        <p style={{ display: "flex", justifyContent: "center" }}>Created by&nbsp;<b>Kris Zernikel</b></p>
      </div>
    </div>
  );
}

export default App;
