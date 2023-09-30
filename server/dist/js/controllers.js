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
exports.increaseCounter = exports.createUser = exports.getCounters = void 0;
const counters = {};
const getCounters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ counters });
    }
    catch (error) {
        throw error;
    }
});
exports.getCounters = getCounters;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        counters[username] = counters[username] || 0;
        res.status(200).json({ username });
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const increaseCounter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        counters[username] += 1;
        res.status(200).json({ counters });
    }
    catch (error) {
        throw error;
    }
});
exports.increaseCounter = increaseCounter;
