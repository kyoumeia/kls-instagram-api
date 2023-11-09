"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
let User = {
    storagePath: './storage/',
    saveUserCookie: async (uname, content) => {
        return fs.writeFileSync(User.storagePath + uname + ".txt", content);
    },
    loadUserCookie: async (uname) => {
        var path = User.storagePath + uname + ".txt";
        if (fs.existsSync(path)) {
            return fs.readFileSync(path, 'utf8');
        }
        return false;
    },
    setStoragePath: (path) => {
        if (path)
            User.storagePath = path;
    },
    makeRandomStr: (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
};
exports.default = User;
//# sourceMappingURL=user.js.map