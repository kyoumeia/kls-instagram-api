"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
const user_1 = __importDefault(require("../../services/user"));
class LoginAction extends BaseActionClass_1.BaseSubActionClass {
    constructor(input) {
        super(); // --> it's important
        this.actionName = "Login";
        this.needLogin = false;
        this.input = input;
    }
    async start() {
        try {
            let bot = this.bot;
            let browser = this.browser;
            let page = this.page;
            let input = this.input;
            //-- set account name in bot
            bot.accountName = input.uname;
            //-- clear cookie
            await browser.clearCookies();
            this.setLog("1-Clear cookies of browser ", { percent: 20 });
            await this.setUserCookieIfExist(input.uname);
            this.setLog("2-Opening the instagram.com", { percent: 30 });
            await this.gotoMainSite();
            this.setLog("3-Detect if is blocked", { percent: 40 });
            var isBlock = await this.isBlocked(input);
            if (isBlock)
                throw new Error(`Unfortunately the Account(${input.uname}) is blocked by instagram.`);
            this.setLog("4-Click on Not now notification popup", { percent: 50 });
            await this.setNotNowNotification();
            this.setLog("5-Click on `Acept` Cookie", { percent: 60 });
            await this.cookieAllowAction();
            // // -- if log out or cookie is unvalid  -> log in again
            if (await this.hasLogouted()) {
                this.setLog("6-it's first time or logouted", { percent: 65 });
                await this.clickLoginBtnInMobileViewport();
                this.setLog("7-Fill the login form", { percent: 70 });
                await this.fillLoginForm(input.uname, input.password);
                this.setLog("8-checking username and password", { percent: 75 });
                if (await this.isUnameOrPasswordWrong())
                    throw new Error(`Unfortunately your uname or password is incorrect. Please double-check your uname or password.`);
                this.setLog("9-checking if the account has blocked", { percent: 80 });
                var isBlock = await this.isBlocked(input);
                if (isBlock)
                    throw new Error(`Unfortunately the Account(${input.uname}) is blocked by instagram.`);
                await this.setNotNowNotification();
                this.setLog("10-click not now if save info alert had shown", { percent: 85 });
                await this.saveLoginInfoAlert();
                this.setLog("11-Save user cookie", { percent: 90 });
                await this.saveUserCookie(input.uname);
            }
            this.setLog("clicking Save info button in modal to save login info to browser", { percent: 95 });
            await this.doSaveBrowserLoginInfoModal();
            this.setLog("if show follow page,follow some suggested acount ", { percent: 95 });
            await this.FollowSuggestedAcount();
            bot.isLogin = true;
            this.completeLog();
        }
        catch (e) {
            this.errorLog(e);
        }
    }
    async setUserCookieIfExist(uname) {
        user_1.default.setStoragePath(this.bot.options.storagePath);
        var userCookie = await user_1.default.loadUserCookie(uname);
        if (userCookie) {
            const deserializedCookies = JSON.parse(userCookie);
            await this.browser.addCookies(deserializedCookies);
        }
        ;
    }
    async gotoMainSite() {
        await this.page.goto("https://www.instagram.com/", { timeout: 80000 });
        await this.bot.delay("low");
    }
    async isBlocked(input) {
        let page = this.page;
        // -- click on no notification popup
        var hasblock = await page.$$("text=Confirm it's You");
        if (hasblock && hasblock.length) {
            return true;
        }
        var hasblock2 = await page.$$("text=We noticed unusual activity");
        if (hasblock2 && hasblock2.length) {
            return true;
        }
        return false;
    }
    async setNotNowNotification() {
        let page = this.page;
        // -- click on no notification popup
        var hasEnablenotification = await page.$$("text=Turn on Notifications");
        if (hasEnablenotification && hasEnablenotification.length) {
            await page.click("text=Not Now");
        }
        await this.bot.delay("low");
    }
    async hasLogouted() {
        var haslogouted = await this.page.$$("text=Log In");
        if (haslogouted && haslogouted.length)
            return true;
        return false;
    }
    async fillLoginForm(uname, password) {
        let page = this.page;
        await page.type("[name=username]", uname);
        await page.type("[name=password]", password);
        await page.click("[type=submit]");
        await page.waitForLoadState('networkidle');
        await this.bot.delay("high");
    }
    async clickLoginBtnInMobileViewport() {
        var haslogouted = await this.page.$$("[name=username]");
        if (haslogouted && haslogouted.length == 0) {
            await this.page.click("text='Log In'");
            this.bot.delay("low");
        }
    }
    async cookieAllowAction() {
        let page = this.page;
        // condition text -1
        var hasEnableAlert = await page.$$("text=Accept cookies from Instagram on this browser?");
        // condition text 2
        var hasEnableAlert2 = await page.$$("text=Allow the use of cookies by Instagram?");
        // condition text 3
        var hasEnableAlert3 = await page.$$("text=Allow the use of cookies from Instagram on this browser?");
        if (hasEnableAlert && hasEnableAlert.length) {
            var bnt = await page.$$("text=Accept");
            if (bnt[1]) {
                await bnt[1].click();
                await page.waitForLoadState('networkidle');
            }
        }
        else if (hasEnableAlert2 && hasEnableAlert2.length) {
            var bnt = await page.$$("text=Allow All Cookies");
            if (bnt[0]) {
                await bnt[0].click();
                await page.waitForLoadState('networkidle');
            }
        }
        else if (hasEnableAlert3 && hasEnableAlert3.length) {
            var bnt = await page.$$("text=Allow essential and optional cookies");
            if (bnt[0]) {
                await bnt[0].click();
                await page.waitForLoadState('networkidle');
            }
        }
        await this.bot.delay("low");
    }
    async isUnameOrPasswordWrong() {
        if (!this.page.$$)
            return false;
        var hasFailedLogin = await this.page.$$("text=Sorry, your password was incorrect. Please double-check your password.");
        if (hasFailedLogin && hasFailedLogin.length)
            return true;
        var hasFailedLogin2 = await this.page.$$("text=Please check your username and try again");
        if (hasFailedLogin2 && hasFailedLogin2.length)
            return true;
        return false;
    }
    async doSaveBrowserLoginInfoModal() {
        let page = this.page;
        var hasUnusualActivity = await page.$$("text=Save Your Login Info");
        if (hasUnusualActivity && hasUnusualActivity.length) {
            await this.page.click("text=Save Info");
            await this.bot.delay("medium");
        }
    }
    async FollowSuggestedAcount() {
        var followPages = await this.page.$$("text='Follow'");
        if (followPages && followPages.length) {
            // await followPages[0].click();
            // click `get started` 
            var getstartBtn = await this.page.$$("text=Get Started");
            if (getstartBtn && getstartBtn.length)
                await getstartBtn[0].click();
        }
    }
    async saveLoginInfoAlert() {
        var hasSaveInfo = await this.page.$$("text=Save Your Login Info?");
        if (hasSaveInfo && hasSaveInfo.length) {
            await this.page.click("text=Not Now", { timeout: 3000, force: false });
            await this.bot.delay("medium");
        }
    }
    async saveUserCookie(uname) {
        const cookies = await this.browser.cookies();
        user_1.default.setStoragePath(this.bot.options.storagePath);
        await user_1.default.saveUserCookie(uname, JSON.stringify(cookies));
    }
}
exports.default = LoginAction;
//# sourceMappingURL=login.js.map