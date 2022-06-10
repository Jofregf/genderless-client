import React, { useEffect } from 'react'
import './UserPurchase.css'
import { useDispatch, useSelector } from "react-redux";
import { getMetaUserOrders } from "../../redux/actions/metamaskActions";
import CardReview from "../../components/CardReview/CardReview";
import Cookies from 'universal-cookie';

function UserPurchase() {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.metamaskReducer.ordersUser) 
    const cookies = new Cookies();
    const user = cookies.get('user')?.user
    
    
    useEffect(() => {
        dispatch(getMetaUserOrders({email: user?.email}));
    },[])
    
    console.log('orders', orders)

    return ( 
        <div className="mis-compras-container">
                <h1>Mis compras</h1>
                <div>
                {
                    orders && orders?.map((e,i) => {
                        return (
                        <div key={i} className="mis-compras-order">
                            <div className="mis-compras-info">
                                <p>Nº de compra: {e.id}</p>
                                {/* <p>Id de pago: {e.payment_id}</p> */}
                                <p>Estado de pedido: {e.status}</p>
                                <p>Total de la compra: ${e.total}</p>
                            </div>
                            <div className="mis-compras-products">
                                {
                                    e.productList.map((producto,i) => {
                                        return(
                                            <CardReview producto={producto} key={i} />
                                            )
                                        })
                                    }
                            </div>
                        </div>
                        )
                    })
                }
                </div>
        </div>
    )
}

export default UserPurchase