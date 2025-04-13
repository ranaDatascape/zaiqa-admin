import React, { useContext } from "react";
import { Input, Label, Select } from "@windmill/react-ui";
import useGetDatas from "@/hooks/useGetDatas";
import DrawerButton from "../form/button/DrawerButton";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import Scrollbars from "react-custom-scrollbars-2";

const DailyDealsDrawer = () => {
  const [data, isLoading] = useGetDatas("/products", "products");
  const axiosPublic = useAxiosPublic();
  const { closeDrawer } = useContext(SidebarContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData)
    try {
      const response = await axiosPublic.post("/daily-deals/add", formData);
      if (response.status === 200 || response.status === 201) {
        notifySuccess("Daily Deal Added Successfully!");
        closeDrawer();
        window.location.reload();
      }
    } catch (error) {
      notifyError(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-medium mb-6">Add Daily Deals</h2>
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
                      {product.productName}
                    </option>
                  ))}
                </Select>
              </Label>
  
              <Label>
                <span>Deal Price</span>
                <Input
                  className="mt-1"
                  type="number"
                  placeholder="Enter deal price"
                  {...register("price", { 
                    required: "Deal price is required",
                    min: { value: 0, message: "Price cannot be negative" }
                  })}
                />
              </Label>
  
              <Label>
                <span>Quantity</span>
                <Input
                  className="mt-1"
                  type="number"
                  placeholder="Enter deal quantity"
                  {...register("quantity", { 
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" }
                  })}
                />
              </Label>
  
              <Label>
                <span>Start Date</span>
                <Input 
                  className="mt-1" 
                  type="datetime-local"
                  {...register("startTime", { required: "Start date is required" })}
                />
              </Label>
  
              <Label>
                <span>End Date</span>
                <Input 
                  className="mt-1" 
                  type="datetime-local"
                  {...register("endTime", { required: "End date is required" })}
                />
              </Label>
  
              <Label>
                <span>Status</span>
                <Select 
                  className="mt-1"
                  {...register("status", { required: "Status is required" })}
                >
                  <option value="active">Active</option>
                  <option value="expired">Inactive</option>
                </Select>
              </Label>
            </div>
            <DrawerButton title="Daily Deals" isSubmitting={isSubmitting} />
          </form>
        </div>
      </Scrollbars>
    </div>
  );
};

export default DailyDealsDrawer;
