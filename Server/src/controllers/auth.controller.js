import { createUser, signUser } from "../services/auth.services.js"
import {generateToken} from "../services/token.services.js"


export const register = async (req, res, next) => {
    try {
        const {name, email,picture,status,password} = req.body;
        const newUser = await createUser({
            name,
             email,
             picture,
             status,
             password
        });
        
        const access_token = await generateToken({userId: newUser._id}, "id", process.env.ACCESS_TOKEN_SECRET);

        const refresh_token = await generateToken({userId: newUser._id}, "30d", process.env.ACCESS_TOKEN_SECRET);

        res.cookie("refreshtoken",refresh_token, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 1000, //30 days
        })

        // console.table({access_token, refresh_token});   // displays the access and refresh token in a table once there is a user

        res.json({
            message: "Registrattion successful",
            user: {
                access_token,
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
            }
        });
    } catch (error) {
           next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await signUser(email,password);
        const access_token = await generateToken({userId: user._id}, "id", process.env.ACCESS_TOKEN_SECRET);

        const refresh_token = await generateToken({userId: user._id}, "30d", process.env.ACCESS_TOKEN_SECRET);

        res.cookie("refreshtoken",refresh_token, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 1000, //30 days
        })

        // console.table({access_token, refresh_token}); 

        res.json({
            message: "Login successful",
            access_token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
            }
        });
    } catch (error) {
           next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        
    } catch (error) {
           next(error);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        
    } catch (error) {
           next(error);
    }
};