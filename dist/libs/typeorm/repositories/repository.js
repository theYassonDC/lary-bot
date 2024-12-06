"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUser = getUser;
const connect_1 = require("../connect");
const Users_1 = require("../entities/users/Users");
const userRepository = connect_1.AppDataSource.getRepository(Users_1.Users);
function createUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newuser = new Users_1.Users();
            newuser.user_id = id;
            newuser.reputation = 1000;
            yield userRepository.save(newuser);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function updateUser(id, type, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userRepository.findOne({ where: { user_id: id } });
            if (!user) {
                return 'user is null';
            }
            if (type === "add") {
                user.reputation += amount;
                yield userRepository.save(user);
            }
            else if (type === "remove") {
                user.reputation -= amount;
                yield userRepository.save(user);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userRepository.findOne({ where: { user_id: id } });
            if (!user) {
                return false;
            }
            return user;
        }
        catch (error) {
            console.log(error);
        }
    });
}
