const User = require('../models/user')

const isAdmin = async (userId) => {
    const check = await User.findById(userId)
    if (!check) {
        return false;
    }
    return true;
}

module.exports = isAdmin;