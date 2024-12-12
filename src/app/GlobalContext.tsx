'use client'
import { createContext, useContext, useState } from 'react'
import { Product, blogs } from './data'

const globalContext = createContext({})
export const useGlobalContext = () => useContext(globalContext)

const GlobalContext = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [products, setProducts] = useState(Product);
  
  function addToCart( id:string) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, cart:!product.cart } : product
      )
    );
  }
  function addToWishlist( id:string) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, wishlist:!product.wishlist } : product
      )
    );
  }
  function changeColor( id:string,color: string) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, color } : product
      )
    );
  }
  function changeSize(id:string,size: string) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, size } : product
      )
    );
  }
  function changeQuant(id:string,operator: string) {
    setProducts((prev) => 
      prev.map((product) => {
        if (product.id === id) {
          const { quantity, stock } = product;
          switch (operator) {
            case 'inc':
              if (quantity < stock) {
                return { ...product, quantity: quantity + 1 };
              }
              break;
            case 'dec':
              if (quantity > 1) {
                return { ...product, quantity: quantity - 1 };
              }
              break;
            default:
              break;
          }
        }
        return product; // Return unchanged product if no condition matches
      })
    );
  }
  const cartProducts=products.filter(item=>item.cart);
  let {totalItems,cartTotal}=cartProducts.reduce((total,cartItem)=>{
  total.totalItems+=cartItem.quantity;
  total.cartTotal+=parseFloat((cartItem.price*cartItem.quantity).toFixed(2));
  return total
  },{
  totalItems:0,
  cartTotal:0
  })
  const data = {
    blogs,
    products,
    setProducts,
    changeColor,
    changeSize,
    changeQuant,
    addToCart,
    addToWishlist,
    totalItems,cartTotal,cartProducts
  }
  return (
    <globalContext.Provider value={data}>{children}</globalContext.Provider>
  )
}

export default GlobalContext
