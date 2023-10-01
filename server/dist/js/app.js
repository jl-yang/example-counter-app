"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./error/errorHandler");
const config_1 = __importDefault(require("./bootstrap/config"));
const logger_1 = require("./logging/logger");
const users_1 = require("./services/routes/users");
const counters_1 = require("./services/routes/counters");
const app = (0, express_1.default)();
const port = config_1.default.port;
app
    .use(express_1.default.json())
    .options('*', (0, cors_1.default)({
    optionsSuccessStatus: 200,
}))
    .use((0, cors_1.default)())
    .use('/api/users', users_1.userRoutes)
    .use('/api/counters', counters_1.counterRoutes)
    .use(errorHandler_1.errorHandler)
    .listen(port, () => logger_1.logger.info(`Started server at port ${port}`));
