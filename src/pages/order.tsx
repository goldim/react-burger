import { useEffect } from "react";
import { useParams } from "react-router";
import Order from "../components/order";
import { wsClose } from "../services/actions/websocket";
import { useDispatch, useSelector } from "../services/hooks";
import { fetchAllOrders } from "../services/middleware/order";

const OrderPage = () => {
    const { id } = useParams();
    const { orders: items } = useSelector(store => store.order);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllOrders());
        return () => { dispatch(wsClose()) }
    }, [dispatch]);

    const parsedId = parseInt(id ? id: "");
    const found = items.find(item => item.id === parsedId);
    return (<section>{found ? <Order {...found}/>: (<p className="text text_type_main-large">Заказ #{id} не найден</p>)}</section>);
}

export default OrderPage;
