import OrderList from "../components/order-list";
import { useDispatch, useSelector } from "../services/hooks";
import { useEffect } from "react";
import { fetchOrdersByUser } from "../services/middleware/order";

import "./common.module.css"
import profileStyles from "./profile.module.css"
import { wsClose } from "../services/actions/websocket";

const OrdersPage = () => {
  const { orders } = useSelector(store => store.order);
  const sortedOrdersById = orders.slice().sort((a, b) => {
    const aId = a.id;
    const bId = b.id;
    return (aId < bId ? 1: (aId > bId ? -1: 0));
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersByUser());
    return () => { dispatch(wsClose()) }
  }, [dispatch]);

  return (<div className={profileStyles.twoColumns}><OrderList items={sortedOrdersById}/></div>);
};

export default OrdersPage;