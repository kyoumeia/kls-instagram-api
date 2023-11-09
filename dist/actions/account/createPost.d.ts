import { BaseSubActionClass, BaseActionInterface } from '../BaseActionClass';
import type { CreatePostActionInput } from 'src/types/account/createPost';
export default class CreatePost extends BaseSubActionClass implements BaseActionInterface {
    actionName: string;
    protected input: CreatePostActionInput;
    constructor(input: CreatePostActionInput);
    start(): Promise<void>;
    existsFile(filename: string): Promise<boolean>;
    gotoHome(): Promise<void>;
    setFileGorUpload(filePath: string): Promise<void>;
    setCaption(caption: string): Promise<void>;
    setLocation(location: string): Promise<void>;
    isPostedDone(): Promise<boolean>;
}
