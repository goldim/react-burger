import OrderList from "../components/order-list";
import { useDispatch, useSelector } from "../services/hooks";
import { useEffect } from "react";
import { fetchAllOrders } from "../services/middleware/order";
import OrderStatusBoard from "../components/order-status-board";
import { STATUS } from "../services/types/order";

import "./styles.css"
import profileStyles from "./profile.module.css"

const FeedPage = () => {
  const { orders: items, todayTotal, total} = useSelector(store => store.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

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
    <div className={profileStyles.twoColumns}>
      <section className="feedContainer">
        <Title/>
        <OrderList items={items}/>
      </section>
      <OrderStatusBoard doneOrderIds={doneOrderIds} pendingOrderIds={pendingOrderIds} total={total} todayTotal={todayTotal}/>
    </div>
  )
};

const Title = () => (
  <p className='feedTitle text text_type_main-large'>
      Лента заказов
  </p>
);

export default FeedPage;