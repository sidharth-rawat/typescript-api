import { Document, model, Schema } from 'mongoose';
import { z} from 'zod';
import { isEmail , isPhone}  from '../util';

export type _Login = z.infer<typeof dataValidator >


export interface ILogin extends Document, _Login {} 


export const dataValidator = z.object({
    firstName: z.string().min(2).max(50).trim(),
    lastName: z.string().optional(),
    email: z.string().email().trim(),
    phone: z.string().min(2).max(10),
    isDeleted: z.boolean().default(false).optional()
})

const LoginSchema = new Schema<ILogin>({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: 2,
        maxlength: 50,
    },
    lastName:{
        type: String,
        required: false,
        lowercase: true,
        trim: true,
        default: "",
    },
    email:{
        type: String,
        required: false,
        trim: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    }
    ,
    phone: {
        type: String,
        required: true,
        unique: true,
        validate : [isPhone, 'Please enter a valid email']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
    versionKey:false
})

// this is advance DB helper functions. 
// please use them wisely.

export const Login = model<ILogin>("Login", LoginSchema);
