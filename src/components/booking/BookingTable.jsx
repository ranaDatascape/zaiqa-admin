import { Button, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import EditDeleteButton from "../table/EditDeleteButton";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { notifyError, notifySuccess } from "@/utils/toast";

const BookingTable = ({ BookingList = [], isLoading, refetch }) => {
  console.log("Booking List", BookingList);

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
          const response = await axiosPublic.delete(`/booking/delete/${id}`);
          if (response.status === 200) {
            notifySuccess("Booking deleted successfully!");
            refetch();// Reload full page after successful delete
          } else {
            notifyError("Failed to delete booking.");
          }
        } catch (error) {
          notifyError("Error deleting booking.");
          console.error("Error deleting booking:", error);
        }
      }
    });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!BookingList.length) {
    return <h1>No Bookings Found</h1>;
  }

  return (
    <TableBody>
      {BookingList.map((booking) => (
        <TableRow key={booking.id}>
          <TableCell className="font-semibold uppercase text-xs">
            {booking.id}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.date}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.personName}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.phoneNumber}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking?.email}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.city}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.place}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.eventType}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.peopleNum}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.address}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.description}
          </TableCell>

          <TableCell>
            <Button
              onClick={() => handleDelete(booking.id)}
              className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
              <FiTrash2 />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BookingTable;
