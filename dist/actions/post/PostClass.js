"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
const Like_1 = __importDefault(require("./Like"));
const Comment_1 = __importDefault(require("./Comment"));
class Post extends BaseActionClass_1.BaseActionClass {
    constructor() {
        super();
        this.link = null;
        this.owner = null;
        this.mediaLink = null;
        this.caption = null;
        this.element = null;
        this.isInPostUrl = null;
    }
    async loadPostByElement(element) {
        this.element = element;
        this.isInPostUrl = false;
        return this;
    }
    async loadPostByUrl(url) {
        await this.page.goto(url);
        this.element = await Post.findPostLocatorFromPostPage(this.page).first();
        this.isInPostUrl = true;
        return this;
    }
    async gotoPostUrl() {
        //- first way : click on comment icon
        if (this.isInPostUrl)
            return;
        let commentBtn = await this.element?.locator('[aria-label="Comment"]');
        if (commentBtn && await commentBtn.count() && await commentBtn.nth(1)) {
            let parentBtn = await commentBtn.nth(1);
            // let parent    =  await parentBtn.$('xpath=..');
            await parentBtn.click();
            this.element = await Post.findPostLocatorFromHomeDialog(this.page).first();
            await this.bot.delay("high");
        }
        //- secend way : go directly to post link
        //...
        return this;
    }
    async like() {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        let likeActionObj = new Like_1.default({
            element: this.element
        });
        likeActionObj.setup(bot, browser, page);
        await likeActionObj.start();
        return this;
    }
    async comment(commentText) {
        let bot = this.bot;
        let browser = this.browser;
        let page = this.page;
        if (this.isInPostUrl) {
            var beforeCommentPgaeState = "isInPostUrl";
        }
        else {
            var beforeCommentPgaeState = "isNotInPostUrl";
            await this.gotoPostUrl();
        }
        let commentActionObj = new Comment_1.default({
            element: this.element
        });
        commentActionObj.setup(bot, browser, page);
        await commentActionObj.start(commentText);
        // back to state of before comment
        if (beforeCommentPgaeState == "isNotInPostUrl") {
            await page.keyboard.press('Escape');
            await page.goBack();
        }
        return this;
    }
    /* - STATIC - */
    //-- Find Element/Locator in page
    static findPostLocatorFromHome(page) {
        return page.locator('._8Rm4L');
    }
    static findAllPostsElementFromHome(page) {
        return page.$$('._8Rm4L');
    }
    static findPostLocatorFromHomeDialog(page) {
        return page.locator('[role="dialog"]');
    }
    static findPostLocatorFromPostPage(page) {
        return page.locator('[role="presentation"]');
    }
}
exports.default = Post;
//# sourceMappingURL=PostClass.js.map