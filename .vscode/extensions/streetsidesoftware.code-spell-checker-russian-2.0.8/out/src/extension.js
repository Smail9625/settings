"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const extName = 'cSpellExt_russian';
const language = 'Russian';
const localeEnable = 'ru';
const localeDisable = 'ru';
const commandEnable = `${extName}.enable${language}`;
const commandDisable = `${extName}.disable${language}`;
const commandEnableWorkspace = `${extName}.enable${language}Workspace`;
const commandDisableWorkspace = `${extName}.disable${language}Workspace`;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
async function activate(context) {
    const vscodeSpellCheckerExtension = 'streetsidesoftware.code-spell-checker';
    const configLocation = context.asAbsolutePath('./cspell-ext.json');
    const extension = vscode.extensions.getExtension(vscodeSpellCheckerExtension);
    const ext = await extension?.activate();
    if (ext) {
        // We need to register the dictionary configuration with the Code Spell Checker Extension
        ext?.registerConfig?.(configLocation);
    }
    async function enable(isGlobal) {
        const ext = await extension?.activate();
        if (!ext)
            return;
        await ext.enableLocal(isGlobal, localeEnable);
    }
    async function disable(isGlobal) {
        const ext = await extension?.activate();
        if (!ext)
            return;
        await ext.disableLocal(isGlobal, localeDisable);
    }
    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(vscode.commands.registerCommand(commandEnable, () => enable(true)), vscode.commands.registerCommand(commandDisable, () => disable(true)), vscode.commands.registerCommand(commandEnableWorkspace, () => enable(false)), vscode.commands.registerCommand(commandDisableWorkspace, () => disable(false)));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map