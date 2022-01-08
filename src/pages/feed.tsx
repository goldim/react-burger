import "./styles.css"
import "./profile.css"
import OrderList from "../components/order-list";
import { useDispatch, useSelector } from "../services/hooks";
import { useEffect } from "react";
import { fetchAllOrders } from "../services/middleware/order";
import { TRootState } from "../services/types";
import OrderStatusBoard from "../components/order-status-board";
import { STATUS } from "../services/types/order";

const FeedPage = () => {
  const { orders: items, todayTotal, total} = useSelector((store: TRootState) => store.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  const getNIdsByStatus = (status: STATUS, count: number) => {
    return getIdsByStatus(status).slice(0, count);
  }

  const getIdsByStatus = (status: STATUS) => {
    return items.filter(item => item.status === status).map(item => item.id);
  }

  const DISPLAY_COUNT = 5;
  const doneOrderIds = getNIdsByStatus(STATUS.DONE, DISPLAY_COUNT);
  const pendingOrderIds = getNIdsByStatus(STATUS.PENDING, DISPLAY_COUNT);

  return (
    <>
      <div className="mystyle">
        <OrderList items={items}/>
        <OrderStatusBoard doneOrderIds={doneOrderIds} pendingOrderIds={pendingOrderIds} total={total} todayTotal={todayTotal}/>
      </div>
    </>
  )
};

export default FeedPage;