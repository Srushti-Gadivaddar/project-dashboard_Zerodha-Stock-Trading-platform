import React, { useState, useContext } from "react";
import { watchlist } from "../Data/data";
import GeneralContext from "./GeneralContex";
import { Tooltip, Grow, formHelperTextClasses } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChart } from "./DoughnotChart";
import { data } from "react-router-dom";


const WatchList = () => {

  const labels = watchlist.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
          label: "Price",
          data: watchlist.map((stock) => stock.price),
          backgroundColor: [
            "rgba(255, 99, 132, 0.58)",
            "rgba(54, 162, 235, 0.58)",
            "rgba(255, 206, 86, 0.58)",
            "rgba(75, 192, 192, 0.58)",
            "rgba(153, 102, 255, 0.58)",
            "rgba(255, 159, 64, 0.58)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
    ]
  }

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Price",
  //         data: watchlist.map((stock) => stock.price),
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.5)",
  //           "rgba(54, 162, 235, 0.5)",
  //           "rgba(255, 206, 86, 0.5)",
  //           "rgba(75, 192, 192, 0.5)",
  //           "rgba(153, 102, 255, 0.5)",
  //           "rgba(255, 159, 64, 0.5)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };


  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <DoughnutChart data={data}/>
    </div>
  );
};


export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchListActions(true);
  };

  const handleMouseExit = (e) => {
    setShowWatchListActions(false);
  };

  
  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent"> {stock.percent} </span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
    const ctx = useContext(GeneralContext);
  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placeholder="top"
          arrow
          TransitionComponent={Grow}
        >
          {" "}
          <button className="buy"  onClick={() => ctx.openBuyWindow(uid)} >Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placeholder="top"
          arrow
          TransitionComponent={Grow}
        >
          {" "}
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placeholder="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon"/>
          </button>
        </Tooltip>
        <Tooltip
          title="More"
          placeholder="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <MoreHoriz className="icon"/>
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
