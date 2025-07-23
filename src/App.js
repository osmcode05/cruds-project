import { useEffect, useState, createContext, useCallback } from "react";
import CreateCmp from "./Components/CreateCmp";
import SearchCmp from "./Components/SearchCmp";
import ReadDataCmp from "./Components/ReadDataCmp";

export const AppContext = createContext();

const defaultProduct = {
  title: "",
  price: "",
  taxes: "",
  ads: "",
  discount: "",
  total: 0,
  count: "",
  category: "",
};

export default function App() {
  const [products, setProducts] = useState(
    localStorage.UserProducts ? JSON.parse(localStorage.UserProducts) : []
  );
  const [product, setProduct] = useState(defaultProduct);
  const [mood, setMood] = useState("Create");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");

  useEffect(() => {
    localStorage.setItem("UserProducts", JSON.stringify(products));
  }, [products]);

  const calculateTotal = useCallback((updatedProduct) => {
    const { price = 0, taxes = 0, ads = 0, discount = 0 } = updatedProduct;
    setProduct(() => ({
      ...updatedProduct,
      total: +price + +taxes + +ads - +discount,
    }));
  }, []);

const createEditClick = useCallback(() => {
  if (!product.title || !product.price || !product.category) {
    return alert("Please enter title, price, and category");
  }

  if (mood === "Create") {
    // Create multiple products when count > 1
    const newProducts = Array.from({ length: product.count || 1 }, () => ({
      ...product,
    }));
    setProducts((prev) => [...prev, ...newProducts]);
  } else {
    // Edit mode - only update the single product
    setProducts((prev) => prev.map((p, i) => (i === editIndex ? product : p)));
    setMood("Create");
  }
  setProduct(defaultProduct);
}, [product, mood]);

  const handleDeleteItem = useCallback((index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleEditItem = useCallback(
    (index) => {
      editIndex = index;
      setProduct(products[index]);
      setMood("Edit");
    },
    [products]
  );

  const handleDeleteAll = useCallback(() => {
    setProducts([]);
    setProduct(defaultProduct);
    setMood("Create");
    setSearch("");
    setSearchBy("");
  }, []);

  const filteredProducts = products.filter((p) =>
    (searchBy === "Search by Category" ? p.category : p.title)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const contextValue = {
    product,
    setProduct,
    mood,
    createEditClick,
    calculateTotal,
    search,
    setSearch,
    searchBy,
    setSearchBy,
    products: filteredProducts,
    handleDeleteItem,
    handleEditItem,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <section>
        <CreateCmp />
        {products.length > 0 && (
          <>
            <SearchCmp />
            <button onClick={handleDeleteAll}>
              Delete All ({products.length})
            </button>
          </>
        )}
        <ReadDataCmp />
      </section>
    </AppContext.Provider>
  );
}

let editIndex;