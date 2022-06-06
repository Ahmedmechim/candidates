import React from "react"
import Inputs from "./Inputs"
import Infos from "./Infos"
import Botton from "../UI/Botton"
import ProductsFilter from "./ProductsFilter"

const Card = () => {
    return (
        <section className="card w-[360px] h-[626px] sm:w-[560px] sm:h-[511px] flex flex-col items-center  bg-[#FFFFFF] ">
            <ProductsFilter />
            <Inputs />
            <Infos />
            <Botton>Apply Now</Botton>
        </section>
    )
}

export default Card
