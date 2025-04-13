import React, { useContext, useState } from "react";
import { Input, Label, Select } from "@windmill/react-ui";
import DrawerButton from "../form/button/DrawerButton";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import Scrollbars from "react-custom-scrollbars-2";
import LabelArea from "../form/selectOption/LabelArea";

const SliderImagesDrawer = () => {
  const axiosPublic = useAxiosPublic();
  const { closeDrawer } = useContext(SidebarContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      notifyError("Image size must be less than 5MB.");
      setFile(null);
      setPreview(null);
      return;
    }
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    if (!file) {
      setMessage("Please select an image.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosPublic.post(`/images/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.imageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      setMessage("Image upload failed.");
      return null;
    }
  };

  const onSubmit = async (data) => {
    const uploadedImageUrl = await uploadImage();
    if (!uploadedImageUrl) return;

    const sliderData = {
      title: data.title,
      image: uploadedImageUrl,
      image_thumb: uploadedImageUrl,
      position: data.position,
      link: data.link,
      status: data.status,
    };

    try {
      const res = await axiosPublic.post("/slider-image/add", sliderData);
      if (res.status === 200 || res.status === 201) {
        notifySuccess("Slider Image Added Successfully!");
        reset();
        closeDrawer();
        setPreview(null);
        setFile(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Slider creation failed:", error);
      setMessage("Slider creation failed.");
      notifyError("Slider creation failed.");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-4xl text-center mt-4">Add Slider Image</h1>
      </div>

      <Scrollbars>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Slider Title" />
              <div className="col-span-6 sm:col-span-4">
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="Enter slider title"
                  {...register("title", { required: "Title is required" })}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label="Images" />
              <div className="col-span-6 sm:col-span-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-lg p-2 block w-full cursor-pointer"
                />
              </div>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Position" />
              <div className="col-span-6 sm:col-span-4">
                <Select
                  className="mt-1 w-full"
                  {...register("position", {
                    required: "Enter position number",
                  })}
                >
                  <option value="1">Slider</option>
                  <option value="2">Frist</option>
                  <option value="3">Second</option>
                  <option value="4">Third</option>
                  <option value="5">Fourth</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Link" />
              <div className="col-span-6 sm:col-span-4">
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="Enter slider link"
                  {...register("link", { required: "Link is required" })}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label="Status" />
              <div className="col-span-6 sm:col-span-4">
                <select
                  {...register("status", { required: true })}
                  className="border border-gray-300 rounded-lg p-2 block w-full bg-white"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>

            <DrawerButton title="Slider" isSubmitting={isSubmitting} />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default SliderImagesDrawer;
