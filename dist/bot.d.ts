import type { optionsInterface } from './types/bot';
import Account from './actions/account/AccountClass';
import Post from './actions/post/PostClass';
import InstaPage from './actions/page/PageClass';
export default class LsInstagramBot {
    private _defaultDevOptions;
    private _defaultPrdOptions;
    options: optionsInterface;
    private browserPersistentContextPrefix;
    private browser;
    private browserPage;
    isLogin: boolean;
    accountName: string | null;
    account: Account;
    post: Post;
    page: InstaPage;
    constructor(options: optionsInterface);
    private _mergeOptions;
    private _createBrowserBot;
    private _loadMainActions;
    start(): Promise<void>;
    delay(delayExpression: string | number): Promise<void>;
    hasLogin(): Promise<boolean>;
    screenshot(filename: string): Promise<void>;
    _createAsciiTextInConsole(): Promise<void>;
}
