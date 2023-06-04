import User from "../models/UserSchema.js";
import jwt from 'jsonwebtoken';

const getAuth = async (req , res , next ) => {
    try {
        const token = req.headers.token;
        if (token) {
            console.log({token: token})
        }
        const verifyToken = jwt.verify(token , process.env.SECRETKey)
        console.log(verifyToken)
        const auth = await User.findById(verifyToken.id)

        req.userId = verifyToken.id 
        req.auth = auth
        next()
    } catch (error) { 

        res.status(401).json({error: "unauthorized"})
    }
}
export default getAuth