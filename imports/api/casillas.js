import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const Casillas = new Mongo.Collection('casillas');

if(Meteor.isServer)
{
	Meteor.publish("casillas", ()=>{
		return Casillas.find({});
	});	
}

Meteor.methods(
{
	"casillas.actualizarColumna":function(num, col)
	{
		Casillas.insert(
		{
			columna:col,
			numero:num
		});
	},
	"casillas.darColumna":function(num)
	{
		const columna = Casillas.findOne({
			numero:num
		});

		return columna;
	},
	"casillas.eliminarCasillas":function()
	{
		Casillas.remove({});
	}

});