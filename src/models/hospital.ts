import {Schema, model, Document } from 'mongoose';

const HospitalSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
})

interface IHospitalSchema extends Document {
    name: string;
    createDate: Date;
    updateDate: Date;
}

export default model<IHospitalSchema>('Hospital', HospitalSchema);