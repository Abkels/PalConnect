import createHttpError from "http-errors";
import logger from "../config/logger.config.js";
import { searchUsers  as searchUserService} from "../services/user.service.js";

export const searchUsers = async(req, res, next) => {
    try {
        const keyword = req.query.search;
        if(!keyword) {
            logger.error("Please add a search query first");
            throw createHttpError.BadRequest("Please add a search term first");
        }
        const users = await searchUserService(keyword, req.user.userId);
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}