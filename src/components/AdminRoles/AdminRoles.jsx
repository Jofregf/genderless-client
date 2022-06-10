import React, { useState, useEffect } from 'react'
import "./AdminRoles.css"
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateRol } from '../../redux/actions/userActions';
import Cookies from "universal-cookie";
import { Button, Modal } from 'react-bootstrap';


function AdminRoles() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [permission, setPermission] = useState('');
    const [refresh, setRefresh] = useState(true);
    const users = useSelector(state => state.userReducer.usuarios)
    const status = useSelector(state => state.userReducer.status)
    let cookie = new Cookies();
    const tokenUser = cookie.get('user')?.tokenSession

    const findUser = users.find((user) => user.email === email);

    const [modal, setModal] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalDelete = (value) => {
        setModal(value)
        handleShow()
    }


    useEffect(() => {
        dispatch(getUsers({token: tokenUser}));
    },[status])
    
    const handleSubmit = (e) => { 
        e.preventDefault();
        if(permission !== '') {
            if(findUser) {
                dispatch(updateRol({email: email, permission: permission, token: tokenUser}));
                modalDelete('El cambio se ha producido con éxito');
                setRefresh(!refresh)
                setPermission('')
            } else if (findUser === undefined) {
                modalDelete('El usuario ingresado no existe');
            }
        } else {
            modalDelete('Debe seleccionar nuevo rol');
        }
    }

    return (
        <div className="admin-roles-container">
            <form className="form-admin-role" onSubmit={handleSubmit}>
                <div className='form-admin-roles-container'>
                    <div className='admin-role-inputAndSelect'>
                        <div className="title-login">Cambio de roles de usuarios</div>
                        <div className='form-group-login'>
                            <div className='admin-roles-labelAndInput'>
                                <label className="input-label-login">Email del usuario: </label>
                                <input className="admin-roles-input" type="text" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className='admin-roles-labelAndInput'>
                                <label className="input-label-login">Nuevo rol: </label>                           
                                <select className="admin-role-select" onChange={e => setPermission(e.target.value)}>
                                    <option value=''>--Seleccione--</option>
                                    <option value='admin'>Administrador</option>
                                    <option value='user'>Usuario</option>
                                    <option value='ban'>Banear</option>
                                </select>
                            </div>
                            <div className="form-submit-login">                            
                                <button className='register-btn-admin-roles' type='submit'>Cambiar rol</button>
                            </div>
                        </div>
                    </div>
                        <div className="admin-roles-card" >
                        {
                            users?.map((e,i) => {
                                return (
                                    <div key={i} className="card-user-permission">
                                        <p className="admin-role-p1">Nombre: {e.name}</p>
                                        <p className="admin-role-p2">Email: {e.email}</p>
                                        <p className="admin-role-p3">Permiso: {e.permission}</p>
                                    </div>
                                )
                            })
                        }
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
                    No
                </Button> */}
                <Button variant="primary" onClick={handleClose} >Continuar</Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}
export default  AdminRoles