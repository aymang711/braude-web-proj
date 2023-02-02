import { useEffect } from 'react';
import {createContext,useReducer} from 'react';
export const AuthContext = createContext();
const initialState = {user:null}
export const authReducer =(state, action) =>{
    
  
 switch (action.type){
    case 'LOGIN':
        
        return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state ,user :null}
            default:
        return state
 }
}
export const AuthContextProvider =({children})=>{
    const [state,dispatch] = useReducer(authReducer,{
        user: JSON.parse(localStorage.getItem('user')) || null,
      }
    )

  
    useEffect(() =>{
       
        const user = JSON.parse(localStorage.getItem('user'))
        
        if(user){
          dispatch({type: 'LOGIN',payload: user})
        
        } else {
          dispatch({type: 'LOGOUT'});
        }
       
      
      },[initialState.user])
      
    
    
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}