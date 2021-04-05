import './App.css';
import React, { Component } from 'react';
import AdjustButton from "./AdjustButton";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      breakLength:5,
      sessionLength:25,
      timeDisplay: "25:00",
      countType: "Session",
      counting: false,
      oneMinuteMark: false,
    }
  }
  handleDisplay(){
    var mmDisplay = this.state.sessionLength>=10?this.state.sessionLength.toString(): "0"+ this.state.sessionLength.toString()
    this.setState({
      timeDisplay: mmDisplay + ":00"
    })
  }
  handleBreakAdd(){
    if (this.state.breakLength<60 && this.state.breakLength>=0 && this.state.counting===false){
    this.setState({
      breakLength: this.state.breakLength + 1
    })}
  }
  handleBreakMinus(){
    if (this.state.breakLength<=60 && this.state.breakLength>0 && this.state.counting===false){
      this.setState({
        breakLength: this.state.breakLength -1
      })
    }
  }
  handleSessionAdd(){
    if (this.state.sessionLength<60 && this.state.sessionLength>=0 && this.state.counting===false){
      this.setState({
        sessionLength: this.state.sessionLength + 1
      },()=>{this.handleDisplay()})
    }
  }
  handleSessionMinus(){
    if (this.state.sessionLength<=60 && this.state.sessionLength>0 && this.state.counting===false){
      this.setState({
        sessionLength: this.state.sessionLength -1
      },()=>{this.handleDisplay()})
    }
  }
  startCount(){
    if(this.state.counting===false){
      this.setState({
        counting:true,
      })
      var displayArr = this.state.timeDisplay.split(":");
      let time = displayArr[0]*60*1000 + displayArr[1]*1000;
      var targetTime = new Date().getTime() + time;
      let x = setInterval(()=>{
        if(this.state.counting){
          var currentTime = new Date().getTime()
          var difference = targetTime - currentTime;
          var minutes = Math.floor(difference/60/1000)
          var seconds = Math.floor(difference%(60*1000)/1000)
          var mmDisplay = minutes>=10?minutes.toString(): "0"+ minutes.toString()
          var ssDisplay = seconds>=10?seconds.toString(): "0"+ seconds.toString()
            // handle display time
            if (difference>0){ 
            this.setState({
              timeDisplay: mmDisplay +":"+ssDisplay,
            })} else if (this.state.countType === "Session"){
              this.playAudio()
              targetTime = new Date().getTime() + this.state.breakLength*60*1000;
              this.setState({
                countType: "Break",
                oneMinuteMark:false,
              })
            } else if (this.state.countType === "Break"){
              this.playAudio()
              targetTime = new Date().getTime() + this.state.sessionLength*60*1000;
              this.setState({
                countType: "Session",
                oneMinuteMark:false,
              })
            }
            // handle display color when under 60s
            if (difference>60*1000){
              this.setState({
                oneMinuteMark:false,
              })
            } else {
              this.setState({
                oneMinuteMark:true,
              })
            }
        } else {
          clearInterval(x); // clear interval once the state of counting has been changed somewhere
        }
      },200)
    }
  }
  handleReset(){
    this.setState({
      breakLength:5,
      sessionLength:25,
      timeDisplay:"25:00",
      countType:"Session",
      counting:false,
      oneMinuteMark: false,
    })
  }
  handlePause(){
    this.setState({
      counting:false,
    })
  }
  playAudio(){
    let alarm = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
    alarm.play()
  }


  render() { 
    return ( 
      <div className="App">
      <h1 className="title">25+5 Clock</h1>
      <div className="timeControl">
        <div className="break">
          <h2>Break Length</h2>
          <AdjustButton handleAdd={this.handleBreakAdd.bind(this)} handleMinus={this.handleBreakMinus.bind(this)} display={this.state.breakLength} />
        </div>
        <div className="session">
          <h2>Session Length</h2>
          <AdjustButton handleAdd={this.handleSessionAdd.bind(this)} handleMinus={this.handleSessionMinus.bind(this)} display={this.state.sessionLength} />
        </div>
        </div>
      <div className={this.state.oneMinuteMark?"timer oneMinMark":"timer"}>
        <h3>{this.state.countType}</h3>
        <p>{this.state.timeDisplay}</p>
      </div>
      <div className="controlButton">
        <button className="play" onClick={this.startCount.bind(this)}><i class="fas fa-play"></i></button>
        <button className="stop" onClick={this.handlePause.bind(this)}><i class="fas fa-pause"></i></button>
        <button className="reset" onClick={this.handleReset.bind(this)}><i class="fas fa-redo-alt"></i></button>
      </div>
    </div>
    );
  }
}
 
export default App;