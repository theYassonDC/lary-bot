var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AppDataSource } from "../connect";
import { Users } from "../entities/users/Users";
const userRepository = AppDataSource.getRepository(Users);
export function createUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newuser = new Users();
            newuser.user_id = id;
            newuser.reputation = 1000;
            yield userRepository.save(newuser);
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function updateUser(id, type, amount) {
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
export function getUser(id) {
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
