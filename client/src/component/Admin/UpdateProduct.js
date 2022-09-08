import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../GlobalContext';
import "./create_product.css"
import { useNavigate, useParams } from 'react-router-dom'

const LoadingSpinner=() => {
    return(
        <div className='spinner-border text-success' style={{width: '3rem', height: '3rem'}} role='status'>
            <span className='visually-hidden'>Loading...</span>
        </div>
    )
}

function UpdateProduct() {
    //context
    const data = useContext(GlobalContext)
    const [categories] = data.categoryApi.categories;
    const [token] = data.token
    const [products] = data.productApi.products;

    const navigate = useNavigate();
    const params   = useParams();

    //state
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(false)
    const [product, setProduct] = useState({
        title: '',
        category: '',
        price: '',
        quantity: '',
        desc: '',
        stock: 0
    })

    useEffect(() => {
        let single = products.find(item => item._id === params.id)
        setProduct(single)
        setImage(single.image)
    }, [])
//image upload handler
    const handleUpload = async (e) => {
        e.preventDefault();
        try{
            //read file content from input
            const file = e.target.files[0];
            if(!file)
                return toast.error("file should not selected...")

                //file size

                if(file.size > 5 * 1024 * 1024)
                return toast.error('file size is too large');

                //ref formData

                let formData = new FormData()
                formData.append('productImg', file)

                setLoading(true)

                //upload logic

                const res = await axios.post(`/api/v1/image/product/upload`, formData, {
                    headers: {
                        'content-type' : 'multipart/form-data',
                        Authorization: token
                    }
                })
                //after upload
                setLoading(false);
                setImage(res.data)
        }catch(err){
            toast.error(err.response.data.msg)
        }
    }
////image delete handler
const handleDestroy = async (e)=> {
    try{
        if(window.confirm(`Are you sure to delete image`)) {
            setLoading(true)
        await axios.post(`/api/v1/image/product/destroy`, {public_id: image.public_id}, {
            headers: {Authorization: token}
        
        })
        setImage(false)
        setLoading(false)
    }else{
        toast.warning('delete terminated')
    }
    }catch(err) {
        toast.error(err.response.data.msg)
    }
}

    const readValue = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if(!image)
        return toast.error("Image doesn`t exists...")

        const res = await axios.put(`/api/v1/product/update/${params.id}`, {...product, image}, {
            headers:{Authorization: token}
        })
        setImage(false)
        toast.success("product Updated successfully")
        navigate('/')
    }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center">
            <h4 className='display-4 text-secondary'>UPDATE Product</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 mt-2">
            <div className="card upload">
                <div className="card-body">
                    <input type="file" name="productImg" id='file_up' className='form-control' onChange={handleUpload}  required/>
                        {
                            loading? (<div id='file_img'><LoadingSpinner/></div>):
                            (
                                <div id="file_img">
                                    <img src={image ? image.url : ''} alt='' className='src'/>
                                    <strong className='btn btn-sm btn-danger' onClick={handleDestroy}>
                                        <i className='bi bi-x'></i>
                                    </strong>
                                </div>
                                )
                        }
                </div>
            </div>
        </div>
        <div className='col-lg-8 col-md-8 mt-2'>
            <div className="card">
                <div className="card-body">
                    <form autoComplete='off' onSubmit={submitHandler}>
                        <div className='form-group mt-2'>
                        <label htmlFor='title'>Title</label>
                        <input type="text" name="title" value={product.title} onChange={readValue} id='title' className='form-control'/>
                        </div>
                        <div className='form-group mt-2'>
                        <label htmlFor='price'>Category</label>
                        <select  name="category"  value={product.category} onChange={readValue}id='category' className='form-select'>
                           <option>Choose Category</option>
                           <optgroup label=''>
                           {
                                categories && categories.map((item, index) => {
                                    return(
                                        <option key={index} value={item.title}>{item.title}</option>
                                    )
                                })
                            }
                           </optgroup>
                        </select>
                        </div>
                        <div className='form-group mt-2'>
                        <label htmlFor='price'>Price</label>
                        <input type="number" name="price" value={product.price} onChange={readValue} id='price' className='form-control'/>
                        </div>
                        <div className='form-group mt-2'>
                        <label htmlFor='title'>Description</label>
                        <input type="text" name="desc" value={product.desc} onChange={readValue} id='desc' className='form-control'/>
                        </div>
                        <div className='form-group mt-2'>
                        <label htmlFor='quantity'>Quantity</label>
                        <input type="text" name="quantity" value={product.quantity} onChange={readValue} id='quantity' className='form-control'/>
                        </div>
                        <div className='form-group mt-2'>
                        <label htmlFor='stock'>Stock</label>
                        <input type="number" name="stock" value={product.stock} onChange={readValue} id='stock' className='form-control'/>
                        </div>
                       <div className='form-group'>
                        <input type='submit' value='update' className='btn btn-info'/>
                       </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
