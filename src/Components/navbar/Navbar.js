import React from 'react'
import { Link } from 'react-router-dom'
import { UseAuthContext } from '../../Hooks/useAuthContext'
import { UselogOut } from '../../Hooks/UseLogout';


const Navbar = () => {
  const { user } = UseAuthContext();
  const { Logout ,  isPending} = UselogOut();
  const links = [
    {
      name : "Login",
      path : "/login"
    },
    {
      name : "SignUp",
      path : "/signup"
    }
  ]

  return (
  <nav className="navbar navbar-light bg-light">
  <div className="container">
    <a className="navbar-brand">KEEP</a>
      <div>
        {!user && links.map(l => (
          <React.Fragment key={l.name}>
            <Link to = {l.path}>
            <button className="btn btn-outline-success me-3" type="submit">{l.name}</button>
            </Link>
          </React.Fragment>
        ))}

       {user && 
       <>
         {!isPending && <button className='btn btn-outline-success' onClick={Logout}>Logout</button>}

         {isPending && (
            <button className="btn btn-outline-success" type="button"   disabled>
              <span className="spinner-grow spinner-grow-sm me-2 mr-2" role="status" aria-hidden="true"></span>
                  Loading...
             </button>
         )}
       </>
        }
        
      </div>

  </div>
</nav>
  )
}

export default Navbar