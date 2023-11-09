import { BaseSubActionClass, BaseActionInterface } from '../BaseActionClass';
import type { FollowActionInputInterface } from '../../types/page/pageActions';
export default class FollowAction extends BaseSubActionClass implements BaseActionInterface {
    actionName: string;
    protected input: FollowActionInputInterface;
    constructor(input: FollowActionInputInterface);
    start(): Promise<void>;
}
