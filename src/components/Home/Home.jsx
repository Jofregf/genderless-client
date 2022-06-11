import React, { useEffect, useState } from 'react'
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscounts, getProducts, getProductsbyCategory, getProductsbyPrice } from '../../redux/actions/productActions';
import { Alert, Button, Card, Container, Nav, Navbar, NavDropdown, Pagination, Spinner } from 'react-bootstrap';
import { CgShoppingCart } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavigationBar from '../Nav/NavigationBar';
import Paged from '../Pagination/Pagination';


function Home({alert, setAlert, soporte}) {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productReducer.productos);
  useEffect(() => {
    dispatch(getProducts());
    soporte();
  }, []);

  // useEffect(()=> {
  // },[])


  /**
   //!--------- PAGINADO ----------------------------------
   **/
  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage] = useState(15);
  const lastIndexProd = currentPage * prodPerPage;
  const firstIndexProd = lastIndexProd - prodPerPage;
  const currentProds = productos.slice(firstIndexProd, lastIndexProd);
  const prodsFinal = currentProds.filter(p => p.disabled === false);
  const Page = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };


  const filterCategory = (category) => {
    dispatch(getProductsbyCategory(category));
  };
  
  const filterPrice = (format) => {
    dispatch(getProductsbyPrice(format));
  };

  const filterDiscounts = (format) => {
    dispatch(getDiscounts(format));
  };
  
  
  const prodsss = productos.map(p => p.CategoryName);

  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }
  var unique = prodsss.filter( onlyUnique ); // devuelve array sin repetidos

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Categorias" id="basic-nav-dropdown">
                <NavDropdown.Item  onClick={() => dispatch(getProducts())}>Todos</NavDropdown.Item>
              {unique.map((p, i) => (
                  <NavDropdown.Item  key={i} onClick={() => filterCategory(p)}>
                    {p}
                  </NavDropdown.Item>
              ))
              
            }
            </NavDropdown>

             



              <NavDropdown title="Precio" id="basic-nav-dropdown">
                <NavDropdown.Item  onClick={() => dispatch(getProducts())}>Todos</NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterPrice('ASC')}>
                Mayor a menor
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterPrice('DESC')}>
                Menor a mayor                
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterDiscounts()}>
                Descuentos
                </NavDropdown.Item>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className={alert === true ? 'alertTrue' : 'alertFalse'}>
        <h1>No hay productos para mostrar</h1>
      </Container>


      <div className="containerCardsHome">
        {productos.length !== 0 ? (
          prodsFinal.map((producto, i) => (
            <div key={i}>
              <Card
                style={{ width: "18rem", marginBottom: "2%", height: "30rem" }}
                
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
          ))
        ) : 
        
            
        <>

                    {
                      alert === true ? 
                      null
                      :

                      <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    }
      
       
        </>
        }
      </div>
      <div className={"PagedHome"}>
        <Paged
          prodPerPage={prodPerPage}
          prodsLength={productos.length}
          Page={Page}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          prodsFinal={prodsFinal}
        />
       
      </div>
      
    </>
  );
}

export default Home