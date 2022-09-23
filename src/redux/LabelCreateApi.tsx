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

// 透過 createApi 可以建立 RTK query 的 API service，取名為 pokemonApi
export const createLabelApi = createApi({
	reducerPath: 'createLabelApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.github.com'
	}),
	endpoints: builder => ({
		getAllLabels: builder.query({
			query: name => `/repos/${name}/Personal-Project/labels`
		})
	})
});

// pokemonApi 會帶有 useGetPokemonByNameQuery 的方法，可以直接呼叫
export const { useGetAllLabelsQuery } = createLabelApi;
