import React, { useEffect, useState } from "react"
import { useProductsContext } from "../context/ProductContext"

const Inputs = () => {
    const {
        minAmount,
        maxAmount,
        loanAmount,
        updateLoanAmount,
        minTenure,
        maxTenure,
        increaseMonths,
        decreaseMonths,
        months,
        loanAmountInputValue,
        updateAmountInputValue,
    } = useProductsContext()

    return (
        <div className="inputs flex justify-center items-center flex-col sm:flex-row sm:flex sm:justify-center mt-[24px] ">
            <div>
                <p>Loan amount</p>
                <div className="sm:w-[272px] w-[312px] h-[56px] flex justify-center border-[1px] rounded-[4px]">
                    <button className="mr-[25px]">{"$"}</button>
                    <input
                        type="text"
                        name="amount"
                        id="amount"
                        min={minAmount}
                        max={maxAmount}
                        value={loanAmountInputValue}
                        onChange={(event) => {
                            updateAmountInputValue(event.target.value)
                        }}
                        onBlur={() => {
                            updateLoanAmount(loanAmountInputValue.replace(",", ""))
                        }}
                        pattern="[0-9.]+"
                    />
                </div>
            </div>
            <div className="mt-[16px] sm:ml-[16px] sm:mt-[0px]">
                <p>Number of Months</p>
                <div className="border-[1px] rounded-[4px] ">
                    <button
                        className="btn pl-[10px] pr-[10px]"
                        onClick={() => {
                            decreaseMonths()
                        }}>{`<`}</button>
                    <input
                        className="sm:w-[129px] w-[249px] h-[54px] text-center bg-white"
                        type="number"
                        name="month"
                        id="month"
                        value={months}
                        min={minTenure}
                        max={maxTenure}
                        disabled
                    />
                    <button
                        className="btn pl-[10px] pr-[10px] "
                        onClick={() => {
                            increaseMonths()
                        }}>
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Inputs
