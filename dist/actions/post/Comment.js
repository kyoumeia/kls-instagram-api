"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
class CommentAction extends BaseActionClass_1.BaseSubActionClass {
    constructor(input) {
        super(); // --> it's important
        this.actionName = "CommentPost";
        this.input = input;
    }
    async start(commentText) {
        try {
            let bot = this.bot;
            let browser = this.browser;
            let page = this.page;
            let input = this.input;
            let postElement = this.input.element;
            if (!postElement)
                throw new Error("element as input of post.Comment() method is not set.");
            let commentTextInput = await postElement?.locator('textarea');
            if (commentTextInput && await commentTextInput.count()) {
                this.setLog("-)Typeing : " + commentText, { percent: 50 });
                await commentTextInput.first().type(commentText);
                await this.bot.delay("low");
                this.setLog("-)Posting the comment ", { percent: 75 });
                await postElement?.locator('text="Post"').first().click();
                await this.bot.delay("low");
            }
            this.completeLog();
        }
        catch (e) {
            this.errorLog(e);
        }
    }
}
exports.default = CommentAction;
//# sourceMappingURL=Comment.js.map