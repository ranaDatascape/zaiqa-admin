import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useForm } from "react-hook-form";
import DrawerButton from "../form/button/DrawerButton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifyError, notifySuccess } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import LabelArea from "../form/selectOption/LabelArea";
import InputArea from "../form/input/InputArea";

const GalleryDrawer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { closeDrawer } = useContext(SidebarContext);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      notifyError("Image size must be less than 5MB.");
      setPreview(null);
      return;
    }
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await axiosPublic.post(
        "/gallery/add?type=gallery",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.status === 200) {
        notifySuccess("Gallery image added successfully.");
        reset();
        closeDrawer();
        setPreview(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Gallery image creation failed:", error);
      notifyError("Gallery image creation failed.");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-4xl text-center mt-4">Add Gallery Image</h1>
      </div>

      <Scrollbars>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Image Title" />
              <div className="col-span-6 sm:col-span-4">
                <input
                  {...register("title", { required: true })}
                  name="title"
                  type="text"
                  placeholder="Gallery image title"
                  className="border border-gray-300 rounded-lg p-2 block w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Image" />
              <div className="col-span-6 sm:col-span-4">
                <input
                  {...register("image", { required: true })}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-lg p-2 block w-full cursor-pointer"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Status" />
              <div className="col-span-6 sm:col-span-4">
                <select
                  {...register("status", { required: true })}
                  className="border border-gray-300 rounded-lg p-2 block w-full bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <DrawerButton title="Gallery" isSubmitting={isSubmitting} />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default GalleryDrawer;
