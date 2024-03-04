export const sendMessage = async(req, res, next) => {
    try {
        res.send("send message");
    } catch (error) {
        next(error);
    } 
};

export const getMessage = async(req, res, next) => {
    try {
        res.send("get message");
    } catch (error) {
        next(error);
    } 
};