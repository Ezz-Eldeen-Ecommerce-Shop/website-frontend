import { useState, createContext, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlistContext = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlistContext must be used within a WishlistProvider");
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [cartList, setCartList] = useState([]);

    // const initialCartNumber = cartList.length;
    const [numberOfCartItems, setNumberOfCartItems] = useState(cartList.lengh);
    const [numberOfFavorites, setNumberOfFavorites] = useState(favorites.lengh);

    useEffect(() => {
        try {
            const storedFavs = localStorage.getItem("favorites");
            if (storedFavs) setFavorites(JSON.parse(storedFavs));
        } catch (error) {
            console.error("Error reading from localStorage", error);
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                localStorage.setItem("favorites", JSON.stringify(favorites));
                setNumberOfFavorites(favorites.length);
            } catch (error) {
                console.error("Error writing to localStorage", error);
            }
        }, 300);

    

        return () => clearTimeout(timeout);
    }, [favorites]);


    useEffect(() => {
        try {
            const storedcarts = localStorage.getItem("cartkey");
            if (storedcarts) setCartList(JSON.parse(storedcarts));
        } catch (error) {
            console.error("Error reading from localStorage", error);
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                localStorage.setItem("cartkey", JSON.stringify(cartList));
                setNumberOfCartItems(cartList.length);
            } catch (error) {
                console.error("Error writing to localStorage", error);
            }
        }, 300);

    

        return () => clearTimeout(timeout);
    }, [cartList]);

    const addToFavorites = (item) => {
        setFavorites((prev) =>[...prev, item]);
    };

    const removeFromFavorites = (itemId) => {
        setFavorites((prev) => prev.filter((item) => item.id !== itemId));
    };

    const isFavorite = (itemId) => {
        return favorites.some((item) => item.id === itemId);
    };



    const addToCart = (item) => {
        setCartList((prev) =>[...prev, item]);
    };

    const removeFromCart = (itemId) => {
        setCartList((prev) => prev.filter((item) => item.id !== itemId));
    };

    const isInCart = (itemId) => {
        return cartList.some((item) => item.id === itemId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        cartList,
        addToCart,
        removeFromCart,
        isInCart,
        numberOfCartItems,
        numberOfFavorites
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};


//git add .
//git commit -m "message"
//git push 
//git pull > git push -f
