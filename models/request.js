var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
    vehicle: {
        type: Schema.Types.Mixed,
        required: true
    },
    user: {
        type: Schema.Types.Mixed,
        required: true
    },
    operation: {
        type: Number,
        required: true
    },
    target: {
        type: String,
        required: true
    }
}, { collection: 'Request' });

var Request = mongoose.model('Request', RequestSchema);
module.exports = Request;