import React from "react";

const IssueList = ({ issues, toggleHighlight, highlight }) => {
  return (
    <>
      <ul className="verticalLeft">
        {issues.length < 1 ? (
          <div>...loading...</div>
        ) : (
          issues.map((item) => (
            <li
              key={item.id}
              onClick={() => toggleHighlight(item.id, item.title)}
              className="horizontalLeft"
            >
              {item.id == highlight.id && highlight.isHighlighted ? (
                <mark>
                  {item.id} - {item.title}
                </mark>
              ) : (
                <>
                  {item.id} - {item.title}
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default IssueList;
