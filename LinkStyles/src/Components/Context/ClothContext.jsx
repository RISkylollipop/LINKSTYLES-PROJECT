import { createContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

export const ClothContext = createContext();

export default function ClothContextProvider({ children }) {
  const URL = "https://linkstyles-project-production.up.railway.app";

  // Load Cart
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(savedCart)
      ? savedCart.map(item => ({
          ...item,
          quantity: item.quantity || 1,
        }))
      : [];
  });

  // Currency symbol
  const [symbol, setSymbol] = useState("₦");

  useEffect(() => {
    let mounted = true;

    fetch(`${URL}/api/location`)
      .then(res => res.json())
      .then(data => {
        if (mounted) {
          setSymbol(data.currency_symbol || "₦");
        }
      })
      .catch(err => console.log("Location error:", err));

    return () => (mounted = false);
  }, []);

  // Save cart anytime changes occur
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cart count
  const cartCount = useMemo(() => cart.length, [cart]);

  // Add to cart
  function addToCart(product) {
    const exists = cart.some(item => item.product_id === product.product_id);

    if (exists) {
      toast.info(`${product.productName} already in cart`);
      return;
    }

    const updatedCart = [
      ...cart,
      { ...product, quantity: 1, totalPrice: product.price },
    ];

    setCart(updatedCart);
    toast.success(`${product.productName} added to cart`);
  }

  // REMOVE
  function removeFromCart(productID) {
    const updatedCart = cart.filter(item => item.product_id !== productID);
    setCart(updatedCart);
    toast.info(`Item removed from cart`);
  }

  // ADD QUANTITY
  function addQuantity(productID) {
    setCart(c =>
      c.map(item =>
        item.product_id === productID
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // REMOVE QUANTITY
  function removeQuantity(productID) {
    setCart(c =>
      c
        .map(item =>
          item.product_id === productID
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  // TOTAL PRICE
  const totalCartPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const contextValue = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    addQuantity,
    removeQuantity,
    totalCartPrice,
    symbol : new Intl.NumberFormat(en-NG).format(symbol),
  };

  return (
    <ClothContext.Provider value={contextValue}>
      {children}
    </ClothContext.Provider>
  );
}
