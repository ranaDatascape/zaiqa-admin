import React, { useContext } from "react";
import { Input, Label, Select } from "@windmill/react-ui";
import DrawerButton from "../form/button/DrawerButton";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import Scrollbars from "react-custom-scrollbars-2";

const MenusDrawer = () => {
  const axiosPublic = useAxiosPublic();
  const { closeDrawer } = useContext(SidebarContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post("/menus/add", data);
      if (response.status === 200 || response.status === 201) {
        notifySuccess("Menu Added Successfully!");
        closeDrawer();
      }
    } catch (error) {
      notifyError(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-medium mb-6">Add Menu</h2>
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
              </Label>

              <Label>
                <span>Menu Description</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="Enter menu Description"
                  {...register("description", { 
                    required: "Menu URL is required" 
                  })}
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
            <DrawerButton title="Menu" isSubmitting={isSubmitting} />
          </form>
        </div>
      </Scrollbars>
    </div>
  );
};

export default MenusDrawer;
