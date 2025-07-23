import { useContext } from "react";
import { AppContext } from "../App";
import { FaTrash, FaPen } from "react-icons/fa";

export default function ReadDataCmp() {
  const { products, handleDeleteItem, handleEditItem } = useContext(AppContext);

  const headers = [
    "Id",
    "Title",
    "Price",
    "Taxes",
    "Ads",
    "Discount",
    "Total",
    "Category",
    "Edit",
    "Delete",
  ];

  return (
    <table>
      <thead>
        <tr>
          {headers.map((h) => (
            <td key={h}>{h}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map((p, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{p.title}</td>
              {["price", "taxes", "ads", "discount", "total"].map((f) => (
                <td key={f}>{p[f] || 0}</td>
              ))}
              <td>{p.category}</td>
              <td>
                <FaPen onClick={() => handleEditItem(i)} />
              </td>
              <td>
                <FaTrash onClick={() => handleDeleteItem(i)} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="No_Product">
              <i>No Products</i>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
