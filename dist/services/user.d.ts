declare let User: {
    storagePath: string;
    saveUserCookie: (uname: string, content: string) => Promise<any>;
    loadUserCookie: (uname: string) => Promise<any>;
    setStoragePath: (path: string | undefined) => void;
    makeRandomStr: (length: number) => string;
};
export default User;
