import React from "react";
import SectionTitle from "./../../../Components/SectioTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_HOSTING_KEY;
const image_hosting_api =`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    // img upload to img bb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    if (res.data.success) {
      // now send the menu item data to the 
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url
      }
      const menuRes = await axiosSecure.post('/menu', menuItem)
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        reset()
        Swal.fire({
          icon: 'success',
          title: `${data.name} is added to the menu `,
          timer: 1500,
          showLoaderOnConfirm: false,
        });
      }
    }
    console.log(res.data);
  };
  return (
    <div>
      <SectionTitle
        heading={"add an item"}
        subHeading={"what's new?"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select defaultValue={'default'}
                {...register("category")}
                className="select select-bordered w-full "
              >
                <option disabled value={'default'}>
                  Select a category
                </option>
                <option value={"salad"}>Salad</option>
                <option value={"pizza"}>Pizza</option>
                <option value={"soup"}>Soup</option>
                <option value={"dessert"}>Dessert</option>
                <option value={"drinks"}>Drinks</option>
              </select>
            </div>
            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Recipe Name</span>
              </label>
              <input
                type="text"
                placeholder="Price"
                {...register("price")}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* Recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea {...register('recipe')}
              className="textarea textarea-bordered h-24" 
              placeholder="Recipe Details"
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
          </div>
          <button className="btn">
            Add Item <FaUtensils className="mr-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
