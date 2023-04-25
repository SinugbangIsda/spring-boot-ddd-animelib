import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URLS } from "../../constants";
import { getUserAndToken } from "../slices/authSlice";

export const watchlistApi = createApi({
    reducerPath: "watchlistApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URLS.api}/watchlist`,
        prepareHeaders: (headers) => {
            const { token } = getUserAndToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllWatchlistByUserId: builder.query({
            query: (body) => ({
                url: `/${body.userId}`,
                method: "GET",
                mode: "cors",
            })
        }),
        createWatchlist: builder.mutation({
            query: (body) => ({
                url: `/add`,
                method: "POST",
                body: JSON.stringify(body),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }),
        deleteWatchlist: builder.mutation({
            query: (body) => ({
                url: `/${body.userId}/${body.animeId}`,
                method: "DELETE",
                mode: "cors",
            })
        })
    })
});

export const {
    useGetAllWatchlistByUserIdQuery,
    useCreateWatchlistMutation,
    useDeleteWatchlistMutation
} = watchlistApi;
        