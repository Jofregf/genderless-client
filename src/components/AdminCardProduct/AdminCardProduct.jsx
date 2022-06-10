import { useState } from 'react'
import './AdminCardProducto.css';
import { BsPencilSquare } from 'react-icons/bs';
import { VscEye } from 'react-icons/vsc';
import { VscEyeClosed } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../redux/actions/productActions';
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";



function AdminCardProduct ( { image, name, stock_by_size, price, disabled, activeDrawer, id, producto , receiveProduct },  ) {
  const dispatch = useDispatch();
  let cookie = new Cookies();
    const tokenUser = cookie.get('user')?.tokenSession
  const [disabledCard, setDisabledCard] = useState(disabled)
  const handleEdit = (e) => {
    e.preventDefault();
    // activeDrawer();
    receiveProduct(producto)
  }
  

  const handleDisabled = (e) => {
    e.preventDefault();
    dispatch(editProduct({id, "disabled": !disabled}, {token: tokenUser}));
    setDisabledCard(!disabledCard);
  }

  const stock = stock_by_size.map((a)=> a.stock).reduce((a,b) => a + b, 0)

  return (
      <div className="card-admin-container-slim">
        <div className="card-admin-container-slim-1">
          <Link to={`/producto/${id}`} style={{ text_decoration: 'none' }}>
            <img className="card-admin-product-img" src={ image } alt="imagen rota"></img>
          </Link>
        </div>
        <div className="card-admin-container-slim-2">
          <div className="card-admin-information">
              <p className="card-admin-slim-name">{ name }</p>
              <p className="price-slim-card-price">${ price }</p>
          </div>
          <div className="card-admin-container-slim-3">
            <div className="card-admin-container-slim-stockYbtn">
                <p className="card-admin-slim-stock">Stock: { stock  }</p>
            </div>
            <div className="buttons-admin-container-slim">
              <button className="button-card-admin-slim" onClick={(e) => {handleEdit(e)}}>
                <BsPencilSquare size={25}/>
              </button>
              <button className="button-card-admin-slim" onClick={(e) => {handleDisabled(e)}}>
                {
                  disabledCard ? <VscEyeClosed size={25}/> :  <VscEye size={25}/>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AdminCardProduct