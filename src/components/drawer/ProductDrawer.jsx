import ReactTagInput from "@pathofdev/react-tag-input";
import { Input, Textarea } from "@windmill/react-ui";
import React, { useContext, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import "react-responsive-modal/styles.css";
import { useTranslation } from "react-i18next";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//internal import
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputValue from "@/components/form/input/InputValue";
import useProductSubmit from "@/hooks/useProductSubmit";
import InputValueFive from "@/components/form/input/InputValueFive";
import useGetDatas from "@/hooks/useGetDatas";
import { notifyError, notifySuccess } from "@/utils/toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import DrawerButton from "../form/button/DrawerButton";
import { useForm } from "react-hook-form";
import { SidebarContext } from "@/context/SidebarContext";
import { image } from "@cloudinary/url-gen/qualifiers/source";
//internal import

const ProductDrawer = ({ id }) => {
  const { t } = useTranslation();

  const {
    tag,
    setTag,
    // register,
    // onSubmit,
    // errors,
    slug,
    // handleSubmit,
    tapValue,
    handleProductSlug,
    // isSubmitting,
  } = useProductSubmit(id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [category, isLoading] = useGetDatas("/category/parent", "category");
  const [subcategory] = useGetDatas("/category", "subCategory");
  const [menus] = useGetDatas("/menus", "menus");
  const { closeDrawer } = useContext(SidebarContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");

  const axiosPublic = useAxiosPublic();

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

//   // ✅ Upload Multiple Images Function
// const uploadImages = async (files) => {
//   if (!files || files.length === 0) {
//     setMessage("Please select images.");
//     return null;
//   }

//   const formData = new FormData();
//   Array.from(files).forEach((file) => formData.append("images", file)); // Append multiple files

//   try {
//     const res = await axiosPublic.post(`/images/upload`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
    
//     return res.data.imageUrls; // Expecting an array of URLs from backend
//   } catch (error) {
//     console.error("Image upload failed:", error);
//     setMessage("Image upload failed.");
//     return null;
//   }
// };

const uploadImage = async () => {
  if (!file) {
    notifyError("Please select an image.");
    return null;
  }

  const formData = new FormData();
  formData.append("image", file); // Append single file

  try {
    const res = await axiosPublic.post(`/images/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.imageUrl; // Expecting a single URL from the backend
  } catch (error) {
    console.error("Image upload failed:", error);
    notifyError("Image upload failed.");
    return null;
  }
};



  const onSubmit = async (data) => {
    console.log(data);
    const imageUrl = await uploadImage();
    
    if (imageUrl) {
      data.image = imageUrl;
      const productData = {
        ...data,
        slug: data?.productName?.toLowerCase().split(" ").join("-"),
        image: imageUrl,
        tag: tag,
      };
      console.log(productData);
      const res = await axiosPublic.post("/products/add", productData);
      if (res.status === 200 || res.status === 201) {
        notifySuccess("Product Added Successfully");
        closeDrawer();
      }
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

  if (isLoading) {
    return (
      <div>
        <h1>Loading............</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl mt-5">Add Product</h1>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Category *")} />
                <div className="col-span-8 sm:col-span-4">
                  {isLoading ? (
                    <p>Loading categories...</p>
                  ) : (
                    <select
                      {...register("categories", {
                        required: "Category is required!",
                      })}
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

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Sub Category")} />
                <div className="col-span-8 sm:col-span-4">
                  {isLoading ? (
                    <p>Loading categories...</p>
                  ) : (
                    <select
                      {...register("subCategory", {
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a Sub Category</option>
                      {subcategory?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Menus")} />
                <div className="col-span-8 sm:col-span-4">
                  {isLoading ? (
                    <p>Loading menus...</p>
                  ) : (
                    <select
                      {...register("menuId", {
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a menus</option>
                      {menus?.map((menu) => (
                        <option key={menu?.id} value={menu?.id}>
                          {menu?.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Product Name *")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`productName`, {
                      required: "Product name is required!",
                    })}
                    name="productName"
                    type="text"
                    placeholder={t("ProductName")}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Product Code")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`productCode`, {
                    })}
                    name="productCode"
                    type="text"
                    placeholder={t("ProductCode")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductSKU")}
                    name="sku"
                    type="text"
                    placeholder={t("ProductSKU")}
                  />
                  <Error errorName={errors.sku} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductBarcode")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductBarcode")}
                    name="barcode"
                    type="text"
                    placeholder={t("ProductBarcode")}
                  />
                  <Error errorName={errors.barcode} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTitleName *")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title`, {
                      required: "TItle is required!",
                    })}
                    name="title"
                    type="text"
                    placeholder={t("ProductTitleName")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage *")} />
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
                <LabelArea label={t("ProductTag")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("ProductTagPlaseholder")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Purchase Price *" />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    register={register}
                    maxValue={2000}
                    minValue={1}
                    label="Purchase Price"
                    name="purchasePrice"
                    type="number"
                    placeholder="OriginalPrice"
                    defaultValue={0.0}
                    required={true}
                  />
                  <Error errorName={errors.originalPrice} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Sale Price *")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    register={register}
                    minValue={0}
                    defaultValue={0.0}
                    required={true}
                    label="salesPrice"
                    name="salesPrice"
                    type="number"
                    placeholder="Sale price"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={t("Product Quantity *")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    required={true}
                    register={register}
                    minValue={0}
                    defaultValue={0}
                    label="Quantity"
                    name="productQuantity"
                    type="number"
                    placeholder={t("ProductQuantity")}
                  />
                  <Error errorName={errors.stock} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-20">
                <LabelArea label={t("ProductDescription")} />
                <div className="col-span-8 sm:col-span-4">
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

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-16 mt-10">
                <LabelArea label={t("Return Policy")} />
                <div className="col-span-8 sm:col-span-4">
                  {/* ReactQuill Editor */}
                  <ReactQuill
                    value={returnPolicy}
                    modules={modules}
                    formats={formats}
                    onChange={(content) => {
                      setReturnPolicy(content);
                      setValue("returnPolicy", content); // Update form value
                    }}
                    placeholder="Write something..."
                    className="h-[300px]"
                  />

                  {/* Hidden Input for React Hook Form */}
                  <input
                    type="hidden"
                    {...register("returnPolicy")}
                    value={returnPolicy}
                  />
                </div>
              </div>
            </div>
          )}
          <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
