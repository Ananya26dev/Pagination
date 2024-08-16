import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handleSelectpage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };
  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10));
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.map((item) => {
            return (
              <span className="products__single" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => handleSelectpage(page - 1)}
          >
            ◀
          </span>
          {/* windows+; */}
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                key={i}
                onClick={() => handleSelectpage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disable"}
            onClick={() => handleSelectpage(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
