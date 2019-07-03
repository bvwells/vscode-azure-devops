import * as vscode from 'vscode';
import * as path from 'path';

export class PullRequestsProvider implements vscode.TreeDataProvider<PullRequest> {

	private _onDidChangeTreeData: vscode.EventEmitter<PullRequest | undefined> = new vscode.EventEmitter<PullRequest | undefined>();
	readonly onDidChangeTreeData: vscode.Event<PullRequest | undefined> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: PullRequest): vscode.TreeItem {
		return element;
	}

	getChildren(element?: PullRequest): Thenable<PullRequest[]> {
		const project = "";
		if (element) {
			return Promise.resolve([]);
		} else {
			return Promise.resolve(this.getPullRequests(project));
		}
	}

	/**
	 * Given the Azure Devops project get all the active pull requests.
	 */
	private getPullRequests(project: string): PullRequest[] {

		// call 
		// - GET https://dev.azure.com/{organization}/{project}/_apis/git/pullrequests?api-version=5.0

        var prs: PullRequest[] = [];
		prs.push(new PullRequest("id1", "repo1", "title1", "url", vscode.TreeItemCollapsibleState.Collapsed));
		return prs;
	}

}

export class PullRequest extends vscode.TreeItem {

	constructor(
		public readonly pullRequestId: string,
		public readonly repository: string,
		public readonly title: string,
		public readonly url: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(pullRequestId, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}`;
	}

	get description(): string {
		return `${this.title}`;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'pr.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'pr.svg')
	};

	contextValue = 'pull-request';
}
