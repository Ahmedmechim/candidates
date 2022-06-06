import React from "react"
import { useProductsContext } from "../context/ProductContext"

const Infos = () => {
    const { monthlyAmount, months, loanAmount, targetMonth, totalAmount } = useProductsContext()
    return (
        <div className="monthlyAmount_info sm:w-[480px] w-[312px] h-[155px] flex flex-col justify-center mt-[24px] border-[1px] rounded-[8px]">
            <div className="monthlyAmount sm:w-[480px] w-[312px] h-[75px] flex justify-between items-center">
                <p className="font-['work sans'] not-italic font-[400] text-[20px] leading-[120%] ml-[32px]">
                    Monthly amount
                </p>
                <p className="font-['Rubik'] not-italic font-[500] text-[32px] leading-[120%] text-[#0079FF] mr-[32px]">
                    {`$${Math.floor(monthlyAmount)}`}
                </p>
            </div>
            <p className="detail font-['work sans'] not-italic font-[400] text-[12px] leading-[14px] py-[24px] px-[35px] text-center bg-[#F4F8FA]">
                {` You’re planning ${months} `}
                <b> monthly deposits</b> to reach your{" "}
                <b>{`$${loanAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</b> goal by
                <b>
                    {" "}
                    {`${targetMonth.toLocaleDateString("default", {
                        month: "long",
                    })} ${targetMonth.getFullYear()}.`}
                </b>{" "}
                The total amount loaned will be{" "}
                <b>{`$${totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</b>
            </p>
        </div>
    )
}

export default Infos
