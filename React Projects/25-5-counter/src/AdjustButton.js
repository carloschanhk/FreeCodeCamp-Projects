import React, { Component } from 'react';

class AdjustButton extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
      }
    render() { 
        return (
            <div>
                <button onClick={this.props.handleAdd}><i class="fas fa-arrow-up"></i></button>
                <span>{this.props.display}</span>
                <button onClick={this.props.handleMinus}><i class="fas fa-arrow-down"></i></button>
            </div>
        );
    }
}
 
export default AdjustButton;