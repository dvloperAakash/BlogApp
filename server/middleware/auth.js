import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const auth = async (req,res,next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length<500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,SECRET_KEY);
            req.userId = decodedData?.id;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
export default auth;