import type { BrowserContext, Page } from 'playwright';
import type { logInputInterface } from '../types/baseAction';
import type bot from '../bot';
import cliProgress from 'cli-progress';
export declare class BaseActionClass {
    protected bot: bot;
    protected browser: BrowserContext;
    protected page: Page;
    actionName: string;
    setup(bot: bot, browser: BrowserContext, page: Page): void;
    setBrowser(bot: bot, browser: BrowserContext, page: Page): void;
}
export declare class BaseSubActionClass extends BaseActionClass {
    protected progressBar: cliProgress.SingleBar;
    protected needLogin: boolean;
    constructor();
    setup(bot: bot, browser: BrowserContext, page: Page): void;
    checkSubActionRequirment(): void;
    private _setupLogAndCliProgress;
    private _fillSpaceFromRight;
    protected setLog(title: string, logInput: logInputInterface): void;
    protected completeLog(): void;
    protected errorLog(e: any): void;
}
export interface BaseActionInterface {
    actionName: string;
    setup(bot: bot, browser: BrowserContext, page: Page): void;
}
