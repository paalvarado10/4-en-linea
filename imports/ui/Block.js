import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { withTracker } from 'meteor/react-meteor-data';
import Square from './BoardComponents/Square.js';
export default class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row1: [0,0,0,0,0,0],
      row2: [0,0,0,0,0,0],
      row3: [0,0,0,0,0,0],
      row4: [0,0,0,0,0,0],
      row5: [0,0,0,0,0,0],
      row6: [0,0,0,0,0,0],
      row7: [0,0,0,0,0,0],
      player: 1,
      winner: ""
    };
    this.setMove1=this.setMove1.bind(this);
    this.setMove2=this.setMove2.bind(this);
    this.setMove3=this.setMove3.bind(this);
    this.setMove4=this.setMove4.bind(this);
    this.setMove5=this.setMove5.bind(this);
    this.setMove6=this.setMove6.bind(this);
    this.setMove7=this.setMove7.bind(this);
    this.setPlayer=this.setPlayer.bind(this);
    this.evaluateV=this.evaluateV.bind(this);
  }
  evaluateV(){
    let m =[7];
    m[0]=this.state.row1;
    m[1]=this.state.row2;
    m[2]=this.state.row3;
    m[3]=this.state.row4;
    m[4]=this.state.row5;
    m[5]=this.state.row6;
    m[6]=this.state.row7;
    console.log(m.length);
    for (var i = 0; i < m.length; i++) {
      let x = m[i];
      let p1=0;
      let p2=0;
      let last=0;
      for (var j = 0; j < x.length; j++) {
        console.log("p1: "+p1+" p2: "+p2+" last: "+last);
        if(last===0 && x[j]!=0){
          last=x[j];
          if(x[j]===1){
            p1=1;
            p2=0;
          }
          else {
            p2=1;
            p1=0;
          }
        }
        else if(last === 1){
          if(x[j]===1){
              p1++;
              p2=0;
          }
          else if(x[j]===2){
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
          if(x[j]===2){
            p2++;
            p1=0;
          }
          else if(x[j]===1){
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
            alert("Gana el jugador P1");
            this.setState({winner: 1});
          }
          else {
            alert("Gana el jugador P2");
            this.setState({winner: 2});
          }
        }
      }
    }
    console.log(m);
  }
  //----------------------------------------------------------------------------------------------------------------------
  setMove1(){
    let row = this.state.row1;
    let player=this.state.player;
    var i;
    var find = false;
    for (i = row.length; i>=0 && !find; i--) {
      if(row[i]===0){
        row[i]=player;
        find=true;
      }
    }

    this.setState({row1:row},()=>{this.setPlayer()});
  }
  setMove2(){
    let row = this.state.row2;
    let player=this.state.player;
    var i;
    var find = false;
    for (i = row.length; i>=0 && !find; i--) {
      if(row[i]===0){
        row[i]=player;
        find=true;
      }
    }

    this.setState({row2:row},()=>{this.setPlayer()});
  }
  setMove3(){
    let row = this.state.row3;
    let player=this.state.player;
    var i;
    var find = false;
    for (i = row.length; i>=0 && !find; i--) {
      if(row[i]===0){
        row[i]=player;
        find=true;
      }
    }

    this.setState({row3:row},()=>{this.setPlayer()});
  }
  setMove4(){
    let row = this.state.row4;
    let player=this.state.player;
    var i;
    var find = false;
    for (i = row.length; i>=0 && !find; i--) {
      if(row[i]===0){
        row[i]=player;
        find=true;
      }
    }

    this.setState({row4:row},()=>{this.setPlayer()});
  }
  setMove5(){
    let row = this.state.row5;
    let player=this.state.player;
    var i;
    var find = false;
    for (i = row.length; i>=0 && !find; i--) {
      if(row[i]===0){
        row[i]=player;
        find=true;
      }
    }

    this.setState({row5:row},()=>{this.setPlayer()});
  }
  setMove6(){
    let row = this.state.row6;
    let player=this.state.player;
    var i;
    var find = false;
    for (i = row.length; i>=0 && !find; i--) {
      if(row[i]===0){
        row[i]=player;
        find=true;
      }
    }

    this.setState({row6:row},()=>{this.setPlayer()});
  }
  setMove7(){
    let row = this.state.row7;
    let player=this.state.player;
    var i;
    var find = false;
    for (i = row.length; i>=0 && !find; i--) {
      if(row[i]===0){
        row[i]=player;
        find=true;
      }
    }

    this.setState({row7:row},()=>{this.setPlayer()});
  }
//-------------------------------------------------------------------------------------------------------------
  setPlayer(){
    let player = this.state.player;
    if(player===1){
      player=2;
    }
    else{
      player=1;
    }
    console.log("CAMBIANDO JUGADOR");
    this.setState({player:player},()=>{this.evaluateV()});
  };
  //-----------------------------------------------------------------------------------------------------------
  renderR1(){
    let row1 = this.state.row1;
    let r1 = row1.map((i)=>{
      let x = Math.random();
      if(i!=0){
        return(<div key={"row1"+x} className="square">
                <h1>{i}</h1>
                </div>)
      }
      else{
      return( <div key={"row1"+x} className="square">
              <h1>{" "}</h1>
              </div>
              )
              }
    });
    return (r1);
  };
  renderR2(){
    let row2 = this.state.row2;
    let r2 = row2.map((i)=>{
      let x = Math.random();
      if(i!=0){
        return(<div key={"row2"+x} className="square">
                <h1>{i}</h1>
                </div>)
      }
      else{
      return( <div key={"row2"+x} className="square">
              <h1>{" "}</h1>
              </div>
              )
              }
    });
    return (r2);
  };
  renderR3(){
    let row3 = this.state.row3;
    let r3 = row3.map((i)=>{
      let x = Math.random();
      if(i!=0){
        return(<div key={"row3"+x} className="square">
                <h1>{i}</h1>
                </div>)
      }
      else{
      return( <div key={"row3"+x} className="square">
              <h1>{" "}</h1>
              </div>
              )
              }
    });
    return (r3);
  };
  renderR4(){
    let row4 = this.state.row4;
    let r4 = row4.map((i)=>{
      let x = Math.random();
      if(i!=0){
        return(<div key={"row4"+x} className="square">
                <h1>{i}</h1>
                </div>)
      }
      else{
      return( <div key={"row4"+x} className="square">
              <h1>{" "}</h1>
              </div>
              )
              }
    });
    return (r4);
  };
  renderR5(){
    let row5 = this.state.row5;
    let r5 = row5.map((i)=>{
      let x = Math.random();
      if(i!=0){
        return(<div key={"row5"+x} className="square">
                <h1>{i}</h1>
                </div>)
      }
      else{
      return( <div key={"row5"+x} className="square">
              <h1>{" "}</h1>
              </div>
              )
              }
    });
    return (r5);
  };
  renderR6(){
    let row6 = this.state.row6;
    let r6 = row6.map((i)=>{
      let x = Math.random();
      if(i!=0){
        return(<div key={"row6"+x} className="square">
                <h1>{i}</h1>
                </div>)
      }
      else{
      return( <div key={"row6"+x} className="square">
              <h1>{" "}</h1>
              </div>
              )
              }
    });
    return (r6);
  };
  renderR7(){
    let row7 = this.state.row7;
    let r7 = row7.map((i)=>{
      let x = Math.random();
      if(i!=0){
        return(<div key={"row7"+x} className="square">
                <h1>{i}</h1>
                </div>)
      }
      else{
      return( <div key={"row7"+x} className="square">
              <h1>{" "}</h1>
              </div>
              )
              }
    });
    return (r7);
  };
  //----------------------------------------------------------------------------------------------------------------

  render(){
    let winner= this.state.winner;
    return(
      <div className="block">
        <h2>Tablero de juego de 4 en linea</h2>
        <h2>{"Winner: "+winner}</h2>

        <div className="container">

            <div className="col-sm-1">
              <Button onClick={this.setMove1}>Play</Button>
              <div className="row">
                {this.renderR1()}
              </div>
            </div>
            <div className="col-sm-1">
              <Button onClick={this.setMove2}>Play</Button>
              <div className="row">
                {this.renderR2()}
              </div>
            </div>
            <div className="col-sm-1">
              <Button onClick={this.setMove3}>Play</Button>
              <div className="row">
                {this.renderR3()}
              </div>
            </div>
            <div className="col-sm-1">
              <Button onClick={this.setMove4}>Play</Button>
              <div className="row">
                {this.renderR4()}
              </div>
            </div>
            <div className="col-sm-1">
              <Button onClick={this.setMove5}>Play</Button>
              <div className="row">
                {this.renderR5()}
              </div>
            </div>
            <div className="col-sm-1">
              <Button onClick={this.setMove6}>Play</Button>
              <div className="row">
                {this.renderR6()}
              </div>
            </div>
            <div className="col-sm-1">
              <Button onClick={this.setMove7}>Play</Button>
              <div className="row">
                {this.renderR7()}
              </div>
            </div>
        </div>
      </div>
    );
  }
}
