import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./AdminOrders.css";
import AdminCardPayment from "../AdminCardPayment/AdminCardPayment";
import { getMostSell } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";
import { getMetaOrders } from "../../redux/actions/metamaskActions";

export default function AdminOrders({ viewOrder, metaOrder }) {
  const dispatch = useDispatch();
  /* const payments = useSelector((state) => state.mercadoReducer.pagos); */
  /* const price = useSelector((state) => state.mercadoReducer.price); */
  /* const amount = useSelector((state) => state.mercadoReducer.amount); */
  const sell = useSelector((state) => state.productReducer.productosTop);
  const meta = useSelector((state) => state.metamaskReducer.status);
  useEffect(() => {
    dispatch(getMetaOrders());
    dispatch(getMostSell());
  }, [dispatch]);

  const totalVentas = meta
    ? meta?.map((a) =>
        a.productList
          .map((a) => a.UserProduct?.quantity)
          .reduce((a, b) => {
            return a + b;
          }, 0)
      )
    : "hola";

    // console.log('meta', meta)
  return (
    <div className="container-articulos">
      <div className="container_stats">
        <div className="container_productos">
          <p>Total Ventas</p>
          <h1>
            {meta && meta.length > 0 ? (
              meta?.reduce((a, b) => {
                /* console.log(b?.productList.map(a => a.UserProduct.quantity).reduce((a,b)=>{ return a + b}), "hola") */
                return a + b.total;
              }, 0)
            ) : (
              <p className="text-no-sales">No se han realizado ventas</p>
            )}
          </h1>
        </div>
        <div className="container_productos">
          <p>Productos Vendidos</p>
          <h1>
            {meta && meta.length > 0 ? (
              totalVentas?.reduce((a, b) => {
                return a + b;
              })
            ) : (
              <p className="text-no-sales">No se han realizado ventas</p>
            )}
          </h1>
        </div>
      </div>
      <h2 className="top_h2">Top productos mas vendidos</h2>
      <div className="trabajo">
        {sell?.map((producto, i) => {
          return (
            <div className="matematicas">
              <Link
                to={`/producto/${producto.id}`}
                style={{ text_decoration: "none" }}
              >
                <img src={producto.image} alt="none" className="imagen_top" />
              </Link>
              <p>
                #{i + 1}: {producto.name}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        {meta ? (
          <div>
            {meta ? (
              <div>
                {meta?.map((metap, i) => (
                  <AdminCardPayment
                    key={i}
                    metaOrder={metaOrder}
                    email={metap.email}
                    order_id={metap.payment_id}
                    total={metap.total}
                    status={metap.status}
                    // status_detail={metap.status}
                    array={metap.productList}
                    sendAddress={metap.sendAddress}
                  />
                ))}
              </div>
            ) : (
              <p className="text-no-products">
                No se encontraron artículos con ese nombre
              </p>
            )}
          </div>
        ) : (
          <p className="text-no-products">Loading...</p>
        )}
      </div>
    </div>
  );
}