"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./types/bot");
const playwright_1 = require("playwright");
const ansi_colors_1 = __importDefault(require("ansi-colors"));
// load actions
const AccountClass_1 = __importDefault(require("./actions/account/AccountClass"));
const PostClass_1 = __importDefault(require("./actions/post/PostClass"));
const PageClass_1 = __importDefault(require("./actions/page/PageClass"));
class LsInstagramBot {
    constructor(options) {
        this._defaultDevOptions = {
            isDevelopment: true,
            browser: bot_1.BROWSER.chromium,
            headless: false,
            slowMo: 10,
            log: true,
            logScreenshot: true,
            chromiumSandbox: true,
            locale: 'en-US',
            storagePath: './storage/'
        };
        this._defaultPrdOptions = {
            isDevelopment: false,
            browser: bot_1.BROWSER.chromium,
            headless: true,
            slowMo: 300,
            log: true,
            logScreenshot: false,
            chromiumSandbox: true,
            locale: 'en-US',
            storagePath: './storage/'
        };
        this.options = { ...this._defaultDevOptions };
        this.browserPersistentContextPrefix = 'instagram';
        /* -- Bot State -- */
        this.isLogin = false;
        this.accountName = null;
        let mergedOption = this._mergeOptions(options);
        this.options = mergedOption;
    }
    _mergeOptions(options) {
        if (options.isDevelopment)
            return { ...this._defaultDevOptions, ...options };
        else
            return { ...this._defaultPrdOptions, ...options };
    }
    async _createBrowserBot() {
        const createTagNameEngine = () => ({
            // Returns the first element matching given selector in the root's subtree.
            query(root, selector) {
                return root.querySelector(selector);
            },
            // Returns all elements matching given selector in the root's subtree.
            queryAll(root, selector) {
                return Array.from(root.querySelectorAll(selector));
            }
        });
        // Register the engine. Selectors will be prefixed with "tag=".
        await playwright_1.selectors.register('tag', createTagNameEngine);
        this._createAsciiTextInConsole();
        let browserObj = { chromium: playwright_1.chromium, webkit: playwright_1.webkit, firefox: playwright_1.firefox };
        let browserContextName = this.options.storagePath + this.browserPersistentContextPrefix + '-' + this.options.botName;
        this.browser = await browserObj[this.options.browser].launchPersistentContext(browserContextName, this.options);
        this.browserPage = await this.browser.newPage();
        // await page.screenshot({ path: `example.png` });
        //  await browser.close();
    }
    async _loadMainActions() {
        this.account = new AccountClass_1.default();
        this.account.setBrowser(this, this.browser, this.browserPage);
        this.post = new PostClass_1.default();
        this.post.setBrowser(this, this.browser, this.browserPage);
        this.page = new PageClass_1.default();
        this.page.setBrowser(this, this.browser, this.browserPage);
    }
    async start() {
        await this._createBrowserBot();
        await this._loadMainActions();
    }
    async delay(delayExpression) {
        var constantDelay = 1000;
        var extraDelay = 0;
        switch (delayExpression) {
            case 'low':
                extraDelay = 1000;
                break;
            case 'medium':
                extraDelay = 5000;
                constantDelay = 2000;
                break;
            case 'high':
                extraDelay = 5000;
                constantDelay = 4000;
                break;
            default:
                extraDelay = delayExpression;
        }
        await this.browserPage.waitForTimeout(Math.floor(Math.random() * extraDelay) + constantDelay);
    }
    async hasLogin() {
        if (this.isLogin)
            return true;
        return false;
    }
    async screenshot(filename) {
        await this.browserPage.screenshot({ path: `./screenshot/${filename}.jpg` });
    }
    async _createAsciiTextInConsole() {
        let botname = ansi_colors_1.default.magentaBright(this.options.botName ?? '');
        console.log(`
-------------------------
     Instagram  Bot
.........................
-⎆ ${botname} 
-------------------------

`);
    }
}
exports.default = LsInstagramBot;
//# sourceMappingURL=bot.js.map