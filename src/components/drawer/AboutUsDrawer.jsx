import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import LabelArea from "../form/selectOption/LabelArea";
import InputArea from "../form/input/InputArea";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import DrawerButton from "../form/button/DrawerButton";

const AboutUsDrawer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { closeDrawer } = useContext(SidebarContext);
  
  // Separate states for each image
  const [files, setFiles] = useState({
    signatureImage: null,
    mainImage: null,
    secondaryImage: null
  });
  const [previews, setPreviews] = useState({
    signatureImage: null,
    mainImage: null,
    secondaryImage: null
  });

  const handleFileChange = (e, imageType) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    
    if (selectedFile.size > maxSize) {
      notifyError("Image size must be less than 5MB.");
      setFiles(prev => ({ ...prev, [imageType]: null }));
      setPreviews(prev => ({ ...prev, [imageType]: null }));
      return;
    }
    
    if (selectedFile) {
      setFiles(prev => ({ ...prev, [imageType]: selectedFile }));
      setPreviews(prev => ({ ...prev, [imageType]: URL.createObjectURL(selectedFile) }));
    }
  };


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // Append text data
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
  
      // Append image files directly with the correct field names
      if (files?.signatureImage) {
        formData.append('signatureImage', files?.signatureImage);
      }
      if (files?.mainImage) {
        formData.append('mainImage', files?.mainImage);
      }
      if (files?.secondaryImage) {
        formData.append('secondaryImage', files?.secondaryImage);
      }
  
      // Send directly to about-us endpoint with multipart/form-data
      const res = await axiosPublic.post("/about-us/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res.status === 201) {
        notifySuccess("About Us created successfully.");
        reset();
        closeDrawer();
        setFiles({ signatureImage: null, mainImage: null, secondaryImage: null });
        setPreviews({ signatureImage: null, mainImage: null, secondaryImage: null });
        window.location.reload();
      }
    } catch (error) {
      console.error("About Us creation failed:", error);
      notifyError(error.response?.data?.message || "About Us creation failed.");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-4xl text-center mt-4">About-Us</h1>
      </div>

      <Scrollbars>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            {/*Main Title */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Main Title" />
              <div className="col-span-6 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  name="mainTitle"
                  type="text"
                  placeholder="Please Enter Main Title"
                />
              </div>
            </div>
            {/*Sub Title */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Sub Title" />
              <div className="col-span-6 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  name="subTitle"
                  type="text"
                  placeholder="Please Enter Sub Title"
                />
              </div>
            </div>
            {/* Description */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label="Description" />
              <div className="col-span-6 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                />
              </div>
            </div>
            {/* Owner Name */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label="Owner Name" />
              <div className="col-span-6 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  name="ownerName"
                  type="text"
                  placeholder="Enter Owner Name"
                />
              </div>
            </div>
            {/* Designation */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label="Designation" />
              <div className="col-span-6 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  name="designation"
                  type="text"
                  placeholder="Enter Designation"
                />
              </div>
            </div>

            {/* Signature Image Upload */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label="Signature Images" />
              <div className="col-span-6 sm:col-span-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'signatureImage')}
                  className="border border-gray-300 rounded-lg p-2 block w-full cursor-pointer"
                />
              </div>
              {previews.signatureImage && (
                <img
                  src={previews.signatureImage}
                  alt="Signature Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Main Image Upload */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label="Main Images" />
              <div className="col-span-6 sm:col-span-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'mainImage')}
                  className="border border-gray-300 rounded-lg p-2 block w-full cursor-pointer"
                />
              </div>
              {previews.mainImage && (
                <img
                  src={previews.mainImage}
                  alt="Main Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Secondary Image Upload */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label="Secondary Images" />
              <div className="col-span-6 sm:col-span-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'secondaryImage')}
                  className="border border-gray-300 rounded-lg p-2 block w-full cursor-pointer"
                />
              </div>
              {previews.secondaryImage && (
                <img
                  src={previews.secondaryImage}
                  alt="Secondary Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Status */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-44 relative">
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

            {/* Submit Button */}
            <DrawerButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default AboutUsDrawer;
