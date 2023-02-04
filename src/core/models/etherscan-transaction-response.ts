import { Transaction } from "@/components/transactions/models/transaction"

export type EtherScanTransactionResponse = {
    message: string,
    result: Transaction[]
}