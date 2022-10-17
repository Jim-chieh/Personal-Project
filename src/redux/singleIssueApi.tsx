import { createLabelApi } from './LabelCreateApi';
import { singleIssueProp, Commments } from './singleIssueProp';
import { createIssueProp } from './createIssueProps';

export type singleIssueParam = {
	name: string;
	repo: string;
	token: string;
	id: string;
};

export type singleIssueUpdateComment = {
	name: string;
	repo: string;
	token: string;
	body: string;
	id: string;
};

export type titleUpdateComment = {
	name: string;
	repo: string;
	token: string;
	title: string;
	id: string;
};

export type commentCreate = {
	name: string;
	repo: string;
	token: string;
	body: string;
	id: string;
};

export type commentDelte = {
	name: string;
	repo: string;
	token: string;
	id: string;
};

export type updateAssignees = {
	name: string;
	repo: string;
	token: string;
	id: string;
	assignees: string[];
};

export type updateLables = {
	name: string;
	repo: string;
	token: string;
	id: string;
	labels: string[];
};

export type updateState = {
	name: string;
	repo: string;
	token: string;
	id: string;
	state: string;
	state_reason: string;
};

const singleIssueapi = createLabelApi.injectEndpoints({
	endpoints: builder => ({
		singleIssue: builder.query<singleIssueProp, singleIssueParam>({
			query: ({ name, repo, token, id }) => ({
				url: `/${name}/${repo}/issues/${id}`,
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				})
			}),
			providesTags: ['issues']
		}),
		singleIssueComment: builder.query<Commments[], singleIssueParam>({
			query: ({ name, repo, token, id }) => ({
				url: `/${name}/${repo}/issues/${id}/comments`,
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				})
			}),
			providesTags: ['issues']
		}),
		singleIssueUpdate: builder.mutation<
			createIssueProp,
			singleIssueUpdateComment
		>({
			query: ({ name, repo, token, body, id }) => ({
				url: `/${name}/${repo}/issues/${id}`,
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				}),
				body: {
					body: body
				}
			}),
			invalidatesTags: ['issues']
		}),
		commentUpdate: builder.mutation<createIssueProp, singleIssueUpdateComment>({
			query: ({ name, repo, token, body, id }) => ({
				url: `/${name}/${repo}/issues/comments/${id}`,
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				}),
				body: {
					body: body
				}
			}),
			invalidatesTags: ['issues']
		}),
		titleUpdate: builder.mutation<createIssueProp, titleUpdateComment>({
			query: ({ name, repo, token, title, id }) => ({
				url: `/${name}/${repo}/issues/${id}`,
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				}),
				body: {
					title: title
				}
			}),
			invalidatesTags: ['issues']
		}),
		commentCreate: builder.mutation<createIssueProp, commentCreate>({
			query: ({ name, repo, token, body, id }) => ({
				url: `/${name}/${repo}/issues/${id}/comments`,
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				}),
				body: {
					body: body
				}
			}),
			invalidatesTags: ['issues']
		}),
		commentDelete: builder.mutation<createIssueProp, commentDelte>({
			query: ({ name, repo, token, id }) => ({
				url: `/${name}/${repo}/issues/comments/${id}`,
				method: 'DELETE',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				})
			}),
			invalidatesTags: ['issues']
		}),
		assigneeUpdate: builder.mutation<createIssueProp, updateAssignees>({
			query: ({ name, repo, token, id, assignees }) => ({
				url: `/${name}/${repo}/issues/${id}`,
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				}),
				body: {
					assignees: assignees
				}
			}),
			invalidatesTags: ['issues']
		}),
		labelsUpdate: builder.mutation<createIssueProp, updateLables>({
			query: ({ name, repo, token, id, labels }) => ({
				url: `/${name}/${repo}/issues/${id}`,
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				}),
				body: {
					labels: labels
				}
			}),
			invalidatesTags: ['issues']
		}),
		stateUpdate: builder.mutation<createIssueProp, updateState>({
			query: ({ name, repo, token, id, state, state_reason }) => ({
				url: `/${name}/${repo}/issues/${id}`,
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'if-none-match': ''
				}),
				body: {
					state: state,
					state_reason: state_reason
				}
			}),
			invalidatesTags: ['issues']
		})
	})
});

export const {
	useSingleIssueQuery,
	useSingleIssueCommentQuery,
	useSingleIssueUpdateMutation,
	useCommentUpdateMutation,
	useTitleUpdateMutation,
	useCommentCreateMutation,
	useCommentDeleteMutation,
	useAssigneeUpdateMutation,
	useLabelsUpdateMutation,
	useStateUpdateMutation
} = singleIssueapi;
