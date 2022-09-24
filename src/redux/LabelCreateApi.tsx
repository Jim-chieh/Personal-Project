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
};

export const createLabelApi = createApi({
	reducerPath: 'createLabelApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.github.com/repos'
	}),
	endpoints: builder => ({
		getAllLabels: builder.query<GetLebal[], Parameter>({
			query: ({ name, repo }) => ({
				url: `/${name}/${repo}/labels`,
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: 'token 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'
				})
			})
		})
	})
});

// pokemonApi 會帶有 useGetPokemonByNameQuery 的方法，可以直接呼叫
export const { useGetAllLabelsQuery } = createLabelApi;
