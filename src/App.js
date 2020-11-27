import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import socketIOClient from "socket.io-client";
import IssueList from "./components/IssueList";
import Pagination from "./components/Pagination";
import MostHighlightList from "./components/MostHighlightList";

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
  let [serverData, setServerData] = useState();

  //connect to server socket
  const socketConnect = () => {
    socket = socketIOClient("https://quodaitest.herokuapp.com/");
  };

  //get total pages
  const getAllIssues = async (page) => {
    const url = `https://api.github.com/repos/rails/rails/issues`;
    const res = await fetch(url);
    const data = await res.json();
    let pages = Math.ceil(data.length / 5);
    setTotalPage(pages);
    console.log(pages);
  };

  //get issue by page
  const getIssuesByPage = async (page) => {
    const url = `https://api.github.com/repos/rails/rails/issues?page=${page}&per_page=5`;
    const res = await fetch(url);
    const data = await res.json();
    setIssues(data);
    console.log(data);
  };

  //change page
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

  let [count, setCount] = useState(0);

  // toggle highlight and add to most highlight list
  const toggleHighlight = (id, title) => {
    setHighlight({ id: id, isHighlighted: !highlight.isHighlighted });
    if (!highlight.isHighlighted) {
      socket.emit("add highlight", { id, title, count });
      socket.on("receive", function (data) {
        console.log(data, "client");
        setServerData(data);
        addHighlight(data.id, data.title);
        setCount(data.newCount);
        console.log(count);
      });
    }
  };

  //check if issue already in hightlight, then move to top
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
    checkDoublicate(id);
    if (mostHighlightList.length >= 5) {
      mostHighlightList.unshift({ id, title });
      mostHighlightList.pop();
    } else {
      mostHighlightList.unshift({ id, title });
    }
    setMostHighlightList(mostHighlightList);
    dispatch({ type: "ADD_HIGHLIGHT", payload: mostHighlightList });
  };

  useEffect(() => {
    socketConnect();
    getAllIssues();
    getIssuesByPage(page);
  }, [page, mostHighlightList, serverData]);

  return (
    <div className="verticalCenter">
      <img
        src="https://miro.medium.com/max/2250/1*aFHTAkhTkyWD93-UGRttPw.png"
        alt="logo"
      />
      <div>
        <IssueList
          issues={issues}
          toggleHighlight={toggleHighlight}
          highlight={highlight}
        />
        <br />
        <Pagination goToPage={goToPage} totalPage={totalPage} page={page} />
        <MostHighlightList mostHighlight={mostHighlight} count={count} />
      </div>
    </div>
  );
}

export default App;
