import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { SidebarContext } from '@/context/SidebarContext';

const useGetDatas = (url, key) => {
  const axiosPublic = useAxiosPublic();
  const { isUpdate } = useContext(SidebarContext);

  const { data = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: [key, isUpdate],
    queryFn: async () => {
      const res = await axiosPublic(url);
      return res.data;
    },
  });

  return { data, isLoading, isError, error, refetch };
};

export default useGetDatas;

