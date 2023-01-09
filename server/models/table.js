import { Schema, model } from "mongoose";

const tableSchema = new Schema({
    tableNumber:Number,
    occupied: Boolean,
    occupiedBy: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
})

const Table = model('table',tableSchema);

export default Table;