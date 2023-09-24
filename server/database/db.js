import mongoose from "mongoose";

export const Connection =async(username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@cluster0.7oxfi4j.mongodb.net/?retryWrites=true&w=majority;`
    try{
       await mongoose.connect(URL,{useUnifiedTopology: true, useNewUrlParser:true , w: 'majority'});
       console.log("Databae Connected Successfully");

    }
    catch(error){
        console.log("Error while connecting",error.message);
    }
}
export default Connection;