"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSubActionClass = exports.BaseActionClass = void 0;
const cli_progress_1 = __importDefault(require("cli-progress"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
class BaseActionClass {
    setup(bot, browser, page) {
        this.setBrowser(bot, browser, page);
    }
    setBrowser(bot, browser, page) {
        this.bot = bot;
        this.browser = browser;
        this.page = page;
    }
}
exports.BaseActionClass = BaseActionClass;
class BaseSubActionClass extends BaseActionClass {
    constructor() {
        super();
        this.needLogin = true;
        this._setupLogAndCliProgress();
    }
    setup(bot, browser, page) {
        super.setup(bot, browser, page);
        this.checkSubActionRequirment();
    }
    checkSubActionRequirment() {
        if (!this.bot.isLogin && this.needLogin)
            this.errorLog(new Error("This action needs login before start."));
    }
    _setupLogAndCliProgress() {
        // create new progress bar
        this.progressBar = new cli_progress_1.default.SingleBar({
            format: '---⎆ ' + ansi_colors_1.default.redBright("{action}") + '   |' + ansi_colors_1.default.blueBright('{bar}') + '| ' + ansi_colors_1.default.greenBright("{percentage}%") + ' | ' + ansi_colors_1.default.yellow("{subAction}..."),
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true
        }, cli_progress_1.default.Presets.rect);
        // initialize the bar - defining payload token "speed" with the default value "N/A"
        this.progressBar.start(100, 0, { action: " ", subAction: " " });
    }
    _fillSpaceFromRight(string, OutputStringlength) {
        let spaceCharCount = OutputStringlength - string.length;
        let finalOutput = string;
        for (let i = 0; i < spaceCharCount; i++)
            finalOutput += " ";
        return finalOutput;
    }
    /* -- Log Functions --*/
    setLog(title, logInput) {
        let accountName = this.bot.accountName ? this.bot.accountName : "";
        let actionName = this.actionName ? this._fillSpaceFromRight(this.actionName, 18) : "";
        if (this.bot.options.logScreenshot) {
            this.bot.screenshot(`log-${accountName}-${actionName}-${title}`);
        }
        if (this.bot.options.log)
            this.progressBar.update(logInput.percent, { action: actionName, subAction: title });
    }
    completeLog() {
        let accountName = this.bot.accountName ? this.bot.accountName : "";
        let actionName = this.actionName ? this.actionName : "";
        if (this.bot.options.logScreenshot) {
            this.bot.screenshot(`log-${accountName}-${actionName}-complete`);
        }
        if (this.bot.options.log) {
            this.progressBar.update(100, { action: this._fillSpaceFromRight(actionName, 18), subAction: ansi_colors_1.default.greenBright('✓') });
            this.progressBar.stop();
        }
    }
    errorLog(e) {
        let accountName = this.bot.accountName ? this.bot.accountName : "";
        let actionName = this.actionName ? this.actionName : "";
        if (this.bot.options.logScreenshot) {
            this.bot.screenshot(`log-${accountName}-${actionName}-error`);
        }
        if (this.bot.options.log) {
            this.progressBar.stop();
            console.log(ansi_colors_1.default.red("Error in action:"), ansi_colors_1.default.bgRed(this.actionName), e);
        }
        else
            throw e;
    }
}
exports.BaseSubActionClass = BaseSubActionClass;
//# sourceMappingURL=BaseActionClass.js.map