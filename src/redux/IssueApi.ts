import { createLabelApi } from './LabelCreateApi';
import { IssueLists } from './IssueListProps';

type GetLabelProps = {
	name: string;
	repo: string;
	token: string;
};

const issueListapi = createLabelApi.injectEndpoints({
	endpoints: builder => ({
		getAllIssues: builder.query<IssueLists, GetLabelProps>({
			query: ({ name, repo, token }) => ({
				url: `/${name}/${repo}/issues`,
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
