var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParkedVehicleSchema = new Schema({
    organization: {
        type: Schema.Types.Mixed,
        required: true
    },
    owner: {
        type: Schema.Types.Mixed,
        required: true
    },
    vehicle: {
        type: Schema.Types.Mixed,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, { collection: 'ParkedVehicle' });

var ParkedVehicle = mongoose.model('ParkedVehicle', ParkedVehicleSchema);
module.exports = ParkedVehicle;