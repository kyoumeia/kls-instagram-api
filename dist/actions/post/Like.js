"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
class LikeAction extends BaseActionClass_1.BaseSubActionClass {
    constructor(input) {
        super(); // --> it's important
        this.actionName = "LikePost";
        this.input = input;
    }
    async start() {
        try {
            let bot = this.bot;
            let browser = this.browser;
            let page = this.page;
            let input = this.input;
            let postElement = this.input.element;
            if (!postElement)
                throw new Error("element as input of post.like() method is not set.");
            await postElement.dblclick();
            this.completeLog();
        }
        catch (e) {
            this.errorLog(e);
        }
    }
}
exports.default = LikeAction;
//# sourceMappingURL=Like.js.map