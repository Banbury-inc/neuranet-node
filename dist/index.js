"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.neuranet = void 0;
const device = __importStar(require("./device"));
const handlers = __importStar(require("./handlers"));
const networking = __importStar(require("./networking"));
const sessions = __importStar(require("./sessions"));
const types = __importStar(require("./types"));
const utils = __importStar(require("./utils"));
const devices = __importStar(require("./devices"));
const files = __importStar(require("./files"));
/**
 * The main entry point for the neuranet library.
 */
exports.neuranet = {
    device,
    handlers,
    networking,
    sessions,
    types,
    utils,
    devices,
    files,
};
