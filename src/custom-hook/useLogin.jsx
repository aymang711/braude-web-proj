import {useState} from 'react';
import {useAuthContext} from './useAuthContext'
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../components/apiUrl';

export const useLogin = () => {
    const [error,setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const [token,setToken] = useState('')
    const navigate =useNavigate();
  



    const login = async (email ,password,role) => {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}user/login/`,{
            method:'POST',
            headers: {"Content-Type": "application/json","role":role},
            body :JSON.stringify({email ,password})
        })
        const json = await response.json()
       

        if(!response.ok){
            setLoading(false);
            setError(json.error)
        }
        if(response.ok){
            dispatch({type:'LOGIN', payload :json})
            localStorage.setItem('user',JSON.stringify(json))
            setToken(json.token);
            
            if(role === 'PROFESSOR'){
                navigate('/students')

            }else{
                navigate('/welcomeStudent')

            }
            setLoading(false)

        }
    }
    return{login,isLoading,error}
}
