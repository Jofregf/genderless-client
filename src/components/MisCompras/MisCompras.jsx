import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/actions/productActions'
import { getMetaUserOrders } from '../../redux/actions/metamaskActions';
import { postReview } from '../../redux/actions/reviewActions'
import './MisCompras.css'
import Cookies from 'universal-cookie';

function MisCompras() {
    const cookies = new Cookies();
    const user = cookies.get('user')?.user
    
    const dispatch = useDispatch()
    const products = useSelector( state => state.metamaskReducer.status) 

    useEffect(() => {
      dispatch(getMetaUserOrders({ email: user?.email}))
      dispatch(getProducts())
    },[])

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [input, setInput] = useState({
      description: "",
      productTitle: "",
    });

    function handleSubmit(event) {
      event.preventDefault();
      
      dispatch(postReview({comment: input.description, rating: rating, productTitle: input.productTitle, email: cookies.get('user')?.email, name: cookies.get('user')?.user?.name, lastname: cookies.get('user')?.user?.lastName, token : cookies.get('user')?.tokenSession}))
      
      setRating(0);
      setHover(0);
      setInput({
        description: "",
        productTitle: "",
      })
    }

    function handleChange(event) {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }

  return (
    <div style={{ justifyContent: 'center'}}>

    <h4>Mis compras</h4>

    {
        products && products?.map( (producto, i) => {
            return (
              <div
                key={producto.id}
                style={{ width: "300px", margin: "2% auto" }}
              >
                <Card>
                  {/* <Card.Img variant="top" src={producto.payment_id} /> */}
                  <Card.Body>
                    <Card.Title>{producto.id}</Card.Title>
                    <small className="text-muted">Compra realizada: `${producto.createdAt}`</small>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header >Desplegar review</Accordion.Header>
                          <Accordion.Body>
                          <Form onSubmit={ (event) => handleSubmit(event)}>
                  <InputGroup.Text>Escribe tu review</InputGroup.Text>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Escribe tu review"
                    name="description"
                    value={input.description}
                    onChange={(event) => handleChange(event)}
                  />

                  <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={index <= (hover || rating) ? "on" : "off"}
                          value={input.rating}
                          name="rating"
                          onChange={(event) => handleChange(event, setRating(index))}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "2%" }}
                    onClick={() => setInput({
                      ...input,
                      productTitle: producto.name
                    })}
                  >
                    Enviar
                  </Button>
                </Form>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </small>
                  </Card.Footer>
                </Card>
              </div>
            );
        })
    }

    </div>
  )
}

export default MisCompras