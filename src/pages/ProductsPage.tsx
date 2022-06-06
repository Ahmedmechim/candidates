import Card from "@components/Card"
import Title from "@components/Title"
import React from "react"
import { useProductsContext } from "../context/ProductContext"

const Products = () => {
    const { isLoading, isError } = useProductsContext()
    if (isLoading)
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h1>Loading....</h1>
                {}
            </div>
        )
    if (isError)
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h1>failed to get the data please try later</h1>
                {}
            </div>
        )
    return (
        <section>
            <div className="w-full h-full flex flex-col justify-center items-center bg-[#E5E5E5]">
                <Title />
                <Card />
            </div>
        </section>
    )
}

export default Products
