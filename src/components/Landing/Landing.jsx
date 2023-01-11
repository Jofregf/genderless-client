import React, { useEffect, useState } from 'react';
import baseUrl from '../../index';
import './Landing.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import {  Button, Card, Carousel, Col, Container, ListGroup, ListGroupItem, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsbyCategory } from '../../redux/actions/productActions';
import { CgShoppingCart } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import Cookies from 'universal-cookie';
import { BiUser } from 'react-icons/bi';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { AiOutlineShopping } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { userLogout } from '../../redux/actions/userActions';
import ConnectGoogle from '../ConnectGoogle/ConnectGoogle';


function Landing() {

    const cookies = new Cookies();
    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState("");
    const nav = useNavigate()
    const productos = useSelector((state) => state.productReducer.productos.reverse());
    
    const [msg, setMsg] = useState("");
    const prodsFinal = productos.filter(p => p.disabled === false);
    // console.log(prodsFinal)
    useEffect(() => {
      dispatch(getProducts());
    }, [])

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const filterCategory = (category) => {
      nav('/home')
      setTimeout(() => {
        dispatch(getProductsbyCategory(category))
      }, 100);
    }
    const user = useSelector( (state) => state.userReducer.usuario)

    const handleOnChangeSusbribe = (e) => {
      setInput(e.target.value)
    }

    const handleSusbribe = async () => {
      await axios.post(`${baseUrl}/usuario/newsletter`, {
            // email
            "email": input
        }).then( response => {
          const msg = response.data.msg;
          setMsg(msg);
        },
        (error) => {
          setMsg("Email no válido");
        })
        setInput("")
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setMsg("");
      }, 5000)
      return () => clearTimeout(timer);
    }, [msg])

    const logout = () => {
      dispatch(userLogout(cookies.get('user')?.tokenSession))
    }
    return (
      <>



<Navbar bg="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand className='titleNavBar' style={{ maxHeight: '100px', color: 'white' }}>GENDERLESS</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px', color: 'white' }}
        navbarScroll
      >
        <Nav.Link href="/home" style={{ maxHeight: '100px', color: 'white' }}>Catalogo</Nav.Link>
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
        
      </Nav>
    
    </Navbar.Collapse>
  </Container>
</Navbar>





        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <Link to={"/home"}>
              <img
                className="d-block w-100"
                src="https://www.ripcurlargentina.com/fullaccess/banner345.jpg"
                alt="First slide"
              />
            </Link>
            <Carousel.Caption>
              <h3>GENDERLESS</h3>
              <p>Las mejores marcas al mejor precio.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to={"/home"}>
              <img
                className="d-block w-100"
                src="https://www.ripcurlargentina.com/fullaccess/banner344.jpg"
                alt="Second slide"
              />
            </Link>

            <Carousel.Caption>
              <h3>GENDERLESS</h3>
              <p>Las mejores marcas al mejor precio.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to={"/home"}>
              <img
                className="d-block w-100"
                src="https://www.ripcurlargentina.com/fullaccess/banner346.jpg"
                alt="Third slide"
              />
            </Link>

            <Carousel.Caption>
              <h3>GENDERLESS</h3>
              <p>Las mejores marcas al mejor precio.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to={"/home"}>
              <img
                className="d-block w-100"
                src="https://www.ripcurlargentina.com/fullaccess/banner343.jpg"
                alt="Fourth slide"
              />
            </Link>

            <Carousel.Caption>
              <h3>GENDERLESS</h3>
              <p>Las mejores marcas al mejor precio.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Container
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "2% auto",
            justifyContent: "center",
            gap: "1%",
          }}
        >
          <Row>
            <Col>
              <div className="wrapper" onClick={() => filterCategory("Buzo")}>
                <div className="cardLanding">
                  <img
                    className="cardLandingImage"
                    alt=""
                    preview={false}
                    src="https://cdn.dynamicyield.com/api/8767771/images/87b138afa61f__colorblock_om_promociones_fem.png"
                  />
                  <div className="card-container"></div>
                  <div className="info">
                    <p>Buzos</p>
                  </div>
                </div>
              </div>
            </Col>

            <Col>
              <div
                className="wrapper"
                onClick={() => filterCategory("Campera")}
              >
                <div className="cardLanding">
                  <img
                    className="cardLandingImage"
                    alt=""
                    preview={false}
                    src="https://cdn.dynamicyield.com/api/8767771/images/26d89cab36e4c__adveture_om_promociones_fem.png"
                  />
                  <div className="card-container"></div>
                  <div className="info">
                    <p>Camperas</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Container
          style={{
            display: "flex",
            margin: "2% auto",
            justifyContent: "center",
          }}
        >
          <Row>
            <Col>
              <div
                className="wrapper"
                onClick={() => filterCategory("Pantalon")}
              >
                <div className="cardLanding">
                  <img
                    className="cardLandingImage"
                    alt=""
                    preview={false}
                    src="https://cdn.cliqueinc.com/posts/290170/best-cargo-pants-290170-1605890558176-square.700x0c.jpg"
                  />
                  <div className="card-container"></div>
                  <div className="info">
                    <p>Pantalones</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="wrapper" onClick={() => filterCategory("Remera")}>
                <div className="cardLanding">
                  <img
                    className="cardLandingImage"
                    alt=""
                    preview={false}
                    src="https://i.imgur.com/qXuD5ss.jpg"
                  />
                  <div className="card-container"></div>
                  <div className="info">
                    <p>Remeras</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

{/*                <h3 style={{ margin: "3% auto" }}>Productos destacados</h3>

<Container
           style={{
             display: "flex",
             flexWrap: "wrap",
             margin: "2% auto",
             justifyContent: "center",
             gap: "1%",
           }}
        >





          <Card style={{ width: "18rem", marginBottom: "2%", height: "33rem" }}>
            <Link
              to={"/producto/5"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card.Img
                variant="top"
                src="https://www.cristobalcolon.com/fullaccess/item21385foto95276.jpg"
              />
              <Card.Title style={{ height: "55px", marginTop: "2%" }}>
                Remera Zoo York Immergruen
              </Card.Title>
            </Link>
            <p style={{ height: "35px" }}>$3.999</p>
            <div className="cardsProductsButtons">
              <Link to="/producto/5">
                <Button variant="primary">Ver mas</Button>
              </Link>
            </div>
          </Card>


          <Card style={{ width: "18rem", marginBottom: "2%", height: "33rem" }}>
            <Link
              to={"/producto/5"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card.Img
                variant="top"
                src="https://www.cristobalcolon.com/fullaccess/item21406foto95347th.jpg"
              />
              <Card.Title style={{ height: "55px", marginTop: "2%" }}>
              Remera DC Bandan
              </Card.Title>
            </Link>
            <p style={{ height: "35px" }}>$9.699</p>
            <div className="cardsProductsButtons">
              <Link to="/producto/2">
                <Button variant="primary">Ver mas</Button>
              </Link>
            </div>
          </Card>


          <Card style={{ width: "18rem", marginBottom: "2%", height: "33rem" }}>
            <Link
              to={"/producto/5"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card.Img
                variant="top"
                src="https://www.cristobalcolon.com/fullaccess/item21402foto95323th.jpg"
              />
              <Card.Title style={{ height: "55px", marginTop: "2%" }}>
                Buzo Rip Curl Guard
              </Card.Title>
            </Link>
            <p style={{ height: "35px" }}>$10.999</p>
            <div className="cardsProductsButtons">
              <Link to="/producto/1">
                <Button variant="primary">Ver mas</Button>
              </Link>
            </div>
          </Card>



        </Container> */}

        <h2>Lo nuevo</h2>
        <Container
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "2% auto",
            justifyContent: "center",
            gap: "1%",
          }}
        >
          {prodsFinal?.slice(0, 4).map((producto) => (
              <div key={producto.id}>
                <Card
                style={{ width: "18rem", marginBottom: "2%", height: "30rem" }}
                key={producto.id}
              >
                <Link
                  to={"/producto/" + producto.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card.Img variant="top" src={producto.image} style={{ height: "350px"}}/>
                {
                  producto.discount > 0 ? 
                  <>
                  <div className="card-container">
                    <div className="top-left" >%{producto.discount}</div>
                    <div style={{ height: "20px" }}>
                      <span  className="precioTachado">${producto.price}</span>
                      <span  className="precioFinal">${producto.price}</span>
                    </div>
                  </div>
                  </>
                  :
                  <p style={{ height: "20px" }} className="precioFinal">${producto.price}</p>
                }
                  <Card.Title style={{ height: "55px", marginTop: "15%", fontWeight: '200', fontSize: "1.1rem" }}>
                    {producto.name}
                  </Card.Title>
                
                </Link>
                

              </Card>
              </div>
            ))}
        </Container>
          <div className="home-newsletter">
          <div className="home-newsletter-container-landing">
          <h2 className="home-newsletter-title">¡RECIBÍ NOVEDADES Y PROMOCIONES EXCLUSIVAS EN TU MAIL!</h2>
          <p className="home-newsletter-p">No te pierdas la oportunidad de tener promos exclusivas en tu email.</p>
          <input className="home-newsletter-input" type="text" placeholder="Ingresá tu email" value={input} onChange={(e)=>handleOnChangeSusbribe(e)} />
          <p className={msg ? 'newsletter_agregado_landing' : 'producto_sinagregar'}>{msg}</p>
          <button className="home-newsletter-button" onClick={(e) => handleSusbribe(e)}>Suscribirme</button>
        </div>
      </div>
      </>
    );
}

export default Landing;
