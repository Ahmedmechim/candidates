import React, { useContext, useEffect, useReducer } from "react"
import Product from "src/models/product"
import axios from "axios"
import { reducer } from "../Reducer/productReducer"
// import actions
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
} from "../Reducer/action"
// create products context
const ProductsContext = React.createContext<{
    currentProductId: string
    products: Product[]
    minAmount: number
    maxAmount: number
    minTenure: number
    maxTenure: number
    interest: number
    isLoading: boolean
    isError: boolean
    loanAmount: number
    loanAmountInputValue: string
    months: number
    totalAmount: number
    monthlyAmount: number
    targetMonth: Date

    updateCurrentProduct: (id: string) => void
    updateAmountInputValue: (amount: string) => void
    updateLoanAmount: (amount: string) => void
    increaseMonths: () => void
    decreaseMonths: () => void
}>({
    currentProductId: "",
    products: [],
    minAmount: 0,
    maxAmount: 0,
    minTenure: 0,
    maxTenure: 0,
    interest: 0,
    isLoading: false,
    isError: false,
    loanAmount: 0,
    months: 0,
    monthlyAmount: 0,
    totalAmount: 0,
    loanAmountInputValue: "",
    targetMonth: new Date(),

    updateCurrentProduct: (id: string) => {},
    updateAmountInputValue: (amount: string) => {},
    updateLoanAmount: (amount: string) => {},
    increaseMonths: () => {},
    decreaseMonths: () => {},
})

// useReducer intial state
export const intialState = {
    currentProductId: "",
    products: [],
    interest: 0,
    minAmount: 0,
    maxAmount: 0,
    minTenure: 0,
    maxTenure: 0,
    isLoading: false,
    isError: false,
    loanAmount: 0,
    months: 0,
    totalAmount: 0,
    monthlyAmount: 0,
    loanAmountInputValue: "",
    targetMonth: new Date(),
}
type props = {
    children: React.ReactNode
}
const ProductsContextProvider = ({ children }: props) => {
    const [state, dispatch] = useReducer(reducer, intialState)
    useEffect(() => {
        const fethProducts = () => {
            dispatch({ type: ISLOADING })
            try {
                axios.get("products.json").then((data) => {
                    let theData: Product[]
                    theData = data.data
                    dispatch({ type: GET_ALL_PRODUCTS, payload: data.data })
                    dispatch({ type: SET_CURRENT_PRODUCT, payload: theData[0] })
                })
            } catch (error) {
                dispatch({ type: ISError })
            }
        }

        fethProducts()
    }, [])

    useEffect(() => {
        if (state.loanAmount && state.months) {
            dispatch({ type: CALCULATE_VARIABLES })
        }
    }, [state.loanAmount, state.months])

    const updateCurrentProduct = (id: string) => {
        dispatch({ type: UPDATE_CURRENT_PRODUCT, payload: id })
    }

    const updateAmountInputValue = (amount: string) => {
        dispatch({ type: UPDATE_AMOUNT_INPUT_VALUE, payload: amount })
    }
    const updateLoanAmount = (amount: string) => {
        dispatch({ type: UPDATE_LOAN_AMOUNT, payload: amount })
    }

    const increaseMonths = () => {
        dispatch({ type: INCREASE_MONTHS })
    }

    const decreaseMonths = () => {
        dispatch({ type: DECREASE_MONTHS })
    }
    const contextValue = {
        ...state,
        updateCurrentProduct,
        updateLoanAmount,
        increaseMonths,
        decreaseMonths,
        updateAmountInputValue,
    }
    return <ProductsContext.Provider value={contextValue}>{children}</ProductsContext.Provider>
}

const useProductsContext = () => {
    return useContext(ProductsContext)
}

export { useProductsContext, ProductsContextProvider }
