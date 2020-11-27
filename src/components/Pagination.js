import React from "react";

const Pagination = ({ goToPage, totalPage, page }) => {
  return (
    <>
      <div className="horizontalCenter">
        <button onClick={() => goToPage("prev")}>Previous</button>&nbsp;
        <button onClick={() => goToPage("next")}>Next</button>
      </div>
      <p className="horizontalCenter">
        Total page: {totalPage} - Current page: {page}
      </p>
    </>
  );
};

export default Pagination;
