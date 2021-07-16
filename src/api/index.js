/* eslint-disable import/no-anonymous-default-export */
const URL = "http://localhost:8080/Homecook";

async function getApi(url) {
  const res = await fetch(`${URL}${url}`, {
    method: "GET",
  });
  return await res.json();
}
function deleteApi(url, data) {
  const requestOptions = {
    method: "DELETE",
    //   headers: { 'Content-Type': 'application/json' ,
    // 'Access-Control-Allow-Headers':'Content-Type'
    //     },
    body: JSON.stringify(data),
  };
  return fetch(`${URL}${url}`, requestOptions);
}
function postApi(url, data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(data),
  };
  return fetch(`${URL}${url}`, requestOptions);
}
function putApi(url, data) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(`${URL}${url}`, requestOptions);
}
export default {
  getAllAccountByRole(role) {
    return getApi(`/accounts/role/${role}`);
  },
  addDishToMenu(DishId, MenuID) {
    return postApi(`/menu/dish`, { DishId, MenuID });
  },
  removeDishFromMenu(DishId, MenuID) {
    return deleteApi(`/menu/dish`, { DishId, MenuID });
  },
  deleteMenu(id) {
    return deleteApi(`/menu/${id}`, null);
  },
  getCustomerOrder(id) {
    return getApi(`/order/customer/${id}`);
  },
  getOrderById(id) {
    return getApi(`/order/byId/${id}`);
  },
  getSevenOrder() {
    return getApi("/order/first");
  },
  getAllOrder(page) {
    return getApi(`/order/orders/${page}`);
  },
  getOrdersByHomeCookIDAndStatus(HomeCookID,status,page) {
    console.log(`/order/homecook/${HomeCookID}/${status}/${page}`);
    return getApi(`/order/homecook/${HomeCookID}/${status}/${page}`);
  },
  getTotalCount() {
    return getApi("/order/count/");
  },
  getHomeCookOrder(id) {
    return getApi(`/order/homecook/${id}`);
  },
  getTotalHomeCookOrder(id) {
    return getApi(`/order/count/homecook/${id}`);
  },
  getTotalHomeCookMenu(id) {
    return getApi(`/menu/count/homecook/${id}`);
  },
  getTotalHomeCookDish(id) {
    return getApi(`/dishes/count/homecook/${id}`);
  },
  createOrder(order) {
    return postApi("/order", order);
  },
  changeOrderStatus(id, status) {
    return putApi(`/order/updateStatus/${id}/${status}`);
  },
  getOrderItems(id) {
    return getApi(`/order/item/${id}`);
  },

  getMenus() {
    return getApi("/menu");
  },
  getMenuByID(id) {
    return getApi(`/menu/${id}`);
  },
  getMenuByHomeCookID(id) {
    return getApi(`/menu/homecook/${id}`);
  },
  async createMenu(menu) {
    const response = await postApi("/menu", menu);
    return await response.json();
  },
  createDish(dish) {
    return postApi("/dishes", dish).then((res)=>res.json());
  },
  updateMenu(menu) {
    return putApi("/menu", menu);
  },
  updateDish(dish) {
    return putApi("/dishes", dish);
  },
  //Dishes api
  getDishesByHomecookID(id) {
    return getApi(`/dishes/homecook/${id}`);
  },
  async getDishesByStatus(status, page) {
    const response = await getApi(`/dishes/status/${status}/${page}`);
    return response;
  },
  countByRole(role) {
    return getApi(`/accounts/${role}`);
  },
  deleteDish(DishId) {
    return deleteApi(`/dishes/${DishId}`);
  },
  async login(data) {
    const response = await postApi("/accounts/login", data);
    return await response.json();
  },
  changeUserStatus(id, status) {
    return putApi(`/accounts/${id}/${status}`);
  },
  getOrderByCustomerIDAndStatus(id, status, page) {
    return getApi(`/customer/${id}/${status}/${page}`);
  },
  getOrderByHomeCookIDAndStatus(id, status, page) {
    return getApi(`/homecook/${id}/${status}/${page}`);
  },
  countDishes(status) {
    return getApi(`/dishes/count/${status}`);
  },
};
