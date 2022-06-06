import { intialState } from "../context/ProductContext"
import {
    CALCULATE_VARIABLES,
    DECREASE_MONTHS,
    GET_ALL_PRODUCTS,
    INCREASE_MONTHS,
    ISError,
    ISLOADING,
    SET_CURRENT_PRODUCT,
    UPDATE_AMOUNT_INPUT_VALUE,
    UPDATE_CURRENT_PRODUCT,
    UPDATE_LOAN_AMOUNT,
} from "./action"

import Product from "../models/product"

// reducer action and state type
type State = typeof intialState
interface Action {
    type: string
    payload?: any
}
export const reducer = (state: State, action: Action): State | any => {
    switch (action.type) {
        // start loading
        case ISLOADING:
            return { ...state, isLoading: true, isError: false }
        // error case
        case ISError:
            return { ...state, isError: true, isLoading: false }
        // get products success
        case GET_ALL_PRODUCTS:
            return { ...state, products: action.payload, isLoading: false }

        // intialize current product
        case SET_CURRENT_PRODUCT:
            return {
                ...state,
                currentProductId: action.payload.id,
                minAmount: parseFloat(action.payload.min_amount),
                maxAmount: parseFloat(action.payload.max_amount),
                maxTenure: parseInt(action.payload.max_tenure),
                minTenure: parseFloat(action.payload.min_tenure),
                interest: parseFloat(action.payload.interest),
                loanAmount: parseFloat(action.payload.min_amount),
                months: parseFloat(action.payload.min_tenure),
                loanAmountInputValue: parseFloat(action.payload.min_amount)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }
        // handle changing product
        case UPDATE_CURRENT_PRODUCT:
            // get the new current product from from products
            let currentProduct = state.products.find(
                (product: Product) => product.id === action.payload
            )
            // case product exist (correct id)
            if (currentProduct) {
                return {
                    ...state,
                    currentProductId: currentProduct["id"],
                    minTenure: parseFloat(currentProduct["min_tenure"]),
                    maxTenure: parseFloat(currentProduct["max_tenure"]),
                    maxAmount: parseFloat(currentProduct["max_amount"]),
                    minAmount: parseFloat(currentProduct["min_amount"]),
                    loanAmountInputValue: parseFloat(currentProduct["min_amount"])
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    interest: parseInt(currentProduct["interest"]),
                    loanAmount: parseInt(currentProduct["min_amount"]),
                    months: parseInt(currentProduct["min_tenure"]),
                }
                // case product does not exist(wrong id)
            } else {
                throw new Error(`there is no product with the provided id : ${action.payload}`)
            }
        // handle amout input change
        case UPDATE_AMOUNT_INPUT_VALUE:
            let newInputValue: string
            newInputValue = action.payload
            // repect max amount condition
            if (parseFloat(newInputValue.replace(",", "")) > state.maxAmount) {
                newInputValue = state.maxAmount.toString()
            }
            // using regex to make input accept only number and add seperator
            return {
                ...state,
                loanAmountInputValue: newInputValue
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }

        // update amount
        case UPDATE_LOAN_AMOUNT:
            let newAmount: number
            newAmount = parseFloat(action.payload)
            // respect min amount condition
            if (newAmount < state.minAmount) {
                newAmount = state.minAmount
            }
            // respect maxAmount condition
            else if (newAmount > state.maxAmount) {
                newAmount = state.maxAmount
            }
            if (!action.payload) {
                newAmount = state.minAmount
            }
            // usinf regex to add sperator for input value
            return {
                ...state,
                loanAmount: newAmount,
                loanAmountInputValue: newAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }

        // handle months changes
        // increase
        case INCREASE_MONTHS:
            let theMonths: number
            theMonths = state.months
            theMonths++
            // respect max tenure condition
            if (theMonths > state.maxTenure) {
                theMonths = state.maxTenure
            }
            return { ...state, months: theMonths }

        // decrease
        case DECREASE_MONTHS:
            let newMonths: number
            newMonths = state.months
            newMonths--
            // respect min tenure condition
            if (newMonths < state.minTenure) {
                newMonths = state.minTenure
            }
            return { ...state, months: newMonths }

        // updating variables
        case CALCULATE_VARIABLES:
            let totalAmount: number
            let monthlyAmount: number
            let targetDate: Date
            // calculate toatal amount
            totalAmount = state.loanAmount + state.loanAmount * state.interest * 0.01
            // calculate monthly amount
            monthlyAmount = totalAmount / state.months
            targetDate = new Date()
            targetDate.setMonth(targetDate.getMonth() + state.months)

            return { ...state, monthlyAmount, totalAmount, targetMonth: targetDate }

        default:
            throw new Error(`there is no such action ${action.type}`)
    }
}
