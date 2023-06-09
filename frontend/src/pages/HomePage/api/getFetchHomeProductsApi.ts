import { rtkApi } from "@/shared/api/rtkApi";

const fetchHomeProductsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getFetchHomeProducts: build.query({
            query: () => ({
                url: "/products",
            }),
        }),
    }),
});

export const useHomeProducts = fetchHomeProductsApi.useGetFetchHomeProductsQuery;
