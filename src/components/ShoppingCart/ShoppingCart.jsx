import './ShoppingCart.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getShopping, emptyShopping } from '../../redux/actions/shoppingActions'
import { getUser } from '../../redux/actions/userActions'
import CardSlim from "../../components/CardSlim/CardSlim"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie";

export default function ShoppingCart ( ) {
    let nav = useNavigate()
    let cookie = new Cookies();
    const user = cookie.get('user')?.user
    const shoppingCookie = cookie.get('shopping')
    const userEdit = useSelector(state => state.userReducer.usuario)
    const dispatch = useDispatch()
    const [select, setSelect] = useState("Retiro por la tienda");
    const shopping = useSelector( state => state.shoppingReducer)
    const total = shopping.totalShopping.length 
                ? shopping.totalShopping?.reduce((a,b) => a + b).toFixed(2)
                : 0;

    const [refreshCardSlim, setRefreshCardSlim] = useState(false)

    const deleteProductShopping = () => {
        setRefreshCardSlim(!refreshCardSlim)
    }

    useEffect(() => {
        cookie.set('totalShopping', total, { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))})
    },[total])

    useEffect( ( )=> {
        dispatch(getShopping({ email : user?.email }))
    }, [dispatch, refreshCardSlim])


    useEffect(() => {
        dispatch(getUser({ email: user?.email}))
    },[])
            
    const handleSelect = (e) => {
        setSelect(e.target.value);
    }

    const createSendAdress = () => {
        cookie.set('sendAddress', 
            {
                name: user?.name,
                lastName: user?.lastName,
                email: user?.email,
                phone: user?.phone,
                address: user?.address || user?.sendAddress,
                province: user?.province,
                postal: user?.postal,
            }
        , { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
    }

    const handleEthereum = () => {
        createSendAdress();
        nav('/meta/checkout')
    }

    const handleMercadoPago = () => {
        createSendAdress();
        cookie.set('sendShopping', 
        shopping?.products
        , { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
    }

    function messageConfirm() {
        var mensaje = window.confirm("Esta seguro que quiere elimar todo de su carrito de compras?")
        if(!user){
            if(mensaje) {
                cookie.remove('shopping')
                deleteProductShopping();
                alert("El carrito se elimino correctamente!")
            }else {
                alert("El carrito continuará lleno")
            }
        }else{
            if(mensaje) {
                dispatch(emptyShopping({ email: user?.email}));
                alert("El carrito se elimino correctamente!")
            }else {
                alert("El carrito continuará lleno")
            }
        }
    }

    const handleDeleteAllCart = () => {
        messageConfirm();
    }

    const data = {
        name: shopping?.products.map((e) => e.name),
        picture_url: shopping?.products.map((e) => e.image),
        size: shopping?.products.map((e) => e.UserProduct?.size),
        price: total,
        quantity: shopping?.products.map((e) => e.UserProduct?.quantity)
    }

    // console.log('shopping', shopping.products)
    // console.log('shoppingCookie', shoppingCookie)
return (<div>
            {
                shopping?.products.length || shoppingCookie?.length
                ? 
                    <div className="shopping-cart-container">
                        <div className="into-container">
                            <div className="cart-container-1">
                                <div className="title-container">
                                    <h2>¿Querés recibir o retirar tu compra?</h2>
                                    <select className="select-cart" onClick={(e) => handleSelect(e)}>
                                        <option>Seleccionar opción</option>
                                        <option>Retiro por la tienda</option>
                                        <option>Enviar a mi domicilio</option>
                                        
                                    </select>
                                </div>
                                
                                <div>
                                    {
                                    select === "Enviar a mi domicilio"?
                                        
                                <div className="card-send">
                                    <div className="img-send-card">
                                    <img className="img-send" src="https://cdn-icons-png.flaticon.com/512/535/535239.png" alt="imagen rota"></img>
                                    </div>
                                    <div className="cart-slim-information">
                                    <div className="name-size">
                                
                                           
                                    <p>Nombre: {userEdit?.user?.sendAddress?.name?userEdit?.user?.sendAddress?.name:userEdit?.user?.name} {userEdit?.user?.sendAddress?.lastName?userEdit?.user?.sendAddress?.lastName:userEdit?.user?.lastName} </p>
                                    <p>Teléfono: {userEdit?.user?.sendAddress?.phone?userEdit?.user?.sendAddress?.phone:userEdit?.user?.phone}</p>
                                    <p>Direccion: {userEdit?.user?.sendAddress?.address?userEdit?.user?.sendAddress?.address:userEdit?.user?.address}</p>
                                    <p>CP: {userEdit?.user?.sendAddress?.postal?userEdit?.user?.sendAddress?.postal:userEdit?.user?.postal} - {userEdit?.user?.sendAddress?.province?userEdit?.user?.sendAddress?.province:userEdit?.user?.province} </p>
                                         

                                    </div>
                                    </div>
                                    <div className="cart-edit">
                                        <div className="price-discount-slim">
                                            <Link to="/user/products/send">
                                            <p> Editar campo </p>
                                            </Link>
                                    </div>
                                    </div>
                                </div>
                                    :null
                                    
                                    }
                                </div>
                                    { shopping.products.length 
                                        ? shopping.products?.map((product, i) => {
                                        const stock = product?.stock_by_size.map((a)=> a.stock).reduce((a,b) => a + b, 0)
                                            return <CardSlim 
                                            key= { i }
                                            id= { product?.id }
                                            index= { i }
                                            image= { product?.image }
                                            name= { product?.name }
                                            size= { product?.UserProduct.size }
                                            quantity= {product?.UserProduct.quantity}
                                            stock= { stock }
                                            discount= { product?.discount }
                                            price= { product?.price }
                                            />
                                        })
                                        : shoppingCookie?.map((product, i) => {
                                        const stock = product.stock_by_size?.map((a)=> a.stock).reduce((a,b) => a + b, 0)
                                            return <CardSlim 
                                            key= { i }
                                            id= { product?.id }
                                            index= { i }
                                            image= { product?.image }
                                            name= { product?.name }
                                            size= { product?.UserProduct.size }
                                            quantity= {product?.UserProduct.quantity}
                                            stock= { stock }
                                            discount= { product?.discount }
                                            price= { product?.price }
                                            deleteProductShopping= {deleteProductShopping}
                                            />
                                        })
                                    }
                                    <div className="fav-newsletter-btn">
                            <button onClick={(e) => handleDeleteAllCart()} className="btn-newsletter-fav">Eliminar todos los artículos del carrito</button>
                        </div>
                                </div>
                                <div className="resume-count">
                                    <div className="cart-container-2">
                                        <h3>Resumen de compra</h3>
                                        <hr/>
                                        <div className="cart-price-send">
                                            <h4>Envío gratis</h4>
                                            <h4>$0</h4>
                                        </div>
                                        <hr/>        
                                        <div className="cart-total-products">
                                            <h4>TOTAL:</h4>
                                            <h4>${ total }</h4>
                                        </div>
                                    </div>
                                    <div className="cart-mp">
                                        <p>Ir a pagar</p>
                                            <form className="form-mp" action='http://localhost:3001/mercado/checkout' method='POST'>
                                            <input type='hidden' name='name' value={data.name}></input>
                                            <input type='hidden' name='picture_url' value={data.picture_url}></input>
                                            <input type='hidden' name='size' value={data.size} ></input>
                                            <input type='hidden' name='price' value={data.price} ></input>
                                            <input type='hidden' name='quantity' value={data.quantity} ></input>
                                        <button className="mpButton" type="submit" onClick={!user ? () => nav('/login') : handleMercadoPago() }>
                                            {<img className="img-mp-cart" src={"https://www.lentesplus.com/media/wysiwyg/landings/metodos-de-pago/ico_mercadoPago.png"} alt="" />}
                                        </button>
                                        </form>

                                        <button className="mpButton" onClick={ user ? () => handleEthereum() : () => nav('/login')}>
                                            {<img className="img-mp-cart" src={"https://pngset.com/images/ethereum-logo-ethereum-triangle-transparent-png-1170181.png"} alt="" />}
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
                :
                <div className="shopping-cart-empty">
                    <p>El carrito se encuentra vacío</p>
                    <button className='register-btn' onClick={() => nav('/home')}>
                            Volver al catalogo
                    </button>                
                </div>
            }    
            {/* Se setean cookies de carrito */}
            {/* { !cookie.get('shoppingList') && cookie.set('shoppingList', shopping?.products)  }
            { cookie.get('shoppingList') && JSON.stringify(cookie.get('shoppingList') ) } */}
    </div>)
}