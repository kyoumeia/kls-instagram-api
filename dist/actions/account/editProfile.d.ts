import { BaseSubActionClass, BaseActionInterface } from '../BaseActionClass';
import type { editPriofileActionInput } from '../../types/editProfileAction';
export default class EditProfileAction extends BaseSubActionClass implements BaseActionInterface {
    actionName: string;
    protected input: editPriofileActionInput;
    constructor(input: editPriofileActionInput);
    start(): Promise<void>;
    gotoEditProfilePage(uname: string): Promise<void>;
    fillAndSubmitProfileForm(input: editPriofileActionInput): Promise<void>;
    private checkValidationForm;
    private uploadAvatarIfExist;
    private submitForm;
}
