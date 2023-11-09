import { BaseActionInterface } from '../BaseActionClass';
import LoginAction from './login';
import type { registerActionInput } from '../../types/registerAction';
export default class RegisterAction extends LoginAction implements BaseActionInterface {
    actionName: string;
    needLogin: boolean;
    protected input: registerActionInput;
    constructor(input: registerActionInput);
    start(): Promise<void>;
    private clickSignUpButton;
    private fillRegisterForm;
    private checkValidationForm;
    private fillBirthdateForm;
    private fetchAndSubmitVerifyCodeFromFile;
    private isVerifyCodeValid;
    private _fetchCodefromFile;
    private _fetchCodefromWeb;
    private checkUnusualActivity;
    private getEmail;
}
