import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import './AdminDetail.css';
import Cookies from "universal-cookie";


import { getUser } from "../../redux/actions/userActions";



export default function AdminDetail() {

    const dispatch = useDispatch();
    let cookie = new Cookies();
    const user = cookie.get('user')?.user
    const detailUser = useSelector(state => state.userReducer.usuario)
    const tokenUser = cookie.get('user')?.tokenSession
    

    useEffect(() => {
        dispatch(getUser({ email: user.email, token: tokenUser}))
    },[dispatch, user.email, tokenUser])

    return (
        <div className="container-admin-detail">

            {user
                ? <div>
                    <div className="profile-container-admin">
                        <img className="userImgOnprofile" alt='img user' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL3-fxYXhHbPLtDz72SAnRopI8b22xxS-SHCNTp8VpPP8GuOD4Ix3kxB3OokobuqGctVE&usqp=CAU"}></img>
                        { detailUser.user?.lastName && <div>Nombre: {detailUser.user?.name} {detailUser.user?.lastName} </div>}
                        { detailUser.user?.email && <div>Email: {detailUser.user?.email} </div>}
                        { detailUser.user?.born && <div>Fecha de Nac.: {detailUser.user?.born.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1')} </div>}
                        { detailUser.user?.dni && <div>Dni: {detailUser.user?.dni} </div>}
                        { detailUser.user?.address && <div>Direccion: {detailUser.user?.address} </div>}
                        { detailUser.user?.province && <div>Provincia: {detailUser.user?.province} </div>}
                        { detailUser.user?.postal && <div> Codigo Postal: {detailUser.user?.postal} </div>}
                        { detailUser.user?.phone && <div>Telefono: {detailUser.user?.phone} </div>}

                       
                        <Link to="/admin/editar">
                            <button className="loginbtn">Editar mis Datos</button>
                        </Link>


                        

                    </div>
                </div>
                : <div>No existe el usuario</div>
            }
        </div>);
}