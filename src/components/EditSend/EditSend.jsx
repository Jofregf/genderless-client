

import React from 'react'
import {useState, useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {updateUser}  from '../../redux/actions/userActions';
import './EditSend.css';
import Cookies from "universal-cookie";
import { TiArrowBack } from 'react-icons/ti';
import {Link} from 'react-router-dom'
import { getUser } from "../../redux/actions/userActions";
import {Modal,Button} from 'react-bootstrap';


function validate(input){
    let errors = {};
    if(!/^[a-z A-Z]+$/.test(input.name)||input.name?.length<3 || input.name?.length>30){
        errors.name = "*Campo requerido";
    }
    if(!/^[a-z A-Z]+$/.test(input.lastName)||input.lastName?.length<3 || input.lastName?.length>30){
        errors.lastName = "*Campo requerido";
    }
    
    
    if(!/[A-Za-z0-9]+/g.test(input.address)||input.address?.length<3 || input.address?.length>25){
        errors.address ="*Campo requerido";
    }
    if(!/^[a-z A-Z]+$/.test(input.province)||input.province?.length<3 || input.province?.length>20){
        errors.province ="*Campo requerido";
    }
    if(!/^[0-9]{4}$/.test(input.postal)){
        errors.postal = "*Campo requerido";
    }
    if(!input.phone){
        errors.phone = "*Campo requerido";
   }
    
    return errors;

}


export default function EditUser  () {
    let cookie = new Cookies();
    const userEdit = useSelector(state => state.userReducer.usuario)
    const user = cookie.get('user')
    const tokenUser = cookie.get('user')?.tokenSession;
    const nav = useNavigate();
    const dispatch = useDispatch();
    const[errors, setErrors] = useState({});
    console.log(user)
    const[input, setInput] = useState({
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        address: user.user.address,
        province: user.user.province,
        postal: user.user.postal,
        phone: user.user.phone,
        
     })
     const [modal, setModal] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalEdit = (value) => {
    setModal(value)
    handleShow()
  }

  useEffect(() => {
        // dispatch(getUser({ email: user?.email}))
        dispatch(getUser({ email: user.email, token: tokenUser}))
    },[])
    
    function handlerOnChange (e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }) )
    }

    function onSubmit(e){
        e.preventDefault();
        if(!input.name || !input.lastName || !input.email ||!input.address|| !input.province  || !input.postal|| !input.phone  ){
        modalEdit("no completo todo el formulario!")}
        else{
        dispatch(updateUser({sendAddress:input, email: user.email, token: tokenUser}))
        modalEdit("Datos actualizados")
        setInput({
            name:'',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            province: '',
            postal: '',
        })
        nav('/shoppingcart')
    }
    }

    return (
        <div className="container-register-form">
          <form onSubmit={onSubmit} >
            <div className="container-user-edit">
               <div className="form-container-edit">
                <div>
                 <Link to='/shoppingcart' style={{ color: 'white', fontSize: '20px' }}>
                  <TiArrowBack/>
                 </Link>
                </div>
                     <div className="title">Datos de envio</div>
                        <p className="register-subtitle">(* campos requeridos)</p>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">*Nombre: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    placeholder= {user.name} 
                                    /> 
                                      {errors.name && <p className="form-register-errors">{errors.name}</p>}
                                </div>
                                <div className="labelAndInput">
                                <label className="input-label">*Apellido: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="lastName"
                                    value={input.lastName}
                                    placeholder= {userEdit?.lastName} 
                                    /> 
                                {errors.lastName && <p className="form-register-errors">{errors.lastName}</p>}
                                </div>
                                <div className="labelAndInput">
                                <label className="input-label">*Email: </label>
                                <input
                                     readOnly
                                    onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="email"
                                    value={input.email}
                                    placeholder= {userEdit?.email}
                                   />
                                {errors.email && <p className="form-register-errors">{errors.email}</p>}
                                </div>
                                
                                <div className="labelAndInput">
                                <label className="input-label">*Dirección: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="address"
                                    value={input.address}
                                    placeholder= {userEdit?.address} 
                                />
                                {errors.address && <p className="form-register-errors">{errors.address}</p>}
                                </div>
                                <div className="labelAndInput">
                                <label className="input-label">*Provincia: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="province"
                                    value={input.province}
                                    placeholder= {userEdit?.provinceuserEdit} 
                                />
                                {errors.province && <p className="form-register-errors">{errors.province}</p>}
                                </div>
                                <div className="labelAndInput">
                                <label className="input-label">*Código postal: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="number"
                                    name="postal"
                                    value={input.postal}
                                    placeholder= {userEdit?.postal} 
                                />
                                {errors.postal && <p className="form-register-errors">{errors.postal}</p>}
                                </div>
                                <div className="labelAndInput">
                                <label className="input-label">*Celular: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="number"
                                    name="phone"
                                    value={input.phone}
                                    placeholder= {userEdit?.phone} 
                                />
                                {errors.phone && <p className="form-register-errors">{errors.phone}</p>}
                                </div>
                                </div>
                                <div className="form-submit">
                                <input
                                type="submit"
                                value="Actualizar"
                                />
                             </div>
                         </div>
                   </div>
            </form>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Advertencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modal}
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    completar
                </Button> */}
                <Button variant="primary" onClick={handleClose} >Continuar</Button>
            </Modal.Footer>
            </Modal>

        </div>
    );
};

