import {useEffect,useState} from "react";
import {getUserServices, ResponseUser,User} from "../services/userServices.ts";


export const useFetchUser = () =>{
    const [users, setUsers] = useState<User[]>([])
    useEffect(()=>{
        const userFetch = async () =>{
            try{
                const response:ResponseUser = await getUserServices()
                const userList = response.data ?? []
                setUsers(userList)
            }catch (e){
                console.error(e)
            }

        }
        userFetch().catch(null)
    },[])

    return {users}
}