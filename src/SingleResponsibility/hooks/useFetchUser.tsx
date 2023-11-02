import {useEffect,useState} from "react";

export const useFetchUser = () =>{
    const [users, setUsers] = useState([])
    useEffect(()=>{
        const userFetch = async () =>{
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                const userList = await response.json()
                setUsers(userList)
            }catch (e){
                console.error(e)

            }

        }
        userFetch().catch(null)
    },[])

    return {users}
}