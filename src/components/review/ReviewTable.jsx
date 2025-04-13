import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ReviewStatus from './ReviewStatus';

const ReviewTable = ({ reviewData, isLoading }) => {
    if (isLoading) {
        return <TableRow>
          <TableCell colSpan={7}>
            <div className="text-center">Loading...</div>
          </TableCell>
        </TableRow>;
      }
      console.log(reviewData);
  return (
    <>
      <TableBody>
        {reviewData?.map((review, i) => (
          <TableRow key={i}>
            <TableCell>
              <span className="text-sm">{i + 1}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{review?.user?.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{review?.product?.productName}</span>
            </TableCell>
            <TableCell>
              <teaxtarea className="text-sm font-medium">{review?.comment}</teaxtarea>
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{review?.status}</span>
            </TableCell>
            <TableCell>
              <ReviewStatus id={review?.id} review={review} />
            </TableCell>
            <TableCell>
              <div className="flex justify-center items-center space-x-4">
                <button className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  <FiEdit />
                </button>
                <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                  <FiTrash2 />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  )
}

export default ReviewTable
