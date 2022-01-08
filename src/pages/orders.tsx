import OrderList from "../components/order-list";
import { useDispatch, useSelector } from "../services/hooks";
import { useEffect } from "react";
import { fetchOrdersByUser } from "../services/middleware/order";

import "./styles.css"
import profileStyles from "./profile.module.css"

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
  }, [dispatch]);

  return (<div className={profileStyles.twoColumns}><OrderList items={sortedOrdersById}/></div>);
};

export default OrdersPage;