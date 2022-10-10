import { createLabelApi } from './LabelCreateApi';
import { createIssueProp } from './createIssueProps';

export type createIssueParam = {
	name: string;
	repo: string;
	token: string;
	title: string;
	body: string;
	labels: string[];
	assignees: string[];
};

const createIssueapi = createLabelApi.injectEndpoints({
	endpoints: builder => ({
		createIssue: builder.mutation<createIssueProp, createIssueParam>({
			query: ({ name, repo, token, title, body, labels, assignees }) => ({
				url: `/${name}/${repo}/issues`,
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`
				}),
				body: {
					title: title,
					body: body,
					labels: labels,
					assignees: assignees
				}
			})
		})
	})
});

export const { useCreateIssueMutation } = createIssueapi;
