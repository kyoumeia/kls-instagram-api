"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
const LoadPage_1 = __importDefault(require("./LoadPage"));
const Follow_1 = __importDefault(require("./Follow"));
class InstaPage extends BaseActionClass_1.BaseActionClass {
    constructor() {
        super();
        this.isLoaded = false;
    }
    async loadPage(pageName) {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        let LoadPageActionObj = new LoadPage_1.default({ pageName });
        LoadPageActionObj.setup(bot, browser, page);
        await LoadPageActionObj.start();
        if (LoadPageActionObj.isLoadSuccessfully()) {
            let pageInfo = await LoadPageActionObj.getInfo();
            this.isLoaded = true;
            this.fullName = pageInfo.fullName;
            this.isPrivate = pageInfo.isPrivate;
            this.isInMyfollowing = pageInfo.isInMyfollowing;
            this.postCount = pageInfo.postCount;
            this.followerCount = pageInfo.followerCount;
            this.followingCount = pageInfo.followingCount;
        }
        return this;
    }
    async Follow(pageName) {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        if (this.isLoaded == false)
            await this.loadPage(pageName);
        let FollowActionObj = new Follow_1.default({ pageName });
        FollowActionObj.setup(bot, browser, page);
        await FollowActionObj.start();
        return this;
    }
}
exports.default = InstaPage;
//# sourceMappingURL=PageClass.js.map