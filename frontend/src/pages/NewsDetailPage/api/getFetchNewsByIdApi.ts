import { rtkApi } from "@/shared/api/rtkApi";
import {INewsCardItem} from "@/entities/News";

const fetchNewsByIdApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNewsById: build.query<INewsCardItem, any>({
            query: (params) => ({
                url: `/news/${params.id}`,
            }),
        }),
    }),
});

export const useGetNewsById = fetchNewsByIdApi.useGetNewsByIdQuery;
