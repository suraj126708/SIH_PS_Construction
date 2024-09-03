import mongoose,{Schema} from 'mongoose';

const complaintSchema = new Schema({
    latitude:{
        type:Number,
    },
    longitude:{
        type:Number,
    },
    photo:{
        type:String,
    },
    complaint:{
        type:String,
    }
    },
);

export const Complaint = mongoose.model('Complaint', complaintSchema);