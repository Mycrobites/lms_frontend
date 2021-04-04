const Pagination = ({ totalPages, handlePages, currentPage }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      <button
        onClick={() => handlePages(currentPage - 1)}
        disabled={currentPage === 1}
        className="next-btn"
      >
        Prev
      </button>
      <div className="pagination-btn">
        {pages.map((num) => (
          <button key={num} onClick={() => handlePages(num)}>
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePages(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="prev-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
