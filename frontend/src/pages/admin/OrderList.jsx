import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation(); 

  const handleClick = async (orderId) => {
    if (!window.confirm("do you really want to cancel this order?")) return;

    try {
      await deleteOrder(orderId).unwrap();    
      // window.location.reload()
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Deleting order failed");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="container ml-15 mx-auto">
          <AdminMenu />
          <thead className="w-full border relative right-5 ">
           
            <tr className="mb-[5rem] ">
              <th>ITEMS</th>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>Cancel ORDER</th>
            </tr>
          </thead>

          <tbody className="relative left-5">
            {orders?.map((order) => (
              <tr key={order._id}>
                 <Link to={`/order/${order._id}`}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt=""
                    className="w-[5rem] pt-4 pl-1 hover:translate-1 cursor-pointer"
                  />
                </td>
                </Link>

                <td>{order._id}</td>
               

                <td>{order.user?.username || "N/A"}</td>

                <td>{order.createdAt?.substring(0, 10) || "N/A"}</td>

                <td>$ {order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">Pending</p>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">Pending</p>
                  )}
                </td>

                <td>
                  {order.isPaid || order.isDelivered ? (
                    <p className="text-gray-400">Not Deletable</p>
                  ) : (
                    <FaTrash
                      onClick={() => handleClick(order._id)}   // ✅ FIXED
                      className="text-red-500 ml-2 hover:scale-110 cursor-pointer font-bold text-2xl"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
      )}
    </>
  );
};

export default OrderList;
