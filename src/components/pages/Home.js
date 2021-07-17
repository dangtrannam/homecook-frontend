import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";
import Button from "@material-ui/core/Button";
import Loading from "../items/Loading";
import Jumpotron from "../items/Jumpotron";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function Home(props) {
  let [dishes, setDishes] = useState([]);
  let [menus, setMenus] = useState([]);

  const getMenus = () => {
    api.getMenus().then((response) => {
      setMenus(response);
    });
  };

  const fetchDishes = () => {
    api.getDishesByStatus(true, 1).then((res) => {
      setDishes(res);
    });
  };
  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <div className="bg-grey">
      <div className="container p-3">
        <Jumpotron />
        <hr />

        <div className="d-flex justify-content-between">
          <h2>Menu List</h2>
          <Link to="/menus" className="text-primary">
            See More <ArrowForwardIosIcon fontSize="small" />
          </Link>
        </div>
        {menus.length < 1 ? (
          <Loading />
        ) : (
          <MenuList handleDelete={null} menus={menus} />
        )}
      </div>
      <div className="container p-3">
        <div className="d-flex justify-content-between">
          <h2>Featured Dishes</h2>
          <Link to="/dishes" className="text-primary">
            See More <ArrowForwardIosIcon fontSize="small" />
          </Link>
        </div>
        {dishes.length < 1 ? <Loading /> : <DishList dishes={dishes} />}
      </div>
    </div>
  );
}
export default Home;
