import React from "react"
import { useProductsContext } from "../context/ProductContext"
const ProductsFilter = () => {
    const { products, currentProductId, updateCurrentProduct } = useProductsContext()
    return (
        <header className="products flex h-[86px] justify-center items-center mt-[27px]">
            {products.map((product) => {
                const { id, image, name } = product
                return (
                    <div
                        className={
                            currentProductId === id ? "border cursor-pointer" : "cursor-pointer"
                        }
                        key={id}
                        onClick={() => {
                            updateCurrentProduct(id)
                        }}>
                        <img className="w-[86px] h-[86px]" src={image} alt={name} />
                    </div>
                )
            })}
        </header>
    )
}

export default ProductsFilter
