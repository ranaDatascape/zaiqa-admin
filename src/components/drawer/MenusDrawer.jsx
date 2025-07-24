import React, { useContext, useEffect } from "react";
import { Input, Label, Select } from "@windmill/react-ui";
import DrawerButton from "../form/button/DrawerButton";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import Scrollbars from "react-custom-scrollbars-2";

const MenusDrawer = ({ id, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const { closeDrawer } = useContext(SidebarContext);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch menu data for editing
  useEffect(() => {
    if (id) {
      const fetchMenuData = async () => {
        try {
          const response = await axiosPublic.get(`/menus/${id}`);
          if (response.status === 200) {
            const menuData = response.data;
            setValue("name", menuData.name);
            setValue("description", menuData.description);
            setValue("status", menuData.status);
          }
        } catch (error) {
          notifyError("Failed to fetch menu data");
        }
      };
      fetchMenuData();
    }
  }, [id, setValue, axiosPublic]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        // Update existing menu
        const response = await axiosPublic.put(`/menus/${id}`, data);
        if (response.status === 200) {
          notifySuccess("Menu Updated Successfully!");
          closeDrawer();
          refetch();
          reset();
        }
      } else {
        // Create new menu
        const response = await axiosPublic.post("/menus/add", data);
        if (response.status === 200 || response.status === 201) {
          notifySuccess("Menu Added Successfully!");
          closeDrawer();
          refetch();
          reset();
        }
      }
    } catch (error) {
      notifyError(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-medium mb-6">{id ? "Edit Menu" : "Add Menu"}</h2>
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
                <span>Menu Name</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="Enter menu name"
                  {...register("name", { 
                    required: "Menu name is required" 
                  })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </Label>

              <Label>
                <span>Menu Description</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="Enter menu description"
                  {...register("description", { 
                    required: "Menu description is required" 
                  })}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
              </Label>

              <Label>
                <span>Status</span>
                <Select 
                  className="mt-1"
                  {...register("status", { 
                    required: "Status is required" 
                  })}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
                {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
              </Label>
            </div>
            <DrawerButton id={id} title="Menu" isSubmitting={isSubmitting} />
          </form>
        </div>
      </Scrollbars>
    </div>
  );
};

export default MenusDrawer;
