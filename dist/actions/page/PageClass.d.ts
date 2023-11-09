import { BaseActionClass } from '../BaseActionClass';
export default class InstaPage extends BaseActionClass {
    name: string | undefined;
    fullName: string | undefined;
    isLoaded: boolean;
    isPrivate: boolean | undefined;
    isInMyfollowing: boolean | undefined;
    postCount: string | undefined;
    followingCount: string | undefined;
    followerCount: string | undefined;
    constructor();
    loadPage(pageName: string): Promise<this>;
    Follow(pageName: string): Promise<this>;
}
export type InstaPageInterface = typeof InstaPage;
