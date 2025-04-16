import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import CategoryDrawer from "@/components/drawer/CategoryDrawer";
import Switch from "react-switch";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifyError, notifySuccess } from "@/utils/toast";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const CategoryTable = ({
  data,
  lang,
  refetch,
  isCheck,
  categories,
  useParamId,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { showingTranslateValue } = useUtilsFunction();
  const  axiosPublic = useAxiosPublic();


  const handleToggle = async (id) => {
    try {
      const response = await axiosPublic.put(`/category/status/${id}`);
      if (response.status === 200) {
        notifySuccess("Status updated successfully!");
        refetch(); // Refetch data after successful update
      } else {
        notifyError("Failed to update status.");
      }
    } catch (error) {
      notifyError("Error updating status.");
    }
  };

  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal useParamId={useParamId} id={serviceId} title={title} />
      )}

      <MainDrawer>
        <CategoryDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category?.id}>
            <TableCell className="font-semibold uppercase text-xs">
              {category?.id}
            </TableCell>
            <TableCell>
              {category?.image ? (
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50 p-1"
                  src={BASE_URL + category?.image}
                  alt={category?.parent}
                />
              ) : (
                <Avatar
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  alt="product"
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                />
              )}
            </TableCell>

            <TableCell className="text-sm">{category?.name}</TableCell>
            <TableCell className="text-sm">
              {category?.description?.length > 50
                ? category.description.slice(0, 50) + "..."
                : category.description}
            </TableCell>

            <TableCell className="text-center">
              <Switch
                onChange={() => handleToggle(category?.id)}
                checked={category?.status === 1}
                onColor="#10B981" // Green for active
                offColor="#EF4444" // Red for inactive
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={category?.id}
                parent={category}
                isCheck={isCheck}
                children={category?.children}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(category?.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
