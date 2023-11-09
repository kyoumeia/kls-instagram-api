"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActionClass_1 = require("../BaseActionClass");
const PostClass_1 = __importDefault(require("../post/PostClass"));
class ReviewHome extends BaseActionClass_1.BaseSubActionClass {
    constructor(input) {
        super(); // --> it's important
        this.actionName = "ReviewHome";
        this.input = input;
    }
    async start() {
        try {
            let postCount = this.input.postReviewCount ?? 10;
            this.setLog("1)goto Home Page", { percent: 5 });
            await this.gotoHome();
            this.setLog("2)Review Home Post", { percent: 10 });
            await this.postsLoop(async (targetPost, index) => {
                let currentPrecent = 10 + ((90 / postCount) * (index + 1));
                this.setLog(`-)Get ${index + 1}th post of ${postCount}`, { percent: currentPrecent });
                if (this.input.onPostReview)
                    await this.input.onPostReview(targetPost, index);
            });
            this.completeLog();
        }
        catch (e) {
            this.errorLog(e);
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
    async postsLoop(postCallback) {
        let page = this.page;
        let postCount = this.input.postReviewCount ?? 10;
        let bot = this.bot;
        var list = await PostClass_1.default.findAllPostsElementFromHome(page);
        if (list && list.length)
            for (let i = 0; i < postCount; i++) {
                // -- if > 3 then stay at 3 because new post push to end and old post remove from first so stay at index 3
                var index = i > 3 ? 3 : i;
                // if post is exist
                if (list[index]) {
                    // scroll to post 
                    // -- space in instagram does scrolling to next post
                    await page.keyboard.press('Space');
                    await bot.delay("low");
                    if (postCallback) {
                        var postElm = await PostClass_1.default.findPostLocatorFromHome(page).nth(index);
                        var currentPost = await this._buildHomePost(postElm, index);
                        if (currentPost.link)
                            await postCallback(currentPost, i);
                    }
                    await bot.delay("low");
                    // refresh list    
                    list = await PostClass_1.default.findAllPostsElementFromHome(page);
                }
            }
    }
    async _buildHomePost(postElm, index) {
        await this._clickOnMoreCaption(postElm, index);
        var postLink = await this._getPostLink(index);
        var postPageOwner = await this._getPostOwner(index);
        var postCaption = await this._getPostCaption(index);
        var postImgVideo = await this._getPostImgOrVideo(index);
        let currentPost = new PostClass_1.default();
        currentPost.setup(this.bot, this.browser, this.page);
        currentPost.link = postLink;
        currentPost.owner = postPageOwner;
        currentPost.mediaLink = postImgVideo;
        currentPost.caption = postCaption;
        if (postElm)
            currentPost.loadPostByElement(postElm);
        return currentPost;
    }
    async _getPostLink(postIndex) {
        return this.page.evaluate((i) => {
            if (document.querySelectorAll('._8Rm4L ')[i] && document.querySelectorAll('._8Rm4L ')[i].querySelector('a[href^="/p/"]')) {
                return document.querySelectorAll('._8Rm4L ')[i].querySelector('a[href^="/p/"]').href;
            }
        }, postIndex);
    }
    async _getPostOwner(postIndex) {
        return await this.page.evaluate((i) => {
            if (document.querySelectorAll('._8Rm4L')[i].querySelector('header a.sqdOP')) {
                return document.querySelectorAll('._8Rm4L')[i].querySelector('header a.sqdOP').text;
            }
        }, postIndex);
    }
    async _getPostCaption(postIndex) {
        return await this.page.evaluate((i) => {
            // @ts-ignore: Unreachable code error
            var elm = document.querySelectorAll('._8Rm4L')[i];
            // @ts-ignore: Unreachable code error
            var textelm = elm.querySelector('._8Pl3R') || elm.querySelector('[data-testid="post-comment-root"]');
            // @ts-ignore: Unreachable code error
            if (textelm) {
                // @ts-ignore: Unreachable code error
                var text = textelm.innerText;
                if (text == '... more' || text == '.... more' || text == '..... more') {
                    // @ts-ignore: Unreachable code error
                    elm.querySelector('.sXUSN').click();
                    // @ts-ignore: Unreachable code error
                    text = textelm.innerText;
                }
                return text;
            }
        }, postIndex);
    }
    async _getPostImgOrVideo(postIndex) {
        return await this.page.evaluate((i) => {
            // @ts-ignore: Unreachable code error
            if (document.querySelectorAll('._8Rm4L')[i] && document.querySelectorAll('._8Rm4L')[i].querySelector('img.FFVAD'))
                // @ts-ignore
                return document.querySelectorAll('._8Rm4L')[i].querySelector('img.FFVAD').src;
            // @ts-ignore
            else if (document.querySelectorAll('._8Rm4L')[i] && document.querySelectorAll('._8Rm4L')[i].querySelector('video'))
                // @ts-ignore
                return document.querySelectorAll('._8Rm4L')[i].querySelector('video').poster;
        }, postIndex);
    }
    async _clickOnMoreCaption(postElm, index) {
        if (postElm) {
            var moreElm = await postElm.locator('.sXUSN');
            if (moreElm && await moreElm.count()) {
                await moreElm.first().click();
                this.bot.delay("low");
            }
        }
    }
}
exports.default = ReviewHome;
//# sourceMappingURL=reviewHome.js.map