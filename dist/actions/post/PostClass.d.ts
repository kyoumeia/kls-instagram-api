import type { Page, ElementHandle, Locator } from 'playwright';
import { BaseActionClass } from '../BaseActionClass';
export default class Post extends BaseActionClass {
    link: string | null;
    owner: string | null;
    mediaLink: string | null;
    caption: string | null;
    element: Locator | null;
    isInPostUrl: boolean | null;
    constructor();
    loadPostByElement(element: Locator): Promise<this>;
    loadPostByUrl(url: string): Promise<this>;
    gotoPostUrl(): Promise<this | undefined>;
    like(): Promise<this>;
    comment(commentText: string): Promise<this>;
    static findPostLocatorFromHome(page: Page): Locator;
    static findAllPostsElementFromHome(page: Page): Promise<ElementHandle[]>;
    static findPostLocatorFromHomeDialog(page: Page): Locator;
    static findPostLocatorFromPostPage(page: Page): Locator;
}
export type PostInterface = typeof Post;
