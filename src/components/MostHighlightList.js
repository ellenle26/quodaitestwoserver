import React from "react";

const MostHighlightList = ({ mostHighlight, count }) => {
  return (
    <div className="verticalLeft">
      <div className="horizontalLeft">
        <div style={{ position: "relative" }}>
          <img
            className="noti"
            src="https://freeiconshop.com/wp-content/uploads/edd/notification-outline.png"
            alt="notification"
            style={{ width: "30px" }}
          />
          {count == 0 ? (
            <></>
          ) : (
            <div className="counter horizontalCenter">
              <span id="count">{count}</span>
            </div>
          )}
        </div>
        <h4> Most highlighted:</h4>
      </div>
      <ol style={{ maxWidth: "600px" }}>
        {mostHighlight &&
          mostHighlight.length > 0 &&
          mostHighlight.map((item) => (
            <li>
              {item.id} - {item.title}
            </li>
          ))}
      </ol>
    </div>
  );
};

export default MostHighlightList;
