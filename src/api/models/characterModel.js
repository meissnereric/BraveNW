const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Character = new Schema(
    {
        userId: {type: String, required: true},
        name: { type: String, required: true },
        server: {type: String, required: true},
        itemLevel: {type: Number, required: false},
        weaponLevels: {
            // one handed
            sword: {type: Number, required: false},
            rapier: {type: Number, required: false},
            hatchet: {type: Number, required: false},
            // two handed
            spear: {type: Number, required: false},
            greatAxe: {type: Number, required: false},
            warHammer: {type: Number, required: false},
            // ranged 
            bow: {type: Number, required: false},
            musket: {type: Number, required: false},
            // magic
            fireStaff: {type: Number, required: false},
            lifeStaff: {type: Number, required: false},
            iceGauntlet: {type: Number, required: false},
        }
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('Character', Character)