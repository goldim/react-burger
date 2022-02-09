import OrderList from "../components/order-list";
import { useDispatch, useSelector } from "../services/hooks";
import { useEffect } from "react";
import { fetchAllOrders } from "../services/middleware/order";
import OrderStatusBoard from "../components/order-status-board";
import { STATUS } from "../services/types/order";

import styles from "./common.module.css"
import { wsClose } from "../services/actions/websocket";

const FeedPage = () => {
  const { orders: items, totalToday, total} = useSelector(store => store.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrders());
    return () => { dispatch(wsClose()) }
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
    <>
      <section className={styles.feedContainer}>
        <Title/>
        <OrderList items={items}/>
      </section>
      <OrderStatusBoard doneOrderIds={doneOrderIds} pendingOrderIds={pendingOrderIds} total={total} totalToday={totalToday}/>
    </>
  )
};

const Title = () => (
  <p className={`${styles.feedTitle} text text_type_main-large`}>
      Лента заказов
  </p>
);

export default FeedPage;