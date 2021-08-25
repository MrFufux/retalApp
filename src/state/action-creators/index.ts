import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions/index"

export const depositMoney = (amount: number) => {
    return {
        type: ActionType.DEPOSIT,
        payload: amount
    }
}

export const withdrawMoney = (amount: number) => {
    return {
        type: ActionType.WITHDRAW,
        payload: amount
    }
}

export const bankrupt = () => {
    return {
        type: ActionType.BANKRUPT
    }
}
