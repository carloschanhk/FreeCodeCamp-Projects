import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formulaScreen:"",
      display:"",
    }
    this.handleDisplay=this.handleDisplay.bind(this);
  }
  handleDisplay(symbol){
    if (/[=]/.test(this.state.formulaScreen)){
      switch(symbol){
        case "AC":
          this.setState({display:""})
          break
        case "=":
          break
        default:
          this.setState({display: symbol})
      }
    } else {
      switch(symbol){
        case "AC":
          this.setState({display:""})
          break
        case "/":
        case "x":
        case "-":
        case "+":
          this.setState({display: symbol})
          break
        case "=":
          this.setState({display: this.calculation(),})
          break
        default:
          if ((/[/x\-+=]/).test(this.state.display)){
            this.setState({display:symbol,})
          } else {
            this.setState({display: this.state.display.concat(symbol)})
          }
      }
  }
  }
  handleFormula(symbol){
    if (/[=]/.test(this.state.formulaScreen)){
      switch(symbol){
        case "AC":
          this.setState({formulaScreen:""})
          break
          case "/":
          case "x":
          case "+":
          case "-":
            this.setState({formulaScreen: this.state.display.concat(symbol)})
            break
          case "=":
            break
          default:
            this.setState({formulaScreen: symbol})
      }
    } else {
      switch(symbol){
        case "AC":
          this.setState({formulaScreen:""})
          break
        case "/":
        case "x":
        case "+":
          if ((this.state.formulaScreen.length === 0) || (this.state.formulaScreen.length === 1 && /[/x\-+=]$/.test(this.state.formulaScreen))){
            this.setState({formulaScreen:""})
          } else if (/[/x\-+=]$/.test(this.state.formulaScreen)){
            this.setState({formulaScreen:this.state.formulaScreen.replace(/[/x\-+=]+$/,symbol)})
          } else {
            this.setState({
              formulaScreen:this.state.formulaScreen.concat(symbol)
            })
          }
          break
        case "-":
          if (this.state.formulaScreen.length === 1 && /[/x\-+=]$/.test(this.state.formulaScreen)){
            this.setState({formulaScreen:this.state.formulaScreen.replace(/[/x\-+=]+$/,symbol)})
          }
          else if (/[/x\-+=]-$/.test(this.state.formulaScreen)){
            this.setState({formulaScreen:this.state.formulaScreen.replace(/[/x\-+=]$/,symbol)})
          } else {
            this.setState({
              formulaScreen:this.state.formulaScreen.concat(symbol)
            })
          }
          break
        case "=":
          this.setState({
            formulaScreen:this.state.formulaScreen.concat(symbol).concat(this.calculation())
          })
          break
        default:
          this.setState({
            formulaScreen:this.state.formulaScreen.concat(symbol)
          })
      }
    }
  }
  calculation(){
    const numArr = this.state.formulaScreen.split(/\+|--|(?<=\d)-(?=\d)/g)
    const plusMinorArr = this.state.formulaScreen.split(/\d+/g).filter(y=> y[0] === "+" || y[0] === "-")
    const mappedNum = numArr.map(x=>{
      const strNumber = x.split(/\/|\x/g) 
      const operatorArr = x.split(/-*\d+/g)
      let strAnswer = strNumber[0]*1
      for (var i = 1; i<operatorArr.length-1;i++){
        switch(operatorArr[i]){
          case "/":
            strAnswer /= strNumber[i]
            break
          case "x":
            strAnswer *= strNumber[i]
            break
          default:
            break
        }
      }
      return strAnswer
    });
    let result = mappedNum[0]*1;
    for (var i =0; i<plusMinorArr.length;i++){
      switch (plusMinorArr[i]){
        case "-":
          result -= mappedNum[i+1]*1
          break
        default:
          result += mappedNum[i+1]*1
      }
    }
    return result.toString()
  }
  
  render(){
    return(
    <div className="app">
      <Display formulaScreen={this.state.formulaScreen} display={this.state.display}/>
      <Numpad handleFormula={this.handleFormula.bind(this)} handleDisplay={this.handleDisplay}/>
    </div>
    );
  }
}

class Display extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render(){
    return(
    <div>
        <div className="formulaScreen">{this.props.formulaScreen}</div>
        <div className="display">{this.props.display.length>0?this.props.display:"0"}</div>
    </div>
    )
  }
}
class Numpad extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render(){
    const symbols = [{symbol:"AC",id:"clear"},{symbol:"/",id:"divide"}
,{symbol:"x",id:"multiple"},{symbol:"7",id:"seven"},{symbol:"8",id:"eight"},{symbol:"9",id:"nine"},{symbol:"-",id:"minus"},{symbol:"4",id:"four"},{symbol:"5",id:"five"},{symbol:"6",id:"six"},{symbol:"+",id:"plus"},
{symbol:"1",id:"one"},{symbol:"2",id:"two"},{symbol:"3",id:"three"},{symbol:"=",id:"equal"},
{symbol:"0",id:"zero"},{symbol:".",id:"dot"}
]
    const buttons = symbols.map(x => <PadButton key={x.id} identity={x.id} symbol={x.symbol} handleFormula={this.props.handleFormula} handleDisplay={this.props.handleDisplay}/>) 
    return(
    <div className="numpad">
      {buttons}
    </div>
    )
  }
}

class PadButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      symbol: this.props.identity
    };
  }
  render(){
    return(
        <button id={this.props.identity} 
        onClick={()=>{this.props.handleFormula(this.props.symbol);
          this.props.handleDisplay(this.props.symbol)}}>{this.props.symbol}</button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"))

export default App;
