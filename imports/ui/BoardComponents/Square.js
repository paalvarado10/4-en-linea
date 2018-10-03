import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Square.css';
export default class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 0,
      x:this.props.x,
      y:this.props.y

    };
    this.setMove=this.setMove.bind(this);
  }
  setMove(i){
    this.setState({player:i});
  }
  getPlayer(){
    //this.props.getPlayer(this.state.player);
  }
  render() {
    let player = this.state.player;
    if(player!=0){
    return (
      <div className="square">
        <h1>
          {this.state.x+" "+this.state.y}
        </h1>

      </div>
    );
    }
    else{
    return (
      <div className="square">
        <h1>{this.state.x+" "+this.state.y}</h1>
      </div>
    );
    }
  }
}
