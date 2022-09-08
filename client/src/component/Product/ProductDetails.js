import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {useParams} from 'react-router-dom';
import {GlobalContext} from '../../GlobalContext'


function ProductDetails() {
    const data = useContext(GlobalContext);
    const [isAdmin] = data.authApi.isAdmin;


    const params = useParams();
    const [product, setProduct] = useState("")
    const [itemCount, setItemCount] = useState(0)
    const addToCart = data.authApi.addToCart

    const getSingle = async (id) => {
        let res =   await axios.get(`/api/v1/product/get/${id}`)
            setProduct(res.data.product)
    }

    useEffect(()=>{
        getSingle(params.id)
    },[])

    const incItemCount = () => {
        setItemCount(itemCount+1)
    }
    const decItemCount = () => {
        if(itemCount <= 0) {
            return;
          } else {
            setItemCount(itemCount - 1);
          }
        setItemCount(itemCount-1)
    }
  return (
    <div className='container'>
      <div className="row">
        <div className='col-md-12 text-center'>
            <h3 className='display-3 text-secondary'>Product details</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-5 col-sm-12'>
            <div className='card'>
                {
                    !product ? null :
                    <img src={product.image.url} alt={product.title} className='card-img-top'/>

                }
            </div>
        </div>
        <div className='col-lg-7 col-md-6 col-sm-12'>
            <div className='card border-light'>
                <div className='card-header text-center'>
                    <h6 className='display-6 card-title text-secondary text-uppercase'>{product.title}</h6>
                </div>
                <div className='card-body'>
                    <div className='mb-2 position-relative'>
                        <span className='badge position-absolute bg-success rounded-pill end-0 '>
                            Rating <i className='bi bi-star-fill'></i>5
                        </span>
                    </div>
                    <div className='mt-4'>
                        <p className='text-warning fs-2'> &#8377; {product.price} <del className='fs-6 text-muted'>&#8377;{product.price + (product.price * (10/100))}</del> </p>
                        {/* <del className='text-muted'> &#8377;{product.price + (product.price * (10/100))}</del> */}
                        {/* <span className='fs-6 text-muted'>(inclusive GST)</span> */}
                    </div>
                    <div className='mt-3'>
                      <p> <strong className='text-secondary fs-6'>Quantity</strong></p>
                      <button className='btn btn-outline-secondary'>{product.quantity}</button> 
                    </div>
                    {
                        isAdmin ? null : (
                            <div className='float-end'>
                            {/* <span onClick={decItemCount} className='btn btn-sm btn-danger'>-</span>
                            <strong>{itemCount}</strong>
                            <span onClick={incItemCount} className='btn btn-sm btn-warning'>+</span> */}
                        </div>
                        )
                    }
                     <div className='mt-3'>
                      <p> <strong className='text-secondary fs-6'>Stock</strong></p>
                      <button className='btn btn-outline-secondary'>{product.stock}</button> 
                    </div>
                    <div className='mt-3'>
                        <p><strong className='text-secondary fs-6'>Description</strong></p>
                        <p className='text-justify'>{product.desc}</p>
                    </div>
                    <div className='mt-3'>
                        <p><strong className='text-secondary fs-6'>Category</strong></p>
                        <p className='text-justify'>{product.category}</p>
                    </div>
                    <div className='mt-3 d-grid col-8 mx-auto'>
                        {
                            isAdmin ? null :(
                                <button onClick={()=> addToCart(product)} className='btn btn-outline-warning text-primary fs-5'>Add to cart</button>

                            )
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
