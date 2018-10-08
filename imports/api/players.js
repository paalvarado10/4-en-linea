import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const Players = new Mongo.Collection('players');

if(Meteor.isServer)
{
	Meteor.publish("players", ()=>{
		return Players.find({});
	});	
}

Meteor.methods(
{
	"players.add":function(name){
		const pl = Players.findOne({
    	name:Meteor.user().username
	  });

	  if(!pl)
	  {
	      Players.insert({name:Meteor.user().username});
	      this.setState({
	      player: Meteor.user().username
	      });
	  }
	  else
	  {
	    alert("Ya estas inscrito, selecciona tu oponente");
	  }
	}
});

