const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 


const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true 
    },
    email :{
        type: String, 
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true,
        select:false 
    },
    role:{
        type:String,
        enum:['user','guide','lead-guide','admin'], 
        default:'user' 
    }
})


userSchema.pre('save', async function(next){


    password = this.password 
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword 
    next() 
})
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema);
module.exports = User;

