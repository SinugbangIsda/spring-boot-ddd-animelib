import { 
    createApi, 
    fetchBaseQuery 
} from "@reduxjs/toolkit/query/react";
import { BASE_URLS } from "../../constants";
import { getUserAndToken } from "../slices/authSlice";

export const animeApi = createApi({
    reducerPath: "animeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URLS.api}/anime`,
        prepareHeaders: (headers) => {
            const { token } = getUserAndToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllAnime: builder.query({
            query: () => ({
                url: "/",
                method: "GET",                                          
                mode: "cors",
            })
        }),
        getAnimeById: builder.query({
            query: ({ animeId }) => ({
                url: `/${animeId}`,
                method: "GET",
                mode: "cors",
            })
        }),
        checkIfAnimeInWatchlist: builder.query({
            query: ({ animeId, userId }) => ({
                url: `/${animeId}/check/${userId}`,
                method: "GET",
                mode: "cors"
            })
        }),
        createAnime: builder.mutation({
            query: (body) => ({
                url: "/add",
                method: "POST",
                body: JSON.stringify(body),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }),
        updateAnime: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: "PUT",
                body: JSON.stringify(body),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }),
        deleteAnime: builder.mutation({
            query: ({ animeId }) => ({
                url: `/${animeId}`,
                method: "DELETE",
                mode: "cors",
            })
        })
    })
});

export const {
    useGetAllAnimeQuery,
    useGetAnimeByIdQuery,
    useCheckIfAnimeInWatchlistQuery,
    useCreateAnimeMutation,
    useUpdateAnimeMutation,
    useDeleteAnimeMutation
} = animeApi;