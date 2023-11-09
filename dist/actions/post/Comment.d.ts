import { BaseSubActionClass, BaseActionInterface } from '../BaseActionClass';
import type { postActionInputType } from '../../types/post/postAction';
export default class CommentAction extends BaseSubActionClass implements BaseActionInterface {
    actionName: string;
    protected input: postActionInputType;
    constructor(input: postActionInputType);
    start(commentText: string): Promise<void>;
}
