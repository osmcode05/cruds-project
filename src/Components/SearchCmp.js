import { useContext, useRef } from "react";
import { AppContext } from "../App";

export default function SearchCmp() {
  const { search, setSearch, setSearchBy, searchBy } = useContext(AppContext);
  const inpRef = useRef(null);

  const handleSearchBy = (type) => {
    inpRef.current.focus();
    setSearchBy(`Search by ${type}`);
  };

  return (
    <div>
      <input
        ref={inpRef}
        type="text"
        placeholder={searchBy || "Search"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row_btn">
        {["Title", "Category"].map((type) => (
          <button key={type} onClick={() => handleSearchBy(type)}>
            Search by {type}
          </button>
        ))}
      </div>
    </div>
  );
}
