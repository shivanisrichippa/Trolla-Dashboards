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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
// Accessing MongoDB URI and JWT Secret from .env
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
if (!mongoUri) {
    console.error('MongoDB URI not provided in environment variables');
    process.exit(1);
}
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    // Check if MongoDB is already connected
    if (mongoose_1.default.connection.readyState) {
        return; // Already connected
    }
    // Connect to MongoDB (No need for `useNewUrlParser` and `useUnifiedTopology`)
    try {
        yield mongoose_1.default.connect(mongoUri);
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
});
exports.default = connectDb;
