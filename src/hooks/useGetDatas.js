import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic'

const useGetDatas = (url, key) => {
    const axiosPublic = useAxiosPublic();
    const {data, isLoading} = useQuery({
        queryKey: [key],
        queryFn: async () =>{
            const res = await axiosPublic(url)
            return res.data
        }
    })
  return [data , isLoading]
}

export default useGetDatas
