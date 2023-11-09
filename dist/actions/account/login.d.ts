import { BaseSubActionClass, BaseActionInterface } from '../BaseActionClass';
import type { loginActionInput } from '../../types/loginAction';
export default class LoginAction extends BaseSubActionClass implements BaseActionInterface {
    actionName: string;
    needLogin: boolean;
    protected input: loginActionInput;
    constructor(input: loginActionInput);
    start(): Promise<void>;
    setUserCookieIfExist(uname: string): Promise<void>;
    gotoMainSite(): Promise<void>;
    isBlocked(input?: loginActionInput): Promise<boolean>;
    setNotNowNotification(): Promise<void>;
    hasLogouted(): Promise<boolean>;
    fillLoginForm(uname: string, password: string): Promise<void>;
    clickLoginBtnInMobileViewport(): Promise<void>;
    cookieAllowAction(): Promise<void>;
    isUnameOrPasswordWrong(): Promise<boolean>;
    doSaveBrowserLoginInfoModal(): Promise<void>;
    protected FollowSuggestedAcount(): Promise<void>;
    saveLoginInfoAlert(): Promise<void>;
    saveUserCookie(uname: string): Promise<void>;
}
