import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifyError, notifySuccess } from "@/utils/toast";
import { Select } from "@windmill/react-ui";
import React from "react";

const ReviewStatus = ({ id, review }) => {
    const axiosPublic = useAxiosPublic();
  const handleChangeStatus = async (id , status) => {
    try {
        const res = await axiosPublic.put(`/review/status/${id}`, { status });
        console.log(res.status)
        if(res?.status === 200){
            notifySuccess(res?.data?.message);
            window.location.reload();
        }
    } catch (error) {
        notifyError(error.message)
    }
  };
  return (
    <>
      <Select  onChange={(e) => handleChangeStatus(id, e.target.value)} className="h-8" >
        <option value="status" defaultValue hidden>
          {review?.status}
        </option>
        <option defaultValue={review?.status === "Approved"} value="Approved">
        Approved
        </option>
        <option defaultValue={review?.status === "Pending"} value="Pending">
          Pending
        </option>
        <option  defaultValue={review?.status === "Rejected"}  value="Rejected">
          Rejected
        </option>
      </Select>
    </>
  );
};

export default ReviewStatus;
