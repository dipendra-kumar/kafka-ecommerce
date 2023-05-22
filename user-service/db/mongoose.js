const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
}).then(console.log("User Database connected!")).catch(error => console.log(error))
