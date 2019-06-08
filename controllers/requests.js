const Request = require('../models/request');
const Vehicle = require('../models/vehicle');
const ParkedVehicle = require("../models/parked-vehicle")
const User = require('../models/user');
var mongoose = require('mongoose');
var express = require('express');

function setUser(req, res) {
    return typeof req.session.passport ? req.session.user : null;
}

const Requests = {
    async createRequest(req, res) {
        let vehicleId = req.body.id;
        let target = req.body.target;
        let operation = req.body.operation;

        query = {
            "_id": vehicleId
        }

        Vehicle.findOneAndUpdate(query, {status: 1}, function (err, vehicle) {

            if (operation == 2) {
                subquery = {
                    "organization.username": target,
                    "vehicle.plate": vehicle.plate
                }
                ParkedVehicle.findOne(subquery, function (err, data) {
                    if (!err) {
                        if (data) {
                            Request.create({
                                "vehicle": vehicle,
                                "user": vehicle.user,
                                "operation": operation,
                                "target": target
                            }, (err, request) => {
                                if (!err) {
                                    res.statusCode = 200;
                                    res.end();
                                }
                            });
                        } 
                    } 
                });
            } else {
                Request.create({
                    "vehicle": vehicle,
                    "user": vehicle.user,
                    "operation": operation,
                    "target": target
                }, (err, request) => {
                    if (!err) {
                        res.statusCode = 200;
                        res.end();
                    }
                });
            }
        })
    },

    async organizationExists(req, res) {
        let username = req.body.username;

        query = {
            "username": username
        }

        User.find(query, function (err, data) {
            if (!err) {
                let result = (data.length == 0) ? false : true;
                res.status(200).json({
                    data: result
                })
            }
        });
    },
    async all(req, res) {
        let username = req.session.user.username

        query = {
            "target": username
        }

        Request.find(query, function (err, data) {
            if (!err) {
                res.render("park-requests", { user: setUser(req, res), data: data })
            }
        });
    },
    async delete(req, res) {
        query = {
            "_id": req.body.id
        }
        let operation = (req.body.operation == 2)? 2 : 0

        Request.findOneAndDelete(query, function (err, data) {
            if (!err){
                subquery = {
                    "plate": data.vehicle.plate
                }
                Vehicle.updateOne(subquery, {status: operation}, function(err, data){
                    res.status(200).send();
                })
            }
        });
    },
    async acceptIncoming(req, res) {
        query = {
            "_id": req.body.id
        }

        Request.findOne(query, function (err, data) {
            if (!err) {
                ParkedVehicle.create({
                    "organization": req.session.user,
                    "owner": data.user,
                    "vehicle": data.vehicle,
                    "time": new Date()
                }, function (err, data) {
                    if (!err) {
                        Vehicle.updateOne({ "_id": data.vehicle._id }, { "status": 2 },
                            function (err, vehicle) {
                                if (!err) {
                                    Request.deleteOne(query, function (err, data) {
                                        if (!err) {
                                            res.statusCode = 200;
                                            res.end();
                                        }
                                    });
                                }
                            }
                        );
                    }
                })
            }
        });
    }, 
    async acceptOutgoing(req, res) {
        query = {
            "_id": req.body.id
        }

        Request.findOne(query, function (err, request) {
            if (!err) {
                ParkedVehicle.deleteOne({
                    "vehicle.plate": request.vehicle.plate,
                }, function (err, data) {
                    if (!err) {
                        Vehicle.updateOne({ "_id": request.vehicle._id }, { "status": 0 },
                            function (err, vehicle) {
                                if (!err) {
                                    Request.deleteOne(query, function (err, data) {
                                        if (!err) {
                                            res.status(200).send();
                                        }
                                    });
                                }
                            }
                        );
                    }
                })
            }
        });
    }
};

module.exports = Requests;