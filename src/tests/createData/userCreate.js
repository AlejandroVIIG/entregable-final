const User = require("../../models/User");

const userCreate = async () => {
    const newUser = await User.create(
        {
            firstName: "Fernando",
            lastName: "de Jesus",
            email: "fernando@gmail.com",
            password: "fernando1234",
            phone: "+34 54435"
        }
    );
}

module.exports = userCreate;