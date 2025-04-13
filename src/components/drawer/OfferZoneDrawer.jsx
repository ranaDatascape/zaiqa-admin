import React, { useContext } from "react";
import { Input, Label, Select } from "@windmill/react-ui";
import DrawerButton from "../form/button/DrawerButton";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import Scrollbars from "react-custom-scrollbars-2";
import useGetDatas from "@/hooks/useGetDatas";

const OfferZoneDrawer = () => {
  const axiosPublic = useAxiosPublic();
  const { closeDrawer } = useContext(SidebarContext);
  const [data , isLoading] = useGetDatas("/products", "products");
  const {
    handleSubmit,
    register,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post("/offer-zone/add", data);
      if (response.status === 200 || response.status === 201) {
        notifySuccess("Offer Added Successfully!");
        closeDrawer();
      }
    } catch (error) {
      notifyError(error.message || "Something went wrong!");
    }
  };

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-medium mb-6">Add Offer</h2>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        style={{ height: 'calc(100vh - 200px)' }}
        className="w-full relative dark:bg-gray-700 dark:text-gray-200"
      >
        <div className="px-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
            <Label>
                <span>Product Name</span>
                <Select 
                  className="mt-1"
                  {...register("productId", { required: "Product is required" })}
                >
                  <option value="">Select Product</option>
                  {data?.rows?.map((product, i) => (
                    <option key={i} value={product.id}>
                      {product?.productName}
                    </option>
                  ))}
                </Select>
              </Label>

              <Label>
                <span>OfferPrice</span>
                <Input
                  className="mt-1"
                  type="number"
                  placeholder="Enter discount percentage"
                  {...register("offerPrice" , {required : "price is required"})}
                />
              </Label>

              <Label>
                <span>Status</span>
                <Select 
                  className="mt-1"
                  {...register("status", { 
                    required: "Status is required" 
                  })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </Label>
            </div>
            <DrawerButton title="Offer" isSubmitting={isSubmitting} />
          </form>
        </div>
      </Scrollbars>
    </div>
  );
};

export default OfferZoneDrawer;