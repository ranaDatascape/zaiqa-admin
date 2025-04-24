import React from "react";
import { Input } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifySuccess, notifyError } from "@/utils/toast";

const ProductUpdateDrawer = ({ id, product, refetch, closeDrawer }) => {
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.put(`/products/${id}`, data);
      if (response.status === 200) {
        notifySuccess("Product Updated Successfully!");
        refetch();
        closeDrawer();
      }
    } catch (error) {
      notifyError("Something went wrong!");
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: product?.productName,
      purchasePrice: product?.purchasePrice,
      salesPrice: product?.salesPrice,
      productQuantity: product?.productQuantity,
    },
  });

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl mt-5">Update Drawer Product</h1>
      </div>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Product Name
            </label>
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register("productName", {
                  required: "Product name is required!",
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                type="text"
                placeholder="Product Name"
              />
              {errors.productName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Purchase Price
            </label>
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register("purchasePrice", {
                  required: "Purchase price is required!",
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                type="number"
                placeholder="Purchase Price"
              />
              {errors.purchasePrice && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.purchasePrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Sales Price
            </label>
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register("salesPrice", {
                  required: "Sales price is required!",
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                type="number"
                placeholder="Sales Price"
              />
              {errors.salesPrice && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.salesPrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Quantity
            </label>
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register("productQuantity", {
                  required: "Product quantity is required!",
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                type="number"
                placeholder="Product Quantity"
              />
              {errors.productQuantity && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.productQuantity.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row-reverse pb-6">
            <button
              type="submit"
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductUpdateDrawer;
