import jwt from "jsonwebtoken";
import User from "../model/user.model";

const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({success: false, message: "Wrong Token" });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({success: false, message: "No user" });
        }
        const newUser = {name: user.name,id: user._id};
        req.user = newUser;
        next();
    } catch (error) {
        res.status(500).json({ message: "Please Login first" });
    }
}

export default middleware