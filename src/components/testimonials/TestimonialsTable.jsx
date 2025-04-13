import React from "react";
import {
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@windmill/react-ui";
import { FiTrash2 } from "react-icons/fi";
import Status from "@/components/table/Status";
import Swal from "sweetalert2";
import  Switch  from "react-switch";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifyError, notifySuccess } from "@/utils/toast";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const TestimonialsTable = ({ testimonials, isLoading }) => {
  const axiosPublic = useAxiosPublic();

  // Handle status toggle
    const handleToggle = async (id) => {
      try {
        const response = await axiosPublic.patch(`/testimonials/status/${id}`);
  
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
          const response = await axiosPublic.delete(`/testimonials/${id}`);

          if (response.status === 200) {
            notifySuccess("Testimonials deleted successfully!");
            window.location.reload(); // Reload full page after successful delete
          } else {
            notifyError("Failed to delete Testimonials.");
          }
        } catch (error) {
          notifyError("Error deleting Testimonials.");
          console.error("Error deleting testimonials:", error);
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableBody>
        {testimonials?.map((testimonial, i) => (
          <TableRow key={i}>
            <TableCell>
              <span className="font-semibold uppercase text-sm">{i + 1}</span>
            </TableCell>
            <TableCell>{testimonial?.name}</TableCell>
            <TableCell>{testimonial?.designation}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={BASE_URL + testimonial?.image}
                  alt={testimonial?.name}
                />
              </div>
            </TableCell>
          
            <TableCell>
              <Status status={testimonial?.status} />
            </TableCell>
            <TableCell>
              <Switch
                onChange={() => handleToggle(testimonial.id)}
                checked={testimonial.status === "Active"}
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
                onClick={() => handleDelete(testimonial?.id)} // Call handleDelete with SweetAlert2
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

export default TestimonialsTable;
