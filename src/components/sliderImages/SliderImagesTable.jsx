import useAxiosPublic from '@/hooks/useAxiosPublic';
import { notifyError, notifySuccess } from '@/utils/toast';
import { Button, TableBody, TableCell, TableRow } from '@windmill/react-ui'
import React from 'react'
import { FiTrash2 } from 'react-icons/fi';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const SliderImagesTable = ({data , isLoading , refetch})=> {
    const axiosPublic = useAxiosPublic();
    if(isLoading){
        return <div>Loading...</div>
    }

    const handleDelete = async (id) => {
        try {
          const response = await axiosPublic.delete(`/slider-image/delete/${id}`);
          if (response.status === 200) {
            notifySuccess('Item deleted successfully.');
            refetch();
          } else {
            notifyError('Failed to delete item.');
          }
        } catch (error) {
          // notifyError('An error occurred while deleting the item.');
        }
      };
  return (
    <>
      {isLoading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : data?.length > 0 ? (
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>
                <span className="text-sm">{item.id}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.title}</span>
              </TableCell>
              <TableCell>
                <img
                  src={BASE_URL + item?.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-full"
                />
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.position}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.link}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.status}</span>
              </TableCell>
              <TableCell>
              <Button
                  layout="link"
                  size="icon"
                  aria-label="Delete"
                  onClick={() => handleDelete(item.id)} // Call handleDelete with SweetAlert2
                >
                  <FiTrash2 className="text-red-500 text-2xl" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <p className="text-center text-lg font-semibold">No data found!</p>
      ) }
    </>
  )
}

export default SliderImagesTable
