"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepo = getRepo;
const connect_1 = require("../connect");
async function getRepo(file) {
    return connect_1.AppDataSource.getRepository(file);
}
