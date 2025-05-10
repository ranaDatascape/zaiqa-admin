import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifyError, notifySuccess } from "@/utils/toast";
import { Button, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const DailyDealsTable = ({ dailyDealsData, isLoading, refetchData }) => {
  const convertToBangladeshTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
  };

  const axiosPublic = useAxiosPublic();

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
          const response = await axiosPublic.delete(`daily-deals/delete/${id}`);
          if (response.status === 200) {
            notifySuccess("DailyDeals deleted successfully!");
            refetchData();// Reload full page after successful delete
          } else {
            notifyError("Failed to delete.");
          }
        } catch (error) {
          notifyError("Error deleting.");
          console.error("Error deleting :", error);
        }
      }
    });
  };



  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <TableBody>
      {dailyDealsData?.map((deal, i) => (
        <TableRow key={i + 1}>
          <TableCell>
            <span className="text-sm">{i + 1}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{deal?.product.productName}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{deal.price}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{deal.quantity}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">
              {convertToBangladeshTime(deal.startTime)}
            </span>
          </TableCell>
          <TableCell>
            <span className="text-sm">
              {convertToBangladeshTime(deal.endTime)}
            </span>
          </TableCell>
          <TableCell>
            <div className="flex justify-center items-center space-x-4">
              {/* <button className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                <FiEdit />
              </button> */}
              <Button
                onClick={() => handleDelete(deal.id)}
                className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                <FiTrash2 />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default DailyDealsTable;
