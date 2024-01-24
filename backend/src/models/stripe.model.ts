import mongoose, { model, Schema } from "mongoose";

// Admin schema
export interface StripeModel {
    _id: mongoose.Types.ObjectId;
    email: string;
    amount: string; 
    is_active: string;
    updated_by: string;
}

const schema = new Schema<StripeModel>(
    {
        email: { type: String },    
        is_active: { type: String, default: 'false' },
        updated_by: { type: String }
    },
    {
        timestamps: true
    }
);


const stripeDetails = model('payment', schema);
export default stripeDetails;

