 import './Register.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions/userActions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../redux/actions/userActions';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Este campo es requerido")
        .max(30, "Máximo 30 carácteres")
        .min(2, "Mínimo 2 carácteres")
        .matches(RegExp(/^[a-z A-Z]+$/), "El nombre debe tener solo letras"),
    lastName: Yup.string()
        .required("Este campo es requerido")
        .max(30, "Máximo 30 carácteres")
        .min(2, "Mínimo 2 carácteres")
        .matches(RegExp(/^[a-z A-Z]+$/), "El apellido debe tener solo letras"),
    email: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(8, "Mínimo 8 carácteres")
        .matches(RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/), "El email no es válido"),
    confirmEmail: Yup.string()
        .required("Este campo es requerido")
        .oneOf([Yup.ref("email")], "El email ingresado no coincide "),
    dni: Yup.string()
        .required("Este campo es requerido")
        .max(20, "Máximo 20 carácteres")
        .min(8, "Mínimo 8 carácteres"),
    born: Yup.string()
        .required("Este campo es requerido"),
    password: Yup.string()
        .required("Este campo es requerido")
        .max(16, "Máximo 16 carácteres")
        .min(8, "Mínimo 8 carácteres")
        .matches(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/), "Incluir número, mayúscula y minúscula"),
    confirmPassword: Yup.string()
        .required("Este campo es requerido")
        .oneOf([Yup.ref("password")], "La contraseña ingresada no coincide"),
    province: Yup.string()
        .required("Este campo es requerido")
        .max(30, "Máximo 30 carácteres")
        .min(2, "Mínimo 2 carácteres")
        .matches(RegExp(/^[a-z A-Z]+$/), "Debe tener solo letras"),
    address: Yup.string()
        .required("Este campo es requerido")
        .max(30, "Máximo 30 carácteres")
        .min(2, "Mínimo 2 carácteres")
        .matches(RegExp(/[A-Za-z0-9]+/g), "Incluir el nombre y número"),
    postal: Yup.string()
        .required("Este campo es requerido")
        .max(20, "Máximo 8 carácteres")
        .min(4, "Mínimo 4 carácteres"),
    phone: Yup.string()
        .required("Este campo es requerido")
        .max(20, "Máximo 20 carácteres")
        .min(8, "Mínimo 8 carácteres"),
    // picture: Yup.string(),
});

const formOptions = { resolver: yupResolver(formSchema) };

const Register = () => {

    const [modal, setModal] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalDelete = (value) => {
        setModal(value)
        handleShow()
    }

    const handlemodal=(data)=>{
        nav('/home')
    }

    

    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, reset } = useForm(formOptions);
    const nav = useNavigate()

    function MessageConfirm(data) {
        
        dispatch(createUser({...data, permission:"user"}));
        setTimeout(() => {
            dispatch(userLogin({email: data.email, password: data.password}))
        }, 1000);
        setTimeout(() => {
            modalDelete("Gracias!!")
            // dispatch(userLogin({email: data.email, password: data.password}))
        }, 1100);
    }

    const onSubmit = (data) => {
        MessageConfirm(data);
        reset();
    };
    return (
        <div className="container-register">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container-index">
                    <div className="form-container">
                        <div className="title">Registrarme</div>
                        <p className="register-subtitle">(* campos requeridos)</p>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">*Nombre: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="name"
                                    {...register('name')}
                                />
                                {<div className="form-register-errors">{errors.name?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Apellido: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="lastName"
                                    {...register('lastName')}
                                />
                                {<div className="form-register-errors">{errors.lastName?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Email: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="email"
                                    {...register('email')}
                                />
                                {<div className="form-register-errors">{errors.email?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Confirmar email: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="confirmEmail"
                                    {...register('confirmEmail')}
                                />
                                {<div className="form-register-errors">{errors.confirmEmail?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*DNI: </label>
                                <input
                                    className="input-register"
                                    type="number"
                                    name="dni"
                                    {...register('dni')}
                                />
                                {<div className="form-register-errors">{errors.dni?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Fecha de Nacimiento: </label>
                                <input
                                    className="input-register"
                                    type="date"
                                    name="born"
                                    {...register('born')}
                                />
                                {<div className="form-register-errors">{errors.born?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Contraseña: </label>
                                <input
                                    autoComplete="on"
                                    className="input-register"
                                    type="password"
                                    name="password"
                                    {...register('password')}
                                />
                                {<div className="form-register-errors">{errors.password?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Confirmar contraseña: </label>
                                <input
                                    autoComplete="on"
                                    className="input-register"
                                    type="password"
                                    name="confirmPassword"
                                    {...register('confirmPassword')}
                                />
                                {<div className="form-register-errors">{errors.confirmPassword?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Localidad: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="province"
                                    {...register('province')}
                                />
                                {<div className="form-register-errors">{errors.province?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Dirección: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="address"
                                    {...register('address')}
                                />
                                {<div className="form-register-errors">{errors.address?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Código Postal: </label>
                                <input
                                    className="input-register"
                                    type="number"
                                    name="postal"
                                    {...register('postal')}
                                />
                                {<div className="form-register-errors">{errors.postal?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Celular: </label>
                                <input
                                    className="input-register"
                                    type="number"
                                    name="phone"
                                    {...register('phone')}
                                />
                                {<div className="form-register-errors">{errors.phone?.message}</div>}
                            </div>
                        </div>
                        {/* <div className="labelAndInput">
                            <label className="input-label">Link de foto de perfil: </label>
                            <input
                                className="input-register"
                                type="text"
                                name="picture"
                                {...register('picture')}
                            />
                        </div> */}
                        <div className="TyC">
                            Al crear su cuenta se aceptan términos y condiciones.
                        </div>
                        <div className="form-submit">
                            <input
                                type="submit"
                                value="CREAR MI CUENTA"
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
                <Modal.Title>Registro Exitoso!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modal}
            </Modal.Body>
            <Modal.Footer>
                 {/* <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>  */}
                <Button variant="primary" onClick={handlemodal} >Continuar</Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
};

export { Register };