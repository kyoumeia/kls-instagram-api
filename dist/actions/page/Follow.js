"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
class FollowAction extends BaseActionClass_1.BaseSubActionClass {
    constructor(input) {
        super(); // --> it's important
        this.actionName = "Follow";
        this.input = input;
    }
    async start() {
        try {
            let page = this.page;
            let input = this.input;
            this.setLog(`-follow: (${input.pageName})`, { percent: 50 });
            let followBtn = await page.$("text='Follow'");
            if (followBtn) {
                await followBtn.hover();
                await followBtn.click();
            }
            this.completeLog();
        }
        catch (e) {
            this.errorLog(e);
        }
    }
}
exports.default = FollowAction;
//# sourceMappingURL=Follow.js.map