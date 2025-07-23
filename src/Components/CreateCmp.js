import { useContext } from "react";
import { AppContext } from "../App";

export default function CreateCmp() {
  const { product, setProduct, mood, createEditClick, calculateTotal } =
    useContext(AppContext);

  const handleChange = (key, value) => {
    const newProduct = { ...product, [key]: value };
    if (["price", "taxes", "ads", "discount"].includes(key)) {
      calculateTotal(newProduct);
    } else {
      setProduct(newProduct);
    }
  };

  return (
    <div className="inputs">
      <input
        type="text"
        value={product.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Title"
        maxLength={20}
      />
      <div className="row_input">
        {["price", "taxes", "ads", "discount"].map((field) => (
          <input
            key={field}
            type="number"
            value={product[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
        <div
          id="total"
          style={{ backgroundColor: product.total > 0 ? "green" : "red" }}
        >
          Total: {product.total}
        </div>
      </div>
      {mood === "Create" && (
        <input
          type="number"
          value={product.count}
          onChange={(e) => handleChange("count", e.target.value)}
          placeholder="Count"
        />
      )}
      <input
        type="text"
        value={product.category}
        onChange={(e) => handleChange("category", e.target.value)}
        placeholder="Category"
      />
      <button onClick={createEditClick}>{mood}</button>
    </div>
  );
}
