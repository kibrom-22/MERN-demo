import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../ProductService";

const AddProductComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    id:"",
    name: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (id !== "_add") {
        ProductService.getProductById(id)
        .then((res) => {
          const {id, name, quantity, price } = res.data;
          setProduct({id, name, quantity, price });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const saveOrUpdateProduct = (p) => {
    p.preventDefault();
    if (id === "_add") {
        ProductService.createProduct(product)
        .then(() => {
          navigate("/products");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
        ProductService.updateProduct(product, id)
        .then(() => {
          navigate("/products");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (p) => {
    const { name, value } = p.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/products");
  };

  const getTitle = () => {
    if (id === "_add") {
      return <h3 className="text-center">Add Product</h3>;
    } else {
      return <h3 className="text-center">Update Product</h3>;
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form>
              <div className="form-group">
                  <label>Id:</label>
                  <input
                    placeholder="Id"
                    name="id"
                    className="form-control"
                    value={product.id}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    placeholder="Name"
                    name="name"
                    className="form-control"
                    value={product.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    placeholder="Quantity"
                    name="quantity"
                    className="form-control"
                    value={product.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    placeholder="Price"
                    name="price"
                    className="form-control"
                    value={product.price}
                    onChange={handleChange}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateProduct}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductComponent;