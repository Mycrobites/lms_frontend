const Pagination = ({ totalPages, handlePages, currentPage }) => {
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
  return (
    <div className="pagination">
      <button
        onClick={() => handlePages(currentPage - 1)}
        disabled={currentPage === 0}
        className="next-btn"
      >
        Prev
      </button>
      <div className="pagination-btn">
        {pages.map((num) => (
          <button
            key={num}
            onClick={() => handlePages(num - 1)}
            className={currentPage === num - 1 ? "active" : null}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePages(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="prev-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
