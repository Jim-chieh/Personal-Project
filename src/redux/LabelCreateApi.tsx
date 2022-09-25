import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type GetLebal = {
	color: string;
	default: boolean;
	description: string;
	id: number;
	name: string;
	node_id: string;
	url: string;
};

type Parameter = {
	name: string;
	repo: string;
	token: string;
};

interface CreateLabel {
	id: number;
	node_id: string;
	url: string;
	name: string;
	color: string;
	default: boolean;
	description: string;
}

type CreateLabelParameter = {
	name: string;
	repo: string;
	token: string;
	createLabelName: string;
	createLabelColor: string;
	createLabelDescription: string;
};

type UpdateLabelParameter = {
	name: string;
	repo: string;
	token: string;
	labelName: string;
	createLabelName: string;
	createLabelColor: string;
	createLabelDescription: string;
};

type DeleteLabelParameter = {
	name: string;
	repo: string;
	token: string;
	labelName: string;
};

export const createLabelApi = createApi({
	reducerPath: 'createLabelApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.github.com/repos'
	}),
	tagTypes: ['labels'],
	endpoints: builder => ({
		getAllLabels: builder.query<GetLebal[], Parameter>({
			query: ({ name, repo, token }) => ({
				url: `/${name}/${repo}/labels`,
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `token ${token}`
				})
			}),
			providesTags: ['labels']
		}),
		createLabels: builder.mutation<CreateLabel, CreateLabelParameter>({
			query: ({
				name,
				repo,
				token,
				createLabelName,
				createLabelColor,
				createLabelDescription
			}) => ({
				url: `/${name}/${repo}/labels`,
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `token ${token}`,
					Accept: 'application/vnd.github+json'
				}),
				body: {
					name: createLabelName,
					color: createLabelColor,
					description: createLabelDescription
				}
			}),
			invalidatesTags: ['labels']
		}),
		updateLabels: builder.mutation<CreateLabel, UpdateLabelParameter>({
			query: ({
				name,
				repo,
				token,
				labelName,
				createLabelName,
				createLabelColor,
				createLabelDescription
			}) => ({
				url: `/${name}/${repo}/labels/${labelName}`,
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `token ${token}`,
					Accept: 'application/vnd.github+json'
				}),
				body: {
					name: createLabelName,
					color: createLabelColor,
					description: createLabelDescription
				}
			}),
			invalidatesTags: ['labels']
		}),
		deleteLabels: builder.mutation<CreateLabel, DeleteLabelParameter>({
			query: ({ name, repo, labelName, token }) => ({
				url: `/${name}/${repo}/labels/${labelName}`,
				method: 'DELETE',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `token ${token}`,
					Accept: 'application/vnd.github+json'
				})
			}),
			invalidatesTags: ['labels']
		})
	})
});

export const { useGetAllLabelsQuery } = createLabelApi;

export const { useCreateLabelsMutation } = createLabelApi;

export const { useUpdateLabelsMutation } = createLabelApi;

export const { useDeleteLabelsMutation } = createLabelApi;
