import './DetailProduct.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getProduct } from "../../redux/actions/productActions"
import { addfavProduct, deletefavProduct, getFavorites, deleteProductAction } from '../../redux/actions/favoritesActions';
import { addProduct, stateNav } from '../../redux/actions/shoppingActions';
import { BsSuitHeartFill } from 'react-icons/bs';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import { Button, Card, Container, Form, FormControl, InputGroup } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import { getReviews, postReview } from '../../redux/actions/reviewActions'


const DetailProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector( (state) => state.productReducer.producto)
  const [show, setShow] = useState("")
  const [sizeSelect, setSizeSelect] = useState(null)
  const cookies = new Cookies();
  const user = cookies.get('user')?.user
  const tokenUser = cookies.get('user')?.tokenSession;
  const shoppingCookie = cookies.get('shopping')
  const favoriteCookie = cookies.get('favorite')
  const productsFavorites = useSelector( state => state.favoriteReducer.favorites)
  const productInFavorites = productsFavorites?.filter(p=> p.id == id)
  const productInFavoritesCookies = favoriteCookie?.filter(p=> p.id == id)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    dispatch(getFavorites({ email : user?.email })) 
    dispatch(getReviews({token: tokenUser}))
    dispatch(getProduct(id))
    return function deleteProduct(){
      dispatch(deleteProductAction())
    }    }, [dispatch, id])
    
    useEffect(() => {
      (productInFavorites?.length || productInFavoritesCookies?.length) && setFavorite(true) 
    }, [productsFavorites, favoriteCookie])
    
    
  if(shoppingCookie === undefined) {
    cookies.set('shopping', [], { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
    cookies.set('totalShopping', [], { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
    }
  if(favoriteCookie === undefined) {
    cookies.set('favorite', [], { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
    }
  const addShoppingCart = () => {
    if(!sizeSelect) return setShow("Seleccionar size para añadir")
    if(!user){
      dispatch(stateNav())
      const item = {...product, UserProduct: {id: product.id, size: sizeSelect} }
      const addProductShopping = [...shoppingCookie, item]
      cookies.set('shopping', 
        addProductShopping
      , { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
      setShow("Añadido al carrito")
    }
    if(user){
      dispatch(addProduct({ email: user?.email, productId: Number(id), productSize: sizeSelect, productQuantity: 1 }))
      dispatch(stateNav())
      setShow("Añadido al carrito")
    }
  }

  const addFavorites = () => { 
      setFavorite(!favorite)
      if(!favorite) {
        if(!user){
          dispatch(stateNav())
          const addProductFavorite = [...favoriteCookie, product]
          cookies.set('favorite', 
            addProductFavorite
          , { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
          setShow("Añadido a favoritos")
        }
        if(user){      
          dispatch(addfavProduct({ email: user?.email, productId: Number(id) }))
          setShow("Añadido a favoritos")
          dispatch(stateNav())
        }
      }else {        
        if(user){
          dispatch(deletefavProduct({ email: user?.email, productId: Number(id) }))
          setShow("Eliminado de favoritos")
          dispatch(stateNav())
        }
        if(!user){  
          const deleteFavCookie = favoriteCookie.find(e => e.name === product.name) 
          const indexOf = favoriteCookie.indexOf(deleteFavCookie)
          const copyFavoritesCookie = favoriteCookie
          copyFavoritesCookie.splice(indexOf, 1)
          cookies.set('favorite', 
            copyFavoritesCookie
          , { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
          setShow("Eliminado de favoritos")
          dispatch(stateNav())
        }
      }
  }

  const handleSize = (sizes) => {
    if(sizes === sizeSelect) return setSizeSelect(null)
      setSizeSelect(sizes);
  }

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [input, setInput] = useState({
      description: "",
    });

    function handleSubmit(event) {
      event.preventDefault();
      
      dispatch(postReview({comment: input.description, rating: rating, productTitle: product.name, email: cookies.get('user')?.email, name: cookies.get('user')?.name, lastname: cookies.get('user')?.user?.lastName, token: tokenUser}))

      setRating(0);
      setHover(0);
      setInput({
        description: "",
      })
    }

    function handleChange(event) {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }

    const reviewsFilter = useSelector( (state) => state.reviewReducer.AllReviews.review)
    //const reviesWithName = reviews?.filter(r => r.UserId) 
    const reviewsOfTheProduct = reviewsFilter?.filter(r => r.ProductId == id)



    return (
      <>
        <div>
          {product ? (
            <>
              <div className="main-container">
                <div className="detailProduct-container">
                  <div className="title-category">
                    <p> {"Categoría/" + product?.CategoryName} </p>
                    <Link
                      to="/home"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      <TiArrowBack />
                    </Link>
                  </div>
                  <div className="detail-one">
                    <div className="detail-one-left">
                      <img
                        className="detail-img"
                        src={product.image}
                        alt="zapatilla"
                      />
                    </div>
                    <div className="detail-one-right">
                      <h1 className="detail-one-name"> {product.name} </h1>
                      <div className="detail-one-sku">
                        SKU: Item No. NI_{product.id}{" "}
                      </div>
                      <div className="detail-one-price">${product.price} </div>
                      <div className="detail-one-cards">
                        <img
                          className="detail-img-pagos-eth"
                          src="https://www.profesionalreview.com/wp-content/uploads/2021/05/eth-1024x576.jpg"
                          alt="ethereum"
                        />
                        <img
                          className="detail-img-pagos"
                          src="https://i.pinimg.com/originals/b6/3b/54/b63b54d4f0074710e9dd0f8e6d3c9fbd.jpg"
                          alt="zapatilla"
                        />
                      </div>
                      <div className="detail-size">Talles</div>
                      <div className="detail-one-size">
                        {product.disabled ? (
                          <div className="detail-sizes2-disabled">
                            <span className="sizes2Size">
                              Producto no disponible
                            </span>
                          </div>
                        ) : (
                          <div className="sizesMap">
                            {product.stock_by_size?.map((size, i) => {
                              const sizes = size.size;
                              const selectSize = sizeSelect === sizes;
                              return (
                                <button
                                  key={i}
                                  value="2"
                                  onClick={(e) => handleSize(sizes)}
                                  disabled={!size.stock}
                                  className={
                                    size.stock
                                      ? selectSize
                                        ? "detail-sizes2-selected"
                                        : "detail-sizes2"
                                      : "detail-sizes2-disabled"
                                  }
                                >
                                  <span className="sizes2Size">
                                    {" "}
                                    {size.size}{" "}
                                  </span>
                                  <span className="sizes2NumerOfSize">
                                    ({size.stock}){" "}
                                  </span>
                                  <br />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <p
                        className={
                          show ? "producto_agregado" : "producto_sinagregar"
                        }
                      >
                          {show}
                      </p>
                      <div className="detail-one-buttons">
                        <button
                          disabled={product.disabled}
                          onClick={() => addShoppingCart()}
                          className={
                            (product.disabled || !sizeSelect)
                              ? "detail-button-buy-disabled"
                              : "detail-button-buy"
                          }
                        >
                          Agregar al carrito
                        </button>
                        <button
                          onClick={() => addFavorites()}
                          className={
                            favorite
                              ? "detail-button-like-select"
                              : "detail-button-like"
                          }
                          style={{
                            border: "none",
                            background: "none",
                            textDecoration: "none",
                          }}
                        >
                          <BsSuitHeartFill />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="detail-two">
                    <div>
                      <strong>Descripción</strong>
                    </div>
                    <div className="description-right">
                      <p className="description-top"> {product.description}</p>
                      <div className="description-bottom">
                        <div className="description-bottom-p">
                          <strong>Marca:</strong> {product.brand} <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Container style={{ marginTop: "5%" }}>
                
              </Container>

              {
                Array.isArray(reviewsOfTheProduct) ? 
                
                reviewsOfTheProduct?.map((review, i) => {
                return (
                  <Container style={{ margin: "5% 0 0 0", margin: "0 5% 0 0" }}>
                <Card>
                  <Card.Body>
                    <Card.Title>{review?.name} {review?.lastname}</Card.Title>
                    <Card.Title>{
                    
                    review?.rating === 1 ? <> <AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/> </>:
                    review?.rating === 2 ? <> <AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/> </>:
                    review?.rating === 3 ? <> <AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/> </>:
                    review?.rating === 4 ? <> <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/> </>:
                    review?.rating === 5 ? <> <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/> </>:
                    null
                    }</Card.Title>
                    <Card.Text>
                      {review?.comment}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Container>
                )
                })
                : 
                <Container style={{ margin: "5% auto"}}>
                  <h6>No hay reviews para este producto</h6>
                </Container>
              }
            </>
          ) : (
            <div className="loading">
              <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </>
    );
}

export { DetailProduct }