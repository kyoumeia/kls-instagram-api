import { BaseSubActionClass, BaseActionInterface } from '../BaseActionClass';
import type { postActionInputType } from '../../types/post/postAction';
export default class LikeAction extends BaseSubActionClass implements BaseActionInterface {
    actionName: string;
    protected input: postActionInputType;
    constructor(input: postActionInputType);
    start(): Promise<void>;
}
