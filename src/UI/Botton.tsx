import React from "react"
type props = {
    children: React.ReactNode
}
const Botton = ({ children }: props) => {
    return (
        <button className="w-[320px] h-[56px] rounded-[32px] mt-[35px] bg-[#1B31A8] font-['work sans'] font-[600] text-[16px] leading-[20px] text-[#FFFFFF]">
            {children}
        </button>
    )
}

export default Botton
