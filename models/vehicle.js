var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var VehicleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.Mixed,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, { collection : 'Vehicle' });

var Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;