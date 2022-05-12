import { Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { StyledLogin } from '../../Components/Styled/LoginStyled'
import { useLogin} from "../../Hooks/UseLogin"


const Login = () => {
  const  [email , setemail ] = useState("")
  const [password , setpassword ] = useState("")
  const { login , error , isPending} = useLogin()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      login(email, password)
    }

  return (
 
      <div className="row" style={{marginTop : "10rem"}}>
        <div className="col-12">

      <StyledLogin>

         <div className="card  border-0 w-75 ">
           <div className="card-body w-100">
           <div className="card-title h5">LOGIN</div>

            <form  onSubmit={handleSubmit} className='mt-4'>

                <div className=" mb-3">
                  <label  className='form-label'>Email</label>
                  <input 
                      type="text" 
                      className='form-control'
                      value={email} 
                      onChange = { (e) => setemail(e.target.value)}
                  />
                </div>
              
              <div className='mb-3'>  
                 <label  className='form-label'>Password</label>
                  <input 
                      type="password" 
                      className="form-control"
                      value={password}
                      onChange = { (e) => setpassword(e.target.value) }
                   />
              </div>


                    {error && <div className='alert alert-danger' role = "alert">
                      
                        {error}
                      
                      </div>}

             {!isPending &&  <button className='btn btn-outline-success mt-3'>Login</button>}
             {isPending && (
                  <button className="btn btn-outline-success" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
             )}

            </form>
           </div>
         </div>

      </StyledLogin>
        </div>
      </div>
    
  )
}

export default Login