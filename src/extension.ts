import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const disposables: vscode.Disposable[] = [];

    disposables.push(
        vscode.commands.registerCommand('relative-pattern.folder', async () => {
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                const glob = "**/*.md";
                const folder = vscode.workspace.workspaceFolders[0];
                const pattern = new vscode.RelativePattern(folder, "**/*.md");

                const files = await vscode.workspace.findFiles(pattern);
                vscode.window.showInformationMessage(`Found ${files.length} files matching "${glob}".`);
            }
        })
    );

    disposables.push(
        vscode.commands.registerCommand('relative-pattern.uri', async () => {
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                const glob = "**/*.md";
                const folder = vscode.workspace.workspaceFolders[0];
                const uri = vscode.Uri.joinPath(folder.uri, '/packages/');
                const pattern = new vscode.RelativePattern(uri, "**/*.md");

                const files = await vscode.workspace.findFiles(pattern);
                vscode.window.showInformationMessage(`Found ${files.length} files matching "${glob}" in ${uri.toString()}.`);
            }
        })
    );

    disposables.push(
        vscode.commands.registerCommand('relative-pattern.baseUri', async () => {
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                const glob = "**/*.md";
                const folder = vscode.workspace.workspaceFolders[0];
                const uri = vscode.Uri.joinPath(folder.uri, '/packages/');
                const pattern = new vscode.RelativePattern('', "**/*.md");
                pattern.baseUri = uri;

                const files = await vscode.workspace.findFiles(pattern);
                vscode.window.showInformationMessage(`Found ${files.length} files matching "${glob}" in ${uri.toString()}.`);
            }
        })
    );

    disposables.push(
        vscode.commands.registerCommand('relative-pattern.base', async () => {
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                const glob = "**/*.md";
                const folder = vscode.workspace.workspaceFolders[0];
                const uri = vscode.Uri.joinPath(folder.uri, '/packages/').fsPath;
                const pattern = new vscode.RelativePattern('', "**/*.md");
                pattern.base = uri;

                const files = await vscode.workspace.findFiles(pattern);
                vscode.window.showInformationMessage(`Found ${files.length} files matching "${glob}" in ${uri}.`);
            }
        })
    );


    context.subscriptions.push(...disposables);
}

export function deactivate() { }
