import mongoose,{Schema} from 'mongoose';

const constructorSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    projects:{
        type:Object,
        required:true,
    }
    },
);

export const Constructor = mongoose.model('Constructor', constructorSchema);