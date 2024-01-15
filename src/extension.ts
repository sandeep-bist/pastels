// src/extension.ts
import * as vscode from 'vscode';

let disposable: vscode.Disposable;
export function activate(context: vscode.ExtensionContext) {
  console.log('Snippet Manager is now active!');

  let disposable = vscode.commands.registerCommand('snippetManager.showSnippets', async () => {
    const snippets = await vscode.window.showQuickPick(['Snippet 1', 'Snippet 2', 'Snippet 3'], {
      placeHolder: 'Select a snippet to insert',
    });

    if (snippets) {
      // Get the active editor
      const editor = vscode.window.activeTextEditor;

      // Insert the selected snippet
      editor?.edit((editBuilder) => {
        editBuilder.insert(editor.selection.active, snippets);
      });

      vscode.window.showInformationMessage(`Inserting ${snippets}...`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
    // Cleanup logic when the extension is deactivated
    if (disposable) {
        disposable.dispose();
      }
      console.log('Deactivating extension...');
  }

