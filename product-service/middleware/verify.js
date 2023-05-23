const jwt = require("jsonwebtoken")


const verifyUser = async (req, res, next) => {


    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        console.log(process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        if (!decoded._id) {
            throw new Error
        }
        next()
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })

    }
}

module.exports = verifyUser;