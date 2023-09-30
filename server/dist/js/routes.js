"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
router.post('/login', controllers_1.createUser);
router.get('/counters', controllers_1.getCounters);
router.put('/counters/:username', controllers_1.increaseCounter);
exports.default = router;
