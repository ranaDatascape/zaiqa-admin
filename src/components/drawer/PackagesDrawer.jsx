import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Scrollbars from "react-custom-scrollbars-2";
import LabelArea from "../form/selectOption/LabelArea";
import DrawerButton from "../form/button/DrawerButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifySuccess } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import { Input } from "@windmill/react-ui";

const PackagesDrawer = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const { closeDrawer } = useContext(SidebarContext);
  const axiosPublic = useAxiosPublic();

  const [description, setDescription] = useState("");

  const onSubmit = async (data) => {
    const packageData = { ...data, slug: data.name?.toLowerCase().replace(/[^A-Z0-9]+/gi, "-") };
    const res = await axiosPublic.post("/packages/add", packageData);
    if (res.status === 200 || res.status === 201) {
      notifySuccess("Package Added Successfully");
      closeDrawer();
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Headers
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ align: [] }], // Alignments
      [{ color: [] }, { background: [] }], // Text color & background color
      ["blockquote", "code-block"], // Blockquote & Code block
      ["link", "image", "video"], // Media tools
      ["clean"], // Remove formatting
      ["custom-check"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "script",
    "indent",
    "align",
    "color",
    "background",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

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
                <Input
                  {...register(`name`, {
                    required: "Product name is required!",
                  })}
                  name="name"
                  type="text"
                  placeholder={"ProductName"}
                />
              </div>
            </div>

            {/* Package Days */}
            <div className="grid grid-cols-6 gap-3 mb-6">
              <LabelArea label="Package Price" />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`price`, {
                    required: "Package-Price is required!",
                  })}
                  name="price"
                  type="text"
                  placeholder={"PackagePrice"}
                />
              </div>
            </div>

            {/* Package Description with CKEditor */}
            <div className="grid grid-cols-6 gap-3 mb-6">
              <LabelArea label="Package Description" />
              <div className="col-span-8 sm:col-span-4 h-full">
                {/* ReactQuill Editor */}
                <ReactQuill
                  value={description}
                  modules={modules}
                  formats={formats}
                  onChange={(content) => {
                    setDescription(content);
                    setValue("description", content); // Update form value
                  }}
                  placeholder="Write something..."
                  className="h-[300px]"
                />

                {/* Hidden Input for React Hook Form */}
                <input
                  type="hidden"
                  {...register("description")}
                  value={description}
                />
              </div>
            </div>

            {/* Package Status */}
            <div className="grid grid-cols-6 gap-3 mb-44 mt-32">
              <LabelArea label="Status" />
              <div className="col-span-8 sm:col-span-4">
                <select
                  name="status"
                  {...register("status", { required: "Status is required!" })}
                >
                  <option selected value="Active">
                    Active
                  </option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <DrawerButton title="Add Package" isSubmitting={isSubmitting} />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default PackagesDrawer;
