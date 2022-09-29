import { createLabelApi } from './LabelCreateApi';
import { IssueLists, Assignee } from './IssueListProps';

type GetLabelProps = {
	name: string;
	repo: string;
	token: string;
	labels: string;
	assignee: string;
};
type GetAssigneeProps = {
	name: string;
	repo: string;
	token: string;
};

const issueListapi = createLabelApi.injectEndpoints({
	endpoints: builder => ({
		getAllIssues: builder.query<IssueLists, GetLabelProps>({
			query: ({ name, repo, token, labels, assignee }) => ({
				url: `/${name}/${repo}/issues?${labels}${assignee}`,
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `token ${token}`
				})
			}),
			providesTags: ['issues']
		}),
		getAllAssignees: builder.query<Assignee[], GetAssigneeProps>({
			query: ({ name, repo, token }) => ({
				url: `/${name}/${repo}/assignees`,
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `token ${token}`
				})
			}),
			providesTags: ['issues']
		})
	})
});

export const { useGetAllIssuesQuery } = issueListapi;
export const { useGetAllAssigneesQuery } = issueListapi;
