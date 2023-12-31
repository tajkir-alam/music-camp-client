import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loader } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loader,
        queryFn: async () => {
            if (user) {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`)
                return res.data.role
            }
        }
    })
    return [isAdmin, isAdminLoading];
}

export default useAdmin;