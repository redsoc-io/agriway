import React from "react";
import Product from "./ProductUnit";

export default class Products extends React.Component {
    state = {
        products: []
    }
    async getProducts() {
        const response = await fetch("/api/for_sale");
        const json = await response.json();
        this.setState({ products: json || [] })
    }
    componentDidMount() {
        this.getProducts()
    }
    render() {
        return (
            <div className="w-full">
                <h1 className="flex items-center justify-center text-3xl py-5">
                    Products
                </h1>
                <div className="flex items-center justify-start flex-wrap w-full">
                    {this.state.products.filter(a => {
                        return a.name.toLowerCase().includes(this.props.search.toLowerCase())
                    }).map((product) => (
                        <Product
                            size={"lg:w-1/4 w-full"}
                            url={`/products/${product.photo_name}`}
                            productURL="/"
                            price={product.price + product.product_id}
                            name={product.name}
                            product_id={product.product_id}
                            key={`product-${product.product_id}`}
                        />
                    ))}
                </div>
            </div>
        )
    }
}