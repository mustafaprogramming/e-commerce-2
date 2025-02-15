'use client'
import { createContext, useContext, useState } from 'react'
import { Product, blogs } from './data'

export type cartWishlist = (id: string) => void;
export type ChangeVal = (id: string, val: string) => void;
export type ChangeQuant = (id: string, operator: 'inc' | 'dec') => void;
const globalContext = createContext({})
export const useGlobalContext = () => useContext(globalContext)

const GlobalContext = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [products, setProducts] = useState(Product);
  
  const addToCart:cartWishlist=(id)=> {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, cart:!product.cart } : product
      )
    );
  }
  const addToWishlist:cartWishlist=(id)=> {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, wishlist:!product.wishlist } : product
      )
    );
  }
  const changeColor: ChangeVal = (id, color) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, color } : product
      )
    );
  };
  
  const changeSize: ChangeVal = (id, size) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, size } : product
      )
    );
  };
  const changeQuant:ChangeQuant=(id,operator)=> {
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
  const {totalItems,cartTotal}=cartProducts.reduce((total,cartItem)=>{
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
