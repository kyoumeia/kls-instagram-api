"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const editProfile_1 = __importDefault(require("./editProfile"));
const reviewHome_1 = __importDefault(require("./reviewHome"));
const createPost_1 = __importDefault(require("./createPost"));
class Account extends BaseActionClass_1.BaseActionClass {
    constructor() {
        super();
    }
    async login(input) {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        let login = new login_1.default(input);
        login.setup(bot, browser, page);
        await login.start();
        return this;
    }
    async register(input) {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        let register = new register_1.default(input);
        register.setup(bot, browser, page);
        await register.start();
        return this;
    }
    async editProfile(input) {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        let editProfile = new editProfile_1.default(input);
        editProfile.setup(bot, browser, page);
        await editProfile.start();
        return this;
    }
    async reviewHome(input) {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        let reviewHome = new reviewHome_1.default(input);
        reviewHome.setup(bot, browser, page);
        await reviewHome.start();
        return this;
    }
    async createPost(input) {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        let createPost = new createPost_1.default(input);
        createPost.setup(bot, browser, page);
        await createPost.start();
        return this;
    }
}
exports.default = Account;
//# sourceMappingURL=AccountClass.js.map