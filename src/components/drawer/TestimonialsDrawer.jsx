import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useForm } from "react-hook-form";
import DrawerButton from "../form/button/DrawerButton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifyError, notifySuccess } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import LabelArea from "../form/selectOption/LabelArea";
import InputArea from "../form/input/InputArea";
import TextAreaCom from "../form/input/TextAreaCom";

const TestimonialsDrawer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { closeDrawer } = useContext(SidebarContext);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);


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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Add all text fields
      formData.append("name", data.name);
      formData.append("message", data.message);
      formData.append("designation", data.designation);
      formData.append("rating", data.rating);
      formData.append("serialNumber", data.serialNumber);
      formData.append("status", data.status);

      // Add the file if it exists
      if (file) {
        formData.append("image", file);
      }

      // Fix the endpoint URL
      const res = await axiosPublic.post("/testimonials/add?type=testimonials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        notifySuccess("Testimonial added successfully!");
        reset();
        closeDrawer();
        setPreview(null);
        setFile(null);
      }
    } catch (error) {
      console.error("Testimonial creation failed:", error);
      notifyError(
        error.response?.data?.message || "Testimonial creation failed!"
      );
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <h4>Add Testimonial</h4>
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Client Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Client Name"
                  name="name"
                  type="text"
                  placeholder="Client Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Message" />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Message"
                  name="message"
                  type="text"
                  placeholder="Message"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Designation" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Designation"
                  name="designation"
                  type="text"
                  placeholder="Designation"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Image" />
              <div className="col-span-8 sm:col-span-4">
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
              <LabelArea label="Rating" />
              <div className="col-span-8 sm:col-span-4">
                <select
                  {...register("rating", {
                    required: "Please select a rating",
                  })}
                  className="bg-[rgba(131,130,130,0.13)] w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select rating</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Serial Number" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="serialNumber"
                  name="serialNumber"
                  type="number"
                  placeholder="serialNumber"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Status" />
              <div className="col-span-8 sm:col-span-4">
                <select
                  name="status"
                  {...register("status", { required: true })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <DrawerButton title="Testimonial" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default TestimonialsDrawer;
