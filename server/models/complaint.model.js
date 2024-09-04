import mongoose,{Schema} from 'mongoose';

const complaintSchema = new Schema({
    location:{
        type:Object,
    },
    image:{
        type:String,
    },
    complaint:{
        type:String,
    }
    },
);

export const Complaint = mongoose.model('Complaint', complaintSchema);