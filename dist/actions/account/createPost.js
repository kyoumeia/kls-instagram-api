"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
class CreatePost extends BaseActionClass_1.BaseSubActionClass {
    constructor(input) {
        super(); // --> it's important
        this.actionName = "CreatePost";
        this.input = input;
    }
    async start() {
        try {
            let imagePath = this.input.imagePath ?? "";
            let caption = this.input.caption ?? "";
            let location = this.input.location ?? "";
            this.setLog("0)Check the input image exists", { percent: 10 });
            await this.existsFile(imagePath);
            this.setLog("1)goto Home Page", { percent: 20 });
            await this.gotoHome();
            this.setLog("2)Set the image", { percent: 30 });
            await this.setFileGorUpload(imagePath);
            this.setLog("3)Set the image", { percent: 40 });
            await this.page.click('text="Next"');
            await this.bot.delay("medium");
            this.setLog("4)skip edit image", { percent: 50 });
            await this.page.click('text="Next"');
            await this.bot.delay("low");
            this.setLog("5)Set the caption", { percent: 60 });
            await this.setCaption(caption);
            this.setLog("6)Set the location", { percent: 70 });
            await this.setLocation(location);
            await this.bot.delay("low");
            this.setLog("7) Uploading image ...", { percent: 75 });
            await this.page.click('text="Share"');
            await this.bot.delay("high");
            if (!await this.isPostedDone()) {
                await this.bot.delay("medium");
            }
            await this.page.keyboard.press('Escape');
            this.completeLog();
        }
        catch (e) {
            this.errorLog(e);
        }
    }
    async existsFile(filename) {
        const fs = require('fs');
        if (filename && fs.existsSync(filename)) {
            return true;
        }
        else {
            throw new Error(`Your image is not exists. filePath :${filename}`);
        }
    }
    async gotoHome() {
        var homeElm = await this.page.$$("[href='/']");
        if (homeElm && homeElm.length) {
            await homeElm[0].click();
            await this.page.waitForLoadState('networkidle');
        }
        else
            await this.page.goto("https://www.instagram.com/");
        this.bot.delay('medium');
    }
    async setFileGorUpload(filePath) {
        await this.page.locator('[aria-label="New Post"]').first().click();
        const [fileChooser] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            this.page.waitForEvent('filechooser'),
            // Opens the file chooser.
            await this.page.locator("text=Select from computer").first().click()
        ]);
        await fileChooser.setFiles(filePath);
    }
    async setCaption(caption) {
        await this.page.type("textarea[aria-label='Write a caption...']", caption);
    }
    async setLocation(location) {
        if (location) {
            await this.page.type("[name='creation-location-input']", location);
            await this.bot.delay("medium");
            this.page.locator("button.Eo_F0").first().click();
        }
    }
    async isPostedDone() {
        var unameElm = await this.page.$$("text=done");
        if (unameElm && unameElm.length) {
            return true;
        }
        return false;
    }
}
exports.default = CreatePost;
//# sourceMappingURL=createPost.js.map