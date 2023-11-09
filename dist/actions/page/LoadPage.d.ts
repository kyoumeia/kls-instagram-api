import { BaseSubActionClass, BaseActionInterface } from '../BaseActionClass';
import type { LoadPageInputInterface, GetInfoOutputInterface } from '../../types/page/pageActions';
export default class LoadPageAction extends BaseSubActionClass implements BaseActionInterface {
    actionName: string;
    loadSuccessfully: boolean | undefined;
    protected input: LoadPageInputInterface;
    constructor(input: LoadPageInputInterface);
    start(): Promise<void>;
    isLoadSuccessfully(): boolean;
    getInfo(): Promise<GetInfoOutputInterface>;
    private _getSeacrhElement;
    private searchAndGotoPage;
    private _directlyGotoPage;
}
