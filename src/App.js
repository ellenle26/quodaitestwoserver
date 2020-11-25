import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import socketIOClient from "socket.io-client";

let socket;

function App() {
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [issues, setIssues] = useState([]);
  let [totalPage, setTotalPage] = useState();
  let [highlight, setHighlight] = useState({
    id: "",
    isHighlighted: false,
  });
  let [mostHighlightList, setMostHighlightList] = useState([]);
  const mostHighlight = useSelector((state) => state.mostHighlightList);

  const socketConnect = () => {
    socket = socketIOClient("http://localhost:5000");
  };

  const getAllIssues = async (page) => {
    const url = `https://api.github.com/repos/rails/rails/issues`;
    const res = await fetch(url);
    const data = await res.json();
    let pages = Math.ceil(data.length / 5);
    setTotalPage(pages);
    console.log(pages);
  };

  const getIssuesByPage = async (page) => {
    const url = `https://api.github.com/repos/rails/rails/issues?page=${page}&per_page=5`;
    const res = await fetch(url);
    const data = await res.json();
    setIssues(data);
    console.log(data);
  };

  const goToPage = (change) => {
    if (change === "prev") {
      let newPage = page - 1;
      if (newPage < 1) {
        setPage(totalPage);
      } else {
        setPage(newPage);
      }
    } else if (change === "next") {
      let newPage = page + 1;
      if (page >= totalPage) {
        setPage(1);
      } else {
        setPage(newPage);
        console.log(newPage);
      }
    }
    getIssuesByPage(page);
  };

  const toggleHighlight = (id, title) => {
    setHighlight({ id: id, isHighlighted: !highlight.isHighlighted });
    socket.emit("add highlight", { id, title });
    socket.on("receive", function (data) {
      console.log(data, "client");
      addHighlight(data.id, data.title);
    });
  };

  const checkDoublicate = (id) => {
    let idArr = [];
    mostHighlightList.forEach((item) => idArr.push(item.id));
    if (idArr.includes(id)) {
      mostHighlightList.splice(
        mostHighlightList.findIndex((item) => item.id == id),
        1
      );
    } else return;
  };

  const addHighlight = (id, title) => {
    if (!highlight.isHighlighted) {
      checkDoublicate(id);
      if (mostHighlightList.length >= 5) {
        mostHighlightList.unshift({ id, title });
        mostHighlightList.pop();
      } else {
        mostHighlightList.unshift({ id, title });
      }
      setMostHighlightList(mostHighlightList);
      dispatch({ type: "ADD_HIGHLIGHT", payload: mostHighlightList });
    } else return;
  };

  useEffect(() => {
    socketConnect();
    getAllIssues();
    getIssuesByPage(page);
  }, [page, mostHighlight]);

  return (
    <div>
      <ul>
        {issues &&
          issues.map((item) => (
            <li
              key={item.id}
              id={item.id.toString()}
              onClick={() => toggleHighlight(item.id, item.title)}
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
          ))}
      </ul>
      <div>
        <button onClick={() => goToPage("prev")}>Previous</button>
        <button onClick={() => goToPage("next")}>Next</button>
      </div>
      <div>
        Total page: {totalPage} - Current page: {page}&nbsp;
      </div>
      <div>
        <h4>Most highlighted:</h4>
        {mostHighlight &&
          mostHighlight.length > 0 &&
          mostHighlight.map((item) => (
            <div>
              {item.id} - {item.title}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
