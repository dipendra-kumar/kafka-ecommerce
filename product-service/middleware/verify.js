const jwt = require("jsonwebtoken")


const verifyUser = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) return res.status(401).json({ error: "Authorization required!" })
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded._id) {
            throw new Error
        }
        req.user = decoded._id
        next()

    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })

    }
}

module.exports = verifyUser;