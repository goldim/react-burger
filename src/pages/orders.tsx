import OrderList from "../components/order-list";
import { useDispatch, useSelector } from "../services/hooks";
import { useEffect } from "react";
import { fetchOrdersByUser } from "../services/middleware/order";
import { TRootState } from "../services/types";

import "./styles.css"
import "./profile.css"

const OrdersPage = () => {
  const { orders: items } = useSelector((store: TRootState) => store.order);
  const sortedOrdersById = items.slice().sort((a, b) => {
    const aId = a.id;
    const bId = b.id;
    return (aId < bId ? 1: (aId > bId ? -1: 0));
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersByUser());
  }, [dispatch]);

  return (
    <>
      <div className="mystyle">
        <OrderList items={sortedOrdersById}/>
      </div>
    </>
  )
};

export default OrdersPage;