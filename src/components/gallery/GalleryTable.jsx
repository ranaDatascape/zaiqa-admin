import React from "react";
import { TableCell, TableRow, TableBody, Button } from "@windmill/react-ui";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import Switch  from "react-switch";
import { notifyError, notifySuccess } from "@/utils/toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const GalleryTable = ({ galleries, isLoading }) => {
    const axiosPublic = useAxiosPublic();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Handle status toggle
  const handleToggle = async (id) => {
    try {
      const response = await axiosPublic.put(`/gallery/status/${id}`);

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
          const response = await axiosPublic.delete(`/gallery/delete/${id}`);
          if (response.status === 200) {
            notifySuccess("Image deleted successfully!");
            window.location.reload(); // Reload full page after successful delete
          } else {
            notifyError("Failed to delete banner.");
          }
        } catch (error) {
          notifyError("Error deleting banner.");
        }
      }
    });
  };

  return (
    <>
      <TableBody>
        {galleries?.map((gallery, i) => (
          <TableRow key={i}>
            <TableCell>
              <span className="font-semibold uppercase text-sm">
                {gallery?.id}
              </span>
            </TableCell>
            <TableCell>
              <span>{gallery?.title}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-lg object-cover"
                  src={BASE_URL + gallery?.image}
                  alt={gallery.title}
                />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-lg object-cover"
                  src={BASE_URL + gallery?.image}
                  alt={gallery.title}
                />
              </div>
            </TableCell>
            <TableCell>
              <span>{gallery?.status}</span>
            </TableCell>
            <TableCell>
            <Switch
                  onChange={() => handleToggle(gallery.id)}
                  checked={gallery.status === "Active"}
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
                  onClick={() => handleDelete(gallery?.id)} // Call handleDelete with SweetAlert2
                >
                  <FiTrash2 className="text-red-500 text-2xl" />
                </Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default GalleryTable;
