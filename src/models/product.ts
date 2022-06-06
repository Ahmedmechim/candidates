class Product {
    id: string
    intrest: string
    name: string
    min_amount: string
    max_amount: string
    min_tenure: string
    max_tenure: string
    image: string
    constructor() {
        this.id = ""
        this.intrest = ""
        this.name = ""
        this.min_amount = "0"
        this.max_amount = "0"
        this.min_tenure = "0"
        this.max_tenure = "0"
        this.image = ""
    }
}

export default Product
