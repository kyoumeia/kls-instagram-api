"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
class LoadPageAction extends BaseActionClass_1.BaseSubActionClass {
    constructor(input) {
        super(); // --> it's important
        this.actionName = "LoadPage";
        this.input = input;
    }
    async start() {
        try {
            let input = this.input;
            let searchElement = await this._getSeacrhElement();
            if (searchElement) {
                this.setLog(`1-type page name (${input.pageName}) in search box `, { percent: 25 });
                await this.searchAndGotoPage(searchElement, input.pageName);
            }
            else {
                this.setLog(`1-goto page (${input.pageName}) `, { percent: 25 });
                await this._directlyGotoPage(input.pageName);
            }
            this.loadSuccessfully = true;
            this.completeLog();
        }
        catch (e) {
            this.errorLog(e);
        }
    }
    isLoadSuccessfully() {
        if (this.loadSuccessfully)
            return true;
        else
            return false;
    }
    async getInfo() {
        let page = this.page;
        var output = {
            fullName: undefined,
            isPrivate: undefined,
            isInMyfollowing: undefined,
            postCount: undefined,
            followerCount: undefined,
            followingCount: undefined
        };
        // let fullnameElm = await page.$$('.QGPIr');
        let fullnameElm = await page.locator(':light(.QGPIr .T0kll)');
        if (fullnameElm && fullnameElm.first())
            output.fullName = await fullnameElm.first().textContent() ?? undefined;
        let isPrivateElm = await page.$("text=Account is Private");
        if (isPrivateElm)
            output.isPrivate = true;
        else
            output.isPrivate = false;
        let isInMyfollowingElm = await page.$("text='Follow'");
        if (isInMyfollowingElm)
            output.isInMyfollowing = false;
        else
            output.isInMyfollowing = true;
        let activityConter = await page.$$(".k9GMp .g47SY");
        if (activityConter && activityConter.length) {
            output.postCount = await activityConter[0].innerText();
            output.followerCount = await activityConter[1].innerText();
            output.followingCount = await activityConter[2].innerText();
        }
        return output;
    }
    async _getSeacrhElement() {
        let page = this.page;
        var searchElm = await page.$$('[aria-label="Search Input"]');
        if (searchElm && searchElm.length) {
            return searchElm[0];
        }
        return false;
    }
    async searchAndGotoPage(searchElement, pageName) {
        let page = this.page;
        let bot = this.bot;
        await searchElement.type(pageName);
        await bot.delay("medium");
        let searchResults = await page.$$('[role = "none"]');
        if (searchResults && searchResults[0])
            await searchResults[0].click();
        else {
            let isNoResultState = await page.$("text=No results");
            if (isNoResultState)
                throw new Error("No result found for: " + pageName);
        }
    }
    async _directlyGotoPage(pageName) {
        await this.page.goto(`https://www.instagram.com/${pageName}/`);
        await this.page.waitForLoadState('networkidle');
        let isNoResultState = await this.page.$("text=page isn't available.");
        if (isNoResultState)
            throw new Error("No result found for:" + pageName);
    }
}
exports.default = LoadPageAction;
//# sourceMappingURL=LoadPage.js.map