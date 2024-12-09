"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUser = getUser;
exports.getUsers = getUsers;
const connect_1 = require("../connect");
const Users_1 = require("../entities/users/Users");
const userRepository = connect_1.AppDataSource.getRepository(Users_1.Users);
async function createUser(id) {
    try {
        const newuser = new Users_1.Users();
        newuser.user_id = id;
        newuser.reputation = 1000;
        await userRepository.save(newuser);
    }
    catch (error) {
        console.log(error);
    }
}
async function updateUser(id, type, amount) {
    try {
        const user = await userRepository.findOne({ where: { user_id: id } });
        if (!user) {
            return 'user is null';
        }
        if (type === "add") {
            user.reputation += amount;
            await userRepository.save(user);
        }
        else if (type === "remove") {
            user.reputation -= amount;
            await userRepository.save(user);
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function getUser(id) {
    try {
        const user = await userRepository.findOne({ where: { user_id: id } });
        if (!user) {
            return false;
        }
        return user;
    }
    catch (error) {
        console.log(error);
    }
}
async function getUsers() {
    try {
        const users = await userRepository.find();
        if (!users) {
            return false;
        }
        return users;
    }
    catch (error) {
        console.log(error);
    }
}
