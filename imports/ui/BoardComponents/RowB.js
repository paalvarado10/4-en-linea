import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { withTracker } from 'meteor/react-meteor-data';
import Square from './Square.js';
export default class RowB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: [0,0,0,0,0,0],
      winner: ""
    };
    this.setMove=this.setMove.bind(this);
    this.evaluateV=this.evaluateV.bind(this);
  }
  evaluateV(){
    let m =this.state.row;
      let p1=0;
      let p2=0;
      let last=0;
      for (var j = 0; j < m.length; j++) {
        if(last===0 && m[j]!=0){
          last=m[j];
          if(m[j]===1){
            p1=1;
            p2=0;
          }
          else {
            p2=1;
            p1=0;
          }
        }
        else if(last === 1){
          if(m[j]===1){
              p1++;
              p2=0;
          }
          else if(m[j]===2){
            p1=0;
            last=2;
            p2++;
          }
          else {
            p1=0;
            p2=0;
            last=0;
          }
        }
        else if(last === 2){
          if(m[j]===2){
            p2++;
            p1=0;
          }
          else if(m[j]===1){
            p2=0;
            p1++;
            last=1;
          }
          else {
            p1=0;
            p2=0;
            last=0;
          }
        }
        if(p1===4 || p2===4){
          if(p1===4){
            this.setState({winner: 1});
          }
          else {
            this.setState({winner: 2});
          }
        }
    }

    this.props.setMove(this.state.row, this.state.winner);
  }
  //----------------------------------------------------------------------------------------------------------------------
  setMove(){
    let row = this.state.row;
    let player=this.props.player;
    var i;
    var find = false;
    for (i = row.length; i>=0 && !find; i--) {
      if(row[i]===0){
        row[i]=player;
        find=true;
      }
    }

    this.setState({row:row},()=>{this.evaluateV()});
  }
  renderR(){
    let row = this.state.row;
    let r = row.map((i)=>{
      let x = Math.random();
      if(i!=0){
        return(<div key={"row"+x} className="square">
                <h1>{i}</h1>
                </div>)
      }
      else{
      return( <div key={"row"+x} className="square">
              <h1>{" "}</h1>
              </div>
            )
          }
    });
    return (r);
  };
  render(){

    return(
            <div className="col-sm-1">
              <Button onClick={this.setMove}>↓</Button>
              <p>
              </p>
              <div className="row">
                {this.renderR()}
              </div>
            </div>
    );
  }
}