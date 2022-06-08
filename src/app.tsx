import React from "react"
import ReactDOM from "react-dom"
import { ProductsContextProvider, useProductsContext } from "./context/ProductContext"
import "./index.css"
import Products from "./pages/ProductsPage"

const App = () => {
    return (
        <div className="app">
            <Products />
        </div>
    )
}

ReactDOM.render(
    <ProductsContextProvider>
        <App />
    </ProductsContextProvider>,
    document.getElementById("root")
)
