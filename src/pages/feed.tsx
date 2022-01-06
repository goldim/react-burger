import "./styles.css"
import "./profile.css"
import OrderList from "../components/order-list";

const FeedPage = () => {
  const items = [
    {
      id: 231321,
      datetime: "13.12",
      fullname: "AAA",
      price: 100,
      ingredients: []
    },
    {
      id: 231322,
      datetime: "14.12",
      fullname: "BBB",
      price: 200,
      ingredients: []
    }
  ];
  return (
    <>
      <div className="mystyle">
        <OrderList items={items}/>
      </div>
    </>
  )
};

export default FeedPage;