import './AdminEdit.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editProduct, getProducts } from "../../redux/actions/productActions"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Cookies from "universal-cookie";


const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(5, "Mínimo 5 carácteres"),
    description: Yup.string()
        .required("Este campo es requerido")
        .max(480, "Máximo 480 carácteres")
        .min(2, "Completar campo"),
    image: Yup.string()
        .required("Este campo es requerido")
        .matches(RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/), "Ingresar formato URL"),
    price: Yup.string()
        .required("Este campo es requerido")
        .max(8, "Máximo 8 carácteres")
        .min(1, "Mínimo 1 carácteres"),
    discount: Yup.string()
        .required("Este campo es requerido")
        .max(2, "Máximo 2 carácteres")
        .matches(RegExp(/^[0-9]+$/), "Ingresar numero hasta de 0 a 99"),
    brand: Yup.string()
        .required("Este campo es requerido")
        .max(30, "Máximo 30 carácteres")
        .min(2, "Mínimo 2 carácteres"),
});
    
const AdminEdit = ({activeDrawer, handleHome, product}) => {
    const dispatch = useDispatch();
    const productos = useSelector( (state) => state.productReducer.productos )
    const preloadedValues = {
        description: product?.description,
        price: product?.price,
        discount: product?.discount,
        brand: product?.brand,
        image: product?.image,  
        stock_by_size: product?.stock_by_size
    }
    const formOptions = { resolver: yupResolver(formSchema), defaultValues: preloadedValues };
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions);
    const [addSizes, setAddSizes] = useState(product?.stock_by_size || [])
    const [size, setSize] = useState(null)
    const [quantity, setQuantity] = useState("")    
    const sizesState = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', 'L', 'M', 'S', 'XL', 'XS', 'XXL']
    const [sizeShoes, setSizeShoes] = useState(sizesState); 
    const [disabled, setDisabled] = useState(true)
    const filterCategory = productos?.map(( product, i ) => product.CategoryName)
    const categories = new Set(filterCategory)
    const arrayCategories = [...categories]
    const [selectCategory, setSelectCategory] = useState( product ? product.CategoryName : '')
    const [error, setError] = useState("");
    let cookie = new Cookies();
    const tokenUser = cookie.get('user')?.tokenSession

    for(let i = 0; i < addSizes?.length ; i++) {
        for(let j = 0; j < sizesState.length; j++) {
        if(addSizes[i].size === sizesState[j]){
            sizesState.splice(j,1)
            }
        }
    }
//         return ((!pathname.includes("admin") && pathname !=="/")  &&
// !pathname.includes("producto") &&
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    const onSubmit = (data) => {
        const sendData = {...data ,
            "stock_by_size" : addSizes,
            "discount": Number(data.discount),
            "id": product.id,
            "price": data.price,
            "disabled": false,
            "category": selectCategory
        }
        dispatch(editProduct(sendData, {token: tokenUser}));        
        handleHome();
        activeDrawer();
    };

    const handleSize = (e) => {
        e.preventDefault();
        setAddSizes([
        ...addSizes,
            {"size":size, "stock":Number(quantity)}
        ])
        const filterSize = sizeShoes.filter(e => e !== size)
        setSizeShoes(filterSize)
        setDisabled(true)
        setQuantity("")
    }

    const handleSelectSize = (e) => {
        e.preventDefault();
        setSize(e.target.value)
        if(quantity > 0) {
            setDisabled(false)
        }
    }

    const handleDeleteSize = (e) => {
        e.preventDefault();
        const arrayDelete = [...addSizes]
        arrayDelete.splice(e.target.name, 1)
        setAddSizes(arrayDelete)
        const valor = [...sizeShoes, e.target.value]
        setSizeShoes(valor)
    }

    const handleSelectQuantity = (e) => {
        e.preventDefault();
        setQuantity(e.target.value)
        if(size !== null) {
            setDisabled(false)
        }
    }
    const handleSelect = (e) => {
        e.preventDefault();
        setSelectCategory(e.target.value)
    }

    const handleSelectCategoryInput = (e) => {
        e.preventDefault();
        setSelectCategory(e.target.value)
        setError(validate(e.target.value))
    }

    const validate = (selectCategory) => {
        let errors = "";
        if(!selectCategory){
            errors = "Categoría requerida"
        }else if (!/^[a-z A-Z]+$/.test(selectCategory)){
            errors = "Categoría permite solo letras Minusculas y/o Mayusculas"
        }
        return errors
    }

    return (
        <div className="container-register-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container-index">
                    <div className="form-container">
                        <div className="title">Editar artículo</div>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">*Nombre: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="name"
                                    value={product?.name}
                                    {...register('name')}
                                />
                                {<div className="form-register-errors">{errors.name?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Marca: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="brand"
                                    {...register('brand')}
                                    />
                                {<div className="form-register-errors">{errors.brand?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*URL de imagen: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="image"
                                    {...register('image')}
                                />
                                {<div className="form-register-errors">{errors.image?.message}</div>}
                            </div>
                            <div className="input-small">
                                <div className="labelAndInput-small">
                                    <label className="input-label">*Precio: </label>
                                    <input
                                        className="input-register"
                                        type="number"
                                        name="price"
                                        {...register('price')}
                                        />
                                    {<div className="form-register-errors">{errors.price?.message}</div>}
                                </div>
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Descripción: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="description"
                                    {...register('description')}
                                />
                                {<div className="form-register-errors">{errors.description?.message}</div>}
                            </div>
                            <div className="input-small">
                                <div className="labelAndInput-small">
                                    <label className="input-label">*Descuento en N%: </label>
                                    <input
                                        className="input-register"
                                        type="number"
                                        name="discount"
                                        {...register('discount')}
                                        />
                                    {<div className="form-register-errors">{errors.discount?.message}</div>}
                                </div>
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Categoría: </label>
                                <select className="select-category-product" onChange={(e)=> handleSelect(e)}>
                                    <option value="">Agregar nueva:</option>
                                    {arrayCategories?.map( (category, i) => 
                                        {
                                            return <option key={i} value={category}>{category}</option>
                                        }    
                                        )
                                    }
                                </select>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="category"
                                    value={selectCategory ? selectCategory : ""}
                                    onChange={(e)=> handleSelectCategoryInput(e)}
                                />
                                {<div className="form-register-errors">{errors.category?.message}</div>}
                                {error && (<div className="form-register-errors">{error}</div>)}
                            </div>
                        </div>
                        <div className="container-stock">
                            <div className= "container-stock-button">
                                <button className={!disabled || quantity === 0 ? "button-create-stock" : "button-create-stock-disabled"} disabled={disabled} onClick={(e)=> handleSize(e)}>Agregar talle</button>
                            </div>
                            <div className= "container-stock-selectAndInput">
                                <select className="select-create-stock" onChange={(e)=> handleSelectSize(e)}>
                                    {
                                        sizeShoes?.map((e, i) => {
                                            return(
                                                <option key={i} value={e}>{e}</option>
                                                )
                                            })
                                        }
                                </select>
                                <div className="labelAndInput-stock">
                                    <input
                                        className="input-create-stock"
                                        type="text"
                                        placeholder="Stock"
                                        onChange={(e)=>handleSelectQuantity(e)}
                                        value={quantity}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="labelAndInput-stock-finally">
                            {
                                addSizes?.map((e,i) => {
                                    return(
                                        <button onClick={(e) => handleDeleteSize(e)} name={i} value={e.size} key={i}>{e.size} : {e.stock}u</button>
                                        )
                                })
                            }
                        </div>
                        <div className="form-submit">
                            <input
                                type="submit"
                                value="EDITAR PRODUCTO"
                                
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { AdminEdit }