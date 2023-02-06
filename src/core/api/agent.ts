import { BalanceData } from "@/components/safe/models/balance-data";
import { SafeData } from "@/components/safe/models/safe-data";
import { SafesList } from "@/components/safe/models/safes";
import { Transaction } from "@/components/transactions/models/transaction";
import axios, { AxiosError, AxiosResponse } from "axios";
import { EtherScanTransactionResponse } from "../models/etherscan-transaction-response";
import { PaginatedResult } from "../models/pagination";
import { rootStore } from "../root-store";

var axiosApiForEtherscan = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ETHERSCAN_API_URL,
    timeout: 1000,
});

var axiosApiForGnosisSafe = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GNOSIS_SAFE_API_URL,
    timeout: 1000,
});

axios.interceptors.request.use((request) => {
    rootStore.transactionStore.setLoading(true);
    return request;
}),
    axios.interceptors.response.use(
        async (response) => {
            rootStore.transactionStore.setLoading(false);
            const pagination = response.headers["pagination"];
            if (pagination) {
                response.data = new PaginatedResult(
                    response.data,
                    JSON.parse(pagination)
                );
                return response as AxiosResponse<PaginatedResult<any>>;
            }
            return response;
        },
        (error: AxiosError) => {
            if (error.response) {
                const { status } = error.response;
                switch (status) {
                    case 400:
                        console.log("400");
                        break;
                    case 401:
                        console.log("401");
                        break;
                    case 422:
                        console.log("422");
                        break;
                    case 500:
                        console.log("422");
                        break;
                    default:
                        break;
                }
                return Promise.reject(error);
            }
        }
    );

const decodeUrl = (url: string) => {
    console.log(url.replace("%20", ""));

    return url.replace("%20", "")
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axiosApiForEtherscan.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axiosApiForEtherscan.post<T>(url, body).then(responseBody),
    put: <T>(id: string, body: {}) => axiosApiForEtherscan.put<T>(id, body).then(responseBody),
    delete: <T>(url: string) => axiosApiForEtherscan.delete<T>(url).then(responseBody),
};

const EtherScan = {
    getAll: (address: string, offset: number, page: number) => request
        .get<EtherScanTransactionResponse>(`?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${process.env.NEXT_PUBLIC_API_KEY}`),
};

const GnosisSafe = {
    checkIfHasSafeAndOwner: (address: string) => axiosApiForGnosisSafe
        .get<SafesList>(`/owners/${address}/safes/`).then(responseBody),
    getSafeDataByAddress: (safeAddress: string) => axiosApiForGnosisSafe
        .get<SafeData>(`/safes/${safeAddress}/`).then(responseBody),
    getSafeBalanceByAddress: (safeAddress: string) => axiosApiForGnosisSafe
        .get<BalanceData[]>(`/safes/${safeAddress}/balances/?trusted=true&exclude_spam=true`).then(responseBody),
};

const agent = {
    EtherScan,
    GnosisSafe
};

export default agent;