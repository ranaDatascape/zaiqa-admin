import { SidebarContext } from "@/context/SidebarContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useGetDatas from "@/hooks/useGetDatas";
import { notifyError, notifySuccess } from "@/utils/toast";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import DrawerButton from "../form/button/DrawerButton";
import Scrollbars from "react-custom-scrollbars-2";
import LabelArea from "../form/selectOption/LabelArea";

const PackageMappingDrawer = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const { closeDrawer } = useContext(SidebarContext);
  const axiosPublic = useAxiosPublic();

  const [packageNames, isLoadingDetails] = useGetDatas("/packages", "packages");
  const [productNames, isLoading] = useGetDatas("/products", "products");
console.log(productNames)
  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post("/package-mapping/add", data);
      console.log(res)
      if (res.status === 201 || res.status === 200) {
        notifySuccess("Package Mapping Added Successfully");
        closeDrawer();
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };

  if(isLoading || isLoadingDetails) return <h1>Loading...</h1>

  return (
    <>
      <div>
        <h1 className="text-4xl text-center mt-4">Add Package</h1>
      </div>

      <Scrollbars className="w-full md:w-12/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200 overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            {/* Package Name */}
            <div className="grid grid-cols-6 gap-3 mb-6">
              <LabelArea label="Package Name" />
              <div className="col-span-8 sm:col-span-4">
                <select
                className="w-full p-2 border border-gray-300 rounded-md"
                  name="packageId"
                  {...register("packageId", { required: "Name is required!" })}
                >
                  <option value="" defaultValue hidden>
                    Select PackagesName
                  </option>
                  {packageNames?.data?.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product ID */}
            <div className="grid grid-cols-6 gap-3 mb-6">
              <LabelArea label="Product Name" />
              <div className="col-span-8 sm:col-span-4">
                <select
                className="w-full p-2 border border-gray-300 rounded-md"
                  name="productId"
                  {...register("productId", { required: "Product is required!" })}
                >
                  <option value="" defaultValue hidden>
                    Select Product Name
                  </option>
                  {productNames?.rows?.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.productName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Package Days */}
            <div className="grid grid-cols-6 gap-3 mb-6">
              <LabelArea label="Package Days" />
              <div className="col-span-8 sm:col-span-4">
                <select
                className="w-full p-2 border border-gray-300 rounded-md"
                  name="packageDays"
                  {...register("packageDays", {
                    required: "Package-Days is required!",
                  })}
                >
                  <option value="" hidden>
                    Select Packages Days
                  </option>
                  <option value="1">Saturday</option>
                  <option value="2">Sunday</option>
                  <option value="3">Monday</option>
                  <option value="4">Tuesday</option>
                  <option value="5">Wednesday</option>
                  <option value="6">Thursday</option>
                </select>
              </div>
            </div>

            {/* Package Status */}
            <div className="grid grid-cols-6 gap-3 mb-44 mt-32">
              <LabelArea label="Status" />
              <div className="col-span-8 sm:col-span-4">
                <select
                className="w-full p-2 border border-gray-300 rounded-md"
                  name="status"
                  {...register("status", { required: "Status is required!" })}
                >
                  <option selected value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <DrawerButton title="Package Mapping" isSubmitting={isSubmitting} />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default PackageMappingDrawer;
