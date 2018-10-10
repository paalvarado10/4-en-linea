import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const Records = new Mongo.Collection('records');

if(Meteor.isServer)
{
	Meteor.publish("records", ()=>{
		return Records.find({});
	});
}

Meteor.methods(

{
	"records.nuevoGanador":function(player1, player2, winner)
	{
    console.log("HEY");
		 Records.insert({
			player1:player1,
      player2:player2,
      winner:winner
		});
    return true;
	},
	"records.getGanadores":function()
	{
    	return Records.find({});
	}
});
