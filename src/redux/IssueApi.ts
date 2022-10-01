import { createLabelApi } from './LabelCreateApi';
import { IssueLists, Assignee } from './IssueListProps';

type GetLabelProps = {
	name: string;
	repo: string;
	token: string;
	labels: string;
	assignee: string;
	sort: string;
	filterText: string;
	state: string;
	per_page: string;
	page: string;
};

type GetAssigneeProps = {
	name: string;
	repo: string;
	token: string;
};

const issueListapi = createLabelApi.injectEndpoints({
	endpoints: builder => ({
		getAllIssues: builder.query<IssueLists, GetLabelProps>({
			query: ({
				name,
				repo,
				token,
				labels,
				assignee,
				sort,
				filterText,
				state,
				per_page,
				page
			}) => ({
				url: `/${name}/${repo}/issues?${labels}${assignee}${sort}${filterText}${state}${per_page}${page}`,
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
