'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

var cardSchema = Schema( {
    name: Number,
    summary: String,
    limit: Number,
    PropertyType: String,
    RoomType: String,
    MinNights: Number,
    MaxNights: Number,
} );

module.exports = mongoose.model( 'Card', cardSchema );