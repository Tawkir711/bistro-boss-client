import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';

const FoodCard = ({ item }) => {
  console.log('44',item);
  const { name, image, price, recipe, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
    //  send cart item to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: `${name} added your cart`,
              showConfirmButton: false,
              timer: 1500
            });
            // refetch cart to update the cart items count
            refetch();
          }
      })

    } else {
      Swal.fire({
        title: "You are not logged in ",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state: {from: location}})
        }
      });
    }
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-3 bg-black text-white">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart}
            className="btn btn-outline border-0 border-orange-400 border-b-4 mt-4">
            Add To Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;