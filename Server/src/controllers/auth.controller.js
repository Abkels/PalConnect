import { createUser, signUser } from "../services/auth.services.js"
import {generateToken, verifyToken} from "../services/token.services.js"
import createHttpError from "http-errors";
import { findUser } from "../services/user.service.js";

export const register = async (req, res, next) => {
    try {
        const {name, email,picture,status,password} = req.body;
        // console.log(req.body);
        const newUser = await createUser({
            name,
             email,
             picture,
             status,
             password
        });
        
        const access_token = await generateToken({userId: newUser._id}, "1d", process.env.ACCESS_TOKEN_SECRET);

        const refresh_token = await generateToken({userId: newUser._id}, "30d", process.env.ACCESS_TOKEN_SECRET);

        res.cookie("refreshtoken",refresh_token, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 1000, //30 days
        })

        // console.table({access_token, refresh_token});   // displays the access and refresh token in a table once there is a user

        res.json({
            message: "Registration successful",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
                access_token,
            },
        });
    } catch (error) {
        console.log("err", error);
           next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await signUser(email,password);
        const access_token = await generateToken({userId: user._id}, "1d", process.env.ACCESS_TOKEN_SECRET);

        const refresh_token = await generateToken({userId: user._id}, "30d", process.env.ACCESS_TOKEN_SECRET);

        res.cookie("refreshtoken",refresh_token, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 1000, //30 days
        })

        // console.table({access_token, refresh_token}); 

        res.json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                access_token,
            }
        });
    } catch (error) {
           next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("refreshToken", {path: "/api/v1/auth/refreshtoken"}); 
        res.json({
            message:" logged out"
        })
    } catch (error) {
           next(error);
    }
};

// export const refreshToken = async (req, res, next) => {
//     try {
//         const refresh_token = req.cookies.refreshtoken;
//         if(!refresh_token) throw createHttpError.Unauthorized('Please login');

//         const check = await verifyToken(
//             refresh_token,
//             process.env.REFRESH_TOKEN_SECRET
//         );

//         const user = await findUser(check.userId);
//         const access_token = await generateToken({userId: user._id}, "id", process.env.ACCESS_TOKEN_SECRET);

//         res.json({
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 picture: user.picture,
//                 status: user.status,
//                 access_token,
//             },
//         });

//     } catch (error) {
//            next(error);
//     }
// };

export const refreshToken = async (req, res, next) => {
    try {
      const refresh_token = req.cookies.refreshtoken;
      if (!refresh_token) throw createHttpError.Unauthorized("Please login.");
      const check = await verifyToken(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await findUser(check.userId);
      const access_token = await generateToken(
        { userId: user._id },
        "1d",
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          status: user.status,
          token: access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  