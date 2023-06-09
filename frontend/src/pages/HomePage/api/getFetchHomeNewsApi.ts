import { rtkApi } from "@/shared/api/rtkApi";
import {INewsCardItem} from "@/entities/News";

const fetchHomeNewsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getHomeNews: build.query<INewsCardItem[], any>({
            query: () => ({
                url: "/news",
            }),
        }),
    }),
});

export const useNewsHome = fetchHomeNewsApi.useGetHomeNewsQuery;
