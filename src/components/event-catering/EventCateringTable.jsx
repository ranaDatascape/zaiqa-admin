import React from 'react';
import { TableCell, TableBody, TableRow, Badge } from '@windmill/react-ui';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import MainModal from '@/components/modal/MainModal';
import { useState } from 'react';
import DeleteModal from '@/components/modal/DeleteModal';
import useToggleDrawer from '@/hooks/useToggleDrawer';
import Swal from "sweetalert2";
import { showDateFormat, showTimeFormat } from '@/utils/dateFormat';
import { notifyError, notifySuccess } from '@/utils/toast';
import useAxiosPublic from '@/hooks/useAxiosPublic';


const   EventCateringTable = ({ eventsData, isLoading, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const axiosPublic = useAxiosPublic();

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
          const response = await axiosPublic.delete(`/events/delete/${id}`);

          if (response.status === 200) {
            notifySuccess("Event deleted successfully!");
            window.location.reload(); // Reload full page after successful delete
          } else {
            notifyError("Failed to delete event.");
          }
        } catch (error) {
          notifyError("Error deleting event.");
          console.error("Error deleting event:", error);
        }
      }
    });
  };

  return (
    <>
      <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        handleDelete={handleDelete}
      />

      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan="8" className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : (
          eventsData?.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <span className="font-semibold uppercase text-xs">{event.id}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{event.title}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{event.subtitle.length>20?event.subtitle.substr(0,23)+"...": event.subtitle}</span>
              </TableCell>
                {/* <TableCell>
                  <span className="text-sm">{event.description.length>20? event.description.substr(0,20)+"...":event.description }</span>
                </TableCell> */}
              <TableCell>
                <span className="text-sm">{showDateFormat(event.eventDate)}</span>
                <br />
                <span className="text-sm">{showTimeFormat(event.eventTime)}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{event.capacity} persons</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{event.price} ৳ </span>
              </TableCell>
              <TableCell>
                <Badge type={event.status === 1 ? 'success' : 'danger'}>
                  {event.status === 1 ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <div className="cursor-pointer text-gray-400 hover:text-green-600">
                    <FiEdit
                      onClick={() => handleUpdate(event.id)}
                      className="text-xl"
                    />
                  </div>
                  <div className="cursor-pointer text-gray-400 hover:text-red-600">
                    <FiTrash2
                      onClick={() => {
                        handleDelete(event.id)
                      }}
                      className="text-xl"
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </>
  );
};

export default EventCateringTable;