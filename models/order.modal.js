import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref:"User"
    },
    orderId : {
        type: String,
        required : [true , "Provide OrderId"],
        unique: true
    },
    product_id : {
        type: mongoose.Schema.ObjectId,
        ref: "product"
    },
    product_details : {
        name : String,
        image: String,
    },
    paymentId : {
        type : String,
        default : ""
    },
    payment_status : {
        type: String,
        default: ""
    },
    delivery_address : {
        type: mongoose.Schema.ObjectId,
        ref: "address"
    },
    subtotalAmt : {
        type : Number,
        default: 0
    },
    totalAmt : {
        type : Number,
        default : 0
    },
    invoice_receipt : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})


const orderModel = mongoose.model("order", orderSchema);
export default orderModel