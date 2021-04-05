
import './App.css';
import React from 'react';
import Drumpad from "./Drumpad"


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      power:false,
      buttonName:"",
      volume: 0.3,
      display:"",
      bank: "Heater Kit", //true or false to represent the two banks array in Drumpad

    }
    this.powerSwitch = this.powerSwitch.bind(this)
    this.bankSwitch = this.bankSwitch.bind(this)
    this.clearDisplay = this.clearDisplay.bind(this)
  }
  powerSwitch() {
    return this.setState({
      power:!this.state.power
    })
  }
  setButtonName(audioId){
    return this.setState({
      display:audioId
    })
  }
  setVolume(e){
    this.setState({
      volume: e.target.value,
      display: "Volume: " + Math.round(e.target.value * 100)
    });
    setTimeout(this.clearDisplay, 1000)
  }
  bankSwitch(){
    return this.setState({
      bank:this.state.bank === "Heater Kit"? "Smooth Piano Kit": "Heater Kit",
      display: this.state.bank === "Heater Kit"? "Smooth Piano Kit": "Heater Kit"
    })
  }
  clearDisplay() {
    this.setState({
      display: ""});
    }
  render() { 
    return ( 
      <div className="app">
        <Drumpad setButtonName={this.setButtonName.bind(this)} bank={this.state.bank} power={this.state.power} volume={this.state.volume}/>
        <div className="controlpanel text-center">
          <div className="powerbutton">
            <p>Power</p>
            <label class="switch">
              <input type="checkbox" onChange={this.powerSwitch} />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="display">
              <p>{this.state.display}</p>
          </div>
          <div className="volumeadjust">
            <input onChange={this.setVolume.bind(this)} max="1" min="0" step="0.01" type="range" value={this.state.volume} />
          </div>
          <div className="bankbutton">
          <p>Bank</p>
            <label class="switch">
              <input type="checkbox" onChange={this.bankSwitch} />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
     );
  }
}
 
export default App;