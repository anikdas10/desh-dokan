import { strictTransportSecurity } from "helmet";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line : {
        type: String,
        default : ""
    },
    division : {
        type : String,
        default : ""
    },
    zilla : {
        type: String,
        default : ""
    },
    upoZilla : {
        type : String,
        default : ""
    },
    union: {
        type: String,
        default: ""
    },
    postCode : {
        type: String
    },
    mobile : {
        type: Number,
        default: null
    },
    status : {
        type: Boolean,
        default : true
    }
    
},{
    timestamps: true
})

const addressModel = mongoose.model("address", addressSchema)

export default addressModel