const Vehicle = require('../models/vehicle');
const ParkedVehicle = require("../models/parked-vehicle")
var mongoose = require('mongoose');
var express = require('express');
const passport = require('passport');

function setUser(req, res) {
    return typeof req.session.passport ? req.session.user : null;
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

const Vehicles = {
    async registerVehicle(req, res) {
        Vehicle.create({
            name: req.body.name,
            user: req.session.user,
            vehicleType: req.body.vehicle_type,
            description: req.body.description,
            plate: req.body.plate,
            status: 0
        }, (err, vehicle) => {
            res.statusCode = 200;
            res.redirect("my-vehicles")
        });
    },
    async getUserVehicles(req, res) {
        query = {
            "user": req.session.user
        }

        Vehicle.find(query, function (err, data) {
            res.render('my-vehicles', { data: data, user: setUser(req, res) });
        });
    },
    async deleteVehicle(req, res) {
        let query = {
            "_id": req.body.id
        }

        Vehicle.deleteOne(query, function (err, data) {
            res.status(200).send();
        });
    },
    async getParkedVehicles(req, res) {
        let query = {
            "organization": req.session.user
        }

        ParkedVehicle.find(query, function (err, data) {
            if (!err) {
                let result = data.map(item => {
                    let park_time = item.time.getTime();
                    let curr_time = (new Date()).getTime();
                    let time_diff = Math.abs(curr_time - park_time);
                    
                    item.duration = msToTime(time_diff);
                    return item;
                })
                // data.time = Math.floor(Math.abs((new Date()).getTime() - data.time.getTime())/1000*60*60)
                res.render('parked-vehicles', { data: result, user: setUser(req, res) });
            }
        });
    }
};

module.exports = Vehicles;