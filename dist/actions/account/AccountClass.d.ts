import { BaseActionClass } from '../BaseActionClass';
import type { loginActionInput } from '../../types/loginAction';
import type { registerActionInput } from '../../types/registerAction';
import type { editPriofileActionInput } from '../../types/editProfileAction';
import type { reviewHomeActionInput } from '../../types/reviewHomeAction';
import type { CreatePostActionInput } from 'src/types/account/createPost';
export default class Account extends BaseActionClass {
    constructor();
    login(input: loginActionInput): Promise<this>;
    register(input: registerActionInput): Promise<this>;
    editProfile(input: editPriofileActionInput): Promise<this>;
    reviewHome(input: reviewHomeActionInput): Promise<this>;
    createPost(input: CreatePostActionInput): Promise<this>;
}
export type AccountInterface = typeof Account;
