import React from 'react'
import { NavLink } from 'react-router-dom'


const noImage = "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"


function Product(props) {
    const {_id, title, price,category, image, desc, stock,qnty,rating, isAdmin, del } = props
    return (
        <React.Fragment>
            {
                stock === 0 ? null : (
                     <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">

                            <div className="card border-light position-relative">

                                    <span className="position-absolute top-0 end-0 translate-end badge bg-info rounded-pill">
                                    <i className="bi bi-star-fill"></i> {5}
                                        </span>
                                <NavLink to={`/product/details/${_id}`} style={{ textDecoration: "none"}} >
                                {
                                    image.url ? (
                                        <img src={image.url} alt={title} className="card-img-top" />
                                    ) : (
                                            <img src={noImage} alt={"No Image Found"} className="card-img-top" />
                                    )
                                }
                                </NavLink>
                                <div className="card-body">
                                    <h6 className="text-center text-uppercase"> {title} </h6>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <strong>Price</strong>
                                            <span className="float-end text-secondary"> &#8377; {price} </span>
                                        </li>
                                        <li className="list-group-item">
                                            <p className="text-justify">
                                                {desc}
                                            </p>
                                        </li>
                                        <li className="list-group-item">
                                            <p className="text-justify">
                                                {category}
                                            </p>
                                        </li>
                                    </ul>
                                    <div className="mt-3">
                                        {
                                            isAdmin ? (
                                                <>
                                                    <NavLink to={`/product/update/${_id}`} className="btn btn-sm btn-outline-info">
                                                        <i className="bi bi-pen"></i>
                                                    </NavLink>
                                                    <button onClick={() => del(_id)} className="btn btn-sm btn-outline-danger float-end">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </>
                                        ):
                                            null
                                    }
                                    </div>
                                </div>
                            </div>

                    </div>
                )
            }
    </React.Fragment>
  )
}

export default Product
