import React, { Component } from 'react';

class DrumButton extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
        this.playMusic = this.playMusic.bind(this);
        document.addEventListener("keydown",e => {
            if (e.key.toUpperCase() === this.props.trigger){
                this.playMusic();
                this.props.setButtonName(this.props.id);
            }
            })
    }
    playMusic(){
        if (this.props.power){
            var music = new Audio(this.props.url);
        music.volume = this.props.volume
        music.play()
        }
    }

    
    render() { 

        return ( 
            <button className="drumbutton btn btn-default btn-outline-dark" onClick={() => {
                this.playMusic();
                this.props.setButtonName(this.props.id);
            }}>
                <p>{this.props.trigger}</p>
            </button>
         );
    }
}
 
export default DrumButton;