
import React, { useState } from 'react'
import { StyledLogin } from '../../Components/Styled/LoginStyled'
import { UseSignUp } from '../../Hooks/UseSignup'

const SignUp = () => {

  const [ email , setemail] = useState("")
  const [password , setpassword ] = useState("")
  const [displayName , setDisplayName ] = useState("")
  const [profile , setProfile ] = useState(null);
  const [profileError , setProfileError] = useState(null);
  const { SignUp , error , isPending} = UseSignUp()

  const handleSubmit = (e) => {
    e.preventDefault();
    SignUp(email , password , displayName,profile);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    setProfile(null)

    let selected = e.target.files[0]

    if ( !selected) {
      setProfileError("Please Select a Image");
      return;
    }

    if ( !selected.type.includes('image')){
      setProfileError("Selected file must be a image")
      return;
    }

    if ( !selected.size > 5000000 ) {
      setProfileError("Selected file size must be less than 500ks")
      return;
    }

    setProfile(selected)
    setProfileError(null)
    
    console.log("Upload Completed");



  }
  
  
  return (
   <div className="contaienr">
     <div className="row" style={{marginTop:"6rem"}}>
       <div className="col-12">
         <StyledLogin>
           <div className="card border-0 w-75">
             <div className="card-body">
               <div className="card-title h5">Sign Up</div>

                  <form   onSubmit={handleSubmit} className='mt-4'>

                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="text"
                            className='form-control'
                            value={email}
                            onChange = {(e) => setemail(e.target.value)}
                            required
                          />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password"
                            className='form-control'
                            onChange={e => setpassword(e.target.value)}
                            required
                            />
                      </div>

                      
                      <div className="mb-3">
                        <label className="form-label">Display Name</label>
                        <input 
                            type="text"
                            className='form-control'
                            value={displayName}
                            onChange = { e => setDisplayName(e.target.value)}
                            required

                            
                          />
                      </div>
                      <div className="mb-3">
                        <label  className="form-label">Choose Profile Picture</label>
                        <input 
                              className="form-control" 
                              type="file"
                              onChange = { handleAdd }
                              id="formFile"/>
                      </div>

                  {profileError &&   <div className="alert alert-danger" role="alert">
                     {profileError}
                    </div>}

                    {error && <div className='alert alert-danger' role = "alert">
                      
                        {error}
                      
                      </div>}

                   {   !isPending &&  <button className="btn btn-outline-success">SignUp</button>}

                   {isPending && (
                          <button className="btn btn-outline-success" type="button" disabled>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...
                          </button>
                   )}
                  </form>


             </div>
           </div>
         </StyledLogin>  
       </div>
     </div>
   </div> 
  )
}

export default SignUp