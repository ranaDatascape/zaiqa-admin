import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

//internal import
import { notifyError, notifySuccess } from "@/utils/toast";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import DrawerButton from "@/components/form/button/DrawerButton";
import useGetDatas from "@/hooks/useGetDatas";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { SidebarContext } from "@/context/SidebarContext";

const CategoryDrawer = () => {
  const [category, isLoading] = useGetDatas(
    "/category/parent",
    "parentCategory"
  );
  const { closeDrawer } = useContext(SidebarContext);
  const axiosPublic = useAxiosPublic();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // ✅ Correct File Change Handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // ✅ Validate image size (5MB = 5 * 1024 * 1024 bytes)
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

  // ✅ Upload Image Function
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

  // ✅ Submit Form
  const onSubmit = async (data) => {
    console.log(data);
    const uploadedImageUrl = await uploadImage();
    console.log(uploadedImageUrl);
    if (!uploadedImageUrl) return;

    const categoryData = {
      name: data.name,
      description: data.description,
      parentId: data?.parentId || 0,
      slug: data.name?.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"),
      image: uploadedImageUrl,
      image_thumb: uploadedImageUrl,
      status: data.status,
    };
    console.log(categoryData);

    try {
      const res = await axiosPublic.post("/category/add", categoryData);
      if (res.status === 200) {
        notifySuccess("Category created successfully.");
        reset();
        closeDrawer();
        setPreview(null);
        setFile(null);
        window.location.reload(); // ✅ Reload full page
      }
    } catch (error) {
      console.error("Banner creation failed:", error);
      setMessage("Banner creation failed.");
      notifyError("Banner creation failed.");
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
        <h1 className="text-4xl text-center mt-4">Add Category</h1>
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Name"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Category title"
                  name="name"
                  type="text"
                  placeholder={"Category Name"}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            {/* category section */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Parent Category"} />
              <div className="col-span-8 sm:col-span-4">
                {isLoading ? (
                  <p>Loading categories...</p>
                ) : (
                  <select
                    {...register("parentId")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a Category</option>
                    {category?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
              <LabelArea label={"Description"} />
              <div className="col-span-8 sm:col-span-4 h-96 mb-5">
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

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
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
              <LabelArea label={"Status"} />
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
          </div>

          <DrawerButton title="Category" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
