const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineCommandeSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'productType'
    },
    title:{
        type:String,
    },
    productType: {
        type: String,
        
        enum: ['Shoes', 'Watch']
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const LineCommande = mongoose.model('LineCommande', lineCommandeSchema);
module.exports = LineCommande;
