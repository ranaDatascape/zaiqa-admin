import { Button, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import Switch from "react-switch";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifySuccess, notifyError } from "@/utils/toast";
import {  FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const BannerTable = ({ data, isLoading }) => {
  const axiosPublic = useAxiosPublic();

  // Handle status toggle
  const handleToggle = async (id) => {
    try {
      const response = await axiosPublic.put(`/banners/status/${id}`);

      if (response.status === 200) {
        notifySuccess("Status updated successfully!");
        window.location.reload(); 
      } else {
        notifyError("Failed to update status.");
      }
    } catch (error) {
      notifyError("Error updating status.");
      console.error("Error updating status:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/banners/${id}`);

          if (response.status === 200) {
            notifySuccess("Banner deleted successfully!");
            window.location.reload(); // Reload full page after successful delete
          } else {
            notifyError("Failed to delete banner.");
          }
        } catch (error) {
          notifyError("Error deleting banner.");
          console.error("Error deleting banner:", error);
        }
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : data?.length > 0 ? (
        <TableBody>
          {data?.map((banner) => (
            <TableRow key={banner.id}>
              <TableCell className="font-semibold uppercase text-xs">
                {banner.id}
              </TableCell>
              <TableCell className="font-medium text-sm">{banner.title}</TableCell>
              <TableCell className="font-medium text-sm">
                <img
                  src={BASE_URL + banner?.image}
                  alt={banner.title}
                  className="w-20 h-20 object-cover rounded-full"
                />
              </TableCell>
              <TableCell className="font-medium text-sm">
                <img
                  src={BASE_URL + banner.image_thumb}
                  alt={banner.title}
                  className="w-20 h-20 object-cover rounded-full"
                />
              </TableCell>
              <TableCell className="font-medium text-sm">
                {banner.status === 1 ? (
                  <span className="text-green-500 font-semibold">Active</span>
                ) : (
                  <span className="text-red-500 font-semibold">Inactive</span>
                )}
              </TableCell>
              <TableCell>
                <Switch
                  onChange={() => handleToggle(banner.id)}
                  checked={banner.status === 1}
                  onColor="#10B981" // Green for active
                  offColor="#EF4444" // Red for inactive
                  uncheckedIcon={false}
                  checkedIcon={false}
                />
              </TableCell>
              <TableCell>
                <Button
                  layout="link"
                  size="icon"
                  aria-label="Delete"
                  onClick={() => handleDelete(banner.id)} // Call handleDelete with SweetAlert2
                >
                  <FiTrash2 className="text-red-500 text-2xl" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <p className="text-center text-lg font-semibold text-red-500">
          No banners available.
        </p>
      )}
    </>
  );
};

export default BannerTable;
