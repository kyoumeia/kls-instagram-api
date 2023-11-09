import { BaseSubActionClass, BaseActionInterface } from '../BaseActionClass';
import type { reviewHomeActionInput } from '../../types/reviewHomeAction';
import Post from '../post/PostClass';
export default class ReviewHome extends BaseSubActionClass implements BaseActionInterface {
    actionName: string;
    protected input: reviewHomeActionInput;
    constructor(input: reviewHomeActionInput);
    start(): Promise<void>;
    gotoHome(): Promise<void>;
    postsLoop(postCallback: (PostObj: Post, index: number) => {}): Promise<void>;
    private _buildHomePost;
    private _getPostLink;
    private _getPostOwner;
    private _getPostCaption;
    private _getPostImgOrVideo;
    private _clickOnMoreCaption;
}
