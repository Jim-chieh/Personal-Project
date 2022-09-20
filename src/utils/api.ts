import { timeEnd } from 'console';

const api = {
	hostname: 'https://api.github.com',
	owner: 'Jim-chieh',
	repo: 'Personal-Project',
	async getLabels() {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/labels`
		);
		return await response.json();
	},
	async createLabel(
		Authorization: string,
		labelName: string,
		color: string,
		description: string
	) {
		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/vnd.github+json',
			Authorization: `token ${Authorization}`
		};

		const body = {
			name: `${labelName}`,
			description: `${description}`,
			color: `${color}`
		};
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/labels`,
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(body)
			}
		);
		return await response.json();
	},
	async getLabel(labelName: string) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/labels/${labelName}`
		);
		return await response.json();
	},
	async deleteLabel(Authorization: string, labelName: string) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/labels/${labelName}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `token ${Authorization}`,
					Accept: 'application/vnd.github+json'
				}
			}
		);
		return await response.json();
	},
	async updateLabel(
		labelName: string,
		Authorization: string,
		newName: string,
		color: string,
		description: string
	) {
		const body = {
			new_name: newName,
			color: color,
			description: description
		};
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/labels/${labelName}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `token ${Authorization}`,
					Accept: 'application/vnd.github+json'
				},
				body: JSON.stringify(body)
			}
		);
		return await response.json();
	},
	async getIssue() {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues`
		);
		return await response.json();
	},
	async getSingleIssue(issueId: number) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/${issueId}`
		);
		return await response.json();
	},
	async createIssue(
		Authorization: string,
		title: string,
		context: string,
		selectedLabel: string
	) {
		const body = {
			title: title,
			body: context,
			labels: [selectedLabel]
		};
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${Authorization}`
				},
				body: JSON.stringify(body)
			}
		);
		return await response.json();
	},
	async updateIssue(
		Authorization: string,
		title: string,
		context: string,
		selectedLabel: string
	) {
		const body = {
			title: title,
			body: context,
			labels: [selectedLabel]
		};
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${Authorization}`
				},
				body: JSON.stringify(body)
			}
		);
		return await response.json();
	},
	async filterIssue(Authorization: string) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues?assignee=${this.owner}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${Authorization}`
				}
			}
		);
		return await response.json();
	},
	async getComment() {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/comments`
		);
		return await response.json();
	},
	async getCommentInIssue(issueId: Number) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/${issueId}/comments`
		);
		return await response.json();
	},
	async getSpecificComment(commentId: Number) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/comments/${commentId}`
		);
		return await response.json();
	},
	async updateComment(
		Authorization: string,
		commentId: Number,
		context: string
	) {
		const body = {
			body: context
		};
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/comments/${commentId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${Authorization}`
				},
				body: JSON.stringify(body)
			}
		);
		return await response.json();
	},
	async deleteComment(Authorization: string, commentId: Number) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/comments/${commentId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `token ${Authorization}`,
					Accept: 'application/vnd.github+json'
				}
			}
		);
		return await response.json();
	},
	async createComment(Authorization: string, content: string, issueId: Number) {
		const body = {
			body: content
		};
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/${issueId}/comments`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${Authorization}`
				},
				body: JSON.stringify(body)
			}
		);
		return await response.json();
	},
	async getTimeline(issueId: Number) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/${issueId}/timeline`
		);
		return await response.json();
	},
	async getReactions(commentId: Number) {
		const response = await fetch(
			`${this.hostname}/repos/${this.owner}/${this.repo}/issues/comments/${commentId}/reactions`
		);
		return await response.json();
	}
};

export default api;
