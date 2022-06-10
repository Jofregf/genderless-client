import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getProductsbyName } from '../../redux/actions/productActions';
import ConnectMetamask from '../ConnectMetamask/ConnectMetamask';
import './NavigationBar.css'
import { BiUser } from 'react-icons/bi';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { AiOutlineShopping } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import { userLogout } from '../../redux/actions/userActions';
import ConnectGoogle from '../ConnectGoogle/ConnectGoogle';
import Chatbot from 'react-chatbot-kit';
import { getFavorites } from '../../redux/actions/favoritesActions';
import { getShopping } from '../../redux/actions/shoppingActions'

function NavigationBar() {
const {pathname} = window.location;
  const cookies = new Cookies();
  const userReducer = useSelector( (state) => state.userReducer.usuario)
  const userCookie = cookies.get('user')?.user
  const productos = useSelector((state) => state.productReducer.productos);
  const stateNav = useSelector((state) => state.shoppingReducer.nav);
  const nav = useNavigate();

  const user = userReducer && userCookie

  const logout = () => {
    dispatch(userLogout(cookies.get('user')?.tokenSession))
    cookies.remove('user')
    nav('/')
  }

  let [state, setState] = useState({
    balance: localStorage.getItem('balance') || null
  })

  let balance = state.balance


  /**
     //!--------- BUSQUEDA ----------------------------------
  **/
    const[name, setName] = useState('')
    const dispatch = useDispatch();


    function handleInputChange(event) {
        event.preventDefault();
        setName(event.target.value.toLowerCase());
    }
  
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getProductsbyName(name))
        setName('')
        }

  const favsReducer = useSelector((state) => state.favoriteReducer.favorites);
  const shopReducer = useSelector((state) => state.shoppingReducer.products);

  const shopping = cookies.get('shopping');
  const favorites = cookies.get('favorite');

  const favs = favsReducer.length ? favsReducer : favorites
  const shop = shopReducer.length ? shopReducer : shopping

  useEffect(() => {
    dispatch(getFavorites({ email : user?.email }))
    dispatch(getShopping({ email: user?.email }))
  },[stateNav])
  
return ((!pathname.includes("admin") && pathname !=="/")  &&


<Navbar bg="dark" expand="lg" >
  <Container fluid >
    <Navbar.Brand className='titleNavBar' style={{ maxHeight: '100px', color: 'white' }}>GENDERLESS</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px', color: 'white' }}
        navbarScroll
      >
        <Nav.Link href="/" style={{ maxHeight: '100px', color: 'white' }}>Inicio</Nav.Link>
        {
          cookies.get('user')?.user ?
          <NavDropdown title={<span style={{ color: 'white' }} >{cookies.get('user')?.user?.name}</span>}id="basic-nav-dropdown">
          <NavDropdown.Item>  <BiUser/><Link to="/user/profile" className="input-profile"> Mi perfil</Link></NavDropdown.Item>
          <NavDropdown.Item> <Link to='/miscompras' style={{color: 'black', textDecoration: 'none'}}>  <AiOutlineShopping/> Mis compras</Link></NavDropdown.Item>
          <NavDropdown.Divider />
          {
            cookies.get('googleUser') &&
            <ConnectGoogle login = {true} logout = {true} redirectLogout = {true}></ConnectGoogle>
          }  
          { cookies.get('user') && !cookies.get('googleUser') && <NavDropdown.Item  onClick={() => logout()}>  <RiUserUnfollowLine/> Cerrar sesión</NavDropdown.Item>}
          </NavDropdown>
          :

        <Nav.Link href="/login" style={{ maxHeight: '100px', color: 'white' }}>Iniciar sesion</Nav.Link>
      }
      { localStorage.getItem('balance') ? Number(localStorage.getItem('balance')).toFixed(5) + ' ETH' : null }

      {/* {
        cookies.get('user')?.user.permission === 'admin' ?
        <Nav.Link href="/admin" style={{ maxHeight: '100px', color: 'white' }}>Admin</Nav.Link>
        : null
      } */}
      {
        cookies.get('user')?.user.permission === 'admin' ?
        <Button variant="outline-warning" onClick={() => nav("/admin")}>Panel Admin</Button>
        : null
      }

      </Nav>
      {
        !pathname.includes("producto") &&
        <Form className="d-flex"  onSubmit={(e) => handleSubmit(e)}>
          <FormControl
            type="search"
            placeholder="Buscar producto"
            className="me-2"
            aria-label="Search"
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
          <Button type="submit" variant="outline-warning">Buscar</Button>
        </Form>
      }

      <div style={{ marginTop: '10px'}}>
        <Link style={{ margin: '40px', color: 'white', textDecoration: 'none', fontSize: '1.3rem' }} to="/shoppingcart">  <FiShoppingCart/> <span style={{ fontSize: '12px', background: 'red', padding: ' 5px 10px', borderRadius: '50%' }}>{shop?.length || 0}</span> </Link>
        <Link style={{ margin: '40px', color: 'white', textDecoration: 'none', fontSize: '1.3rem' }} to="/favorites">  <FaRegHeart/> <span style={{ fontSize: '12px', background: 'red', padding: ' 5px 10px', borderRadius: '50%' }}>{favs?.length || 0}</span> </Link>
      </div>
    </Navbar.Collapse>
  </Container>
  {/* <ConnectGoogle login = {true} logout = {true}></ConnectGoogle> */}

    
</Navbar>

  )
}

export default NavigationBar