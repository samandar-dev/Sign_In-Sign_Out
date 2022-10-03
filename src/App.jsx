
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import './App.scss';

function App() {
  const [user, setUser] = useState({})

  const handelCallbackResponse = (response) => {
    var userObjrct = jwtDecode(response.credential);
    setUser(userObjrct)
    document.getElementById("signInDiv").hidden = true
    console.log("Encoded JWT ID token", response.credential);
    console.log(userObjrct);
  }

  const hendelSignOut = (e) => {
    setUser({})
    document.getElementById("signInDiv").hidden = false
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: "383089138252-l0f0nsk5dgqu9l5jcg3a8drt81l369il.apps.googleusercontent.com",
      callback: handelCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"), { theme: "outline", size: "large" }
    )
    google.accounts.id.prompt()
  }, []);

  return (
    <div className="app">
      <div className="app__login">
        <div id="signInDiv">Sign Out</div>
        {user &&
          <div className='app__userbox'>
            <img src={user.picture} alt="" />
            <h3>{user.name}</h3>
          </div>
        }
        {
          Object.keys(user).length != 0 &&
          <button className='app__signOut' onClick={(e) => hendelSignOut(e)}>Sign Out</button>
        }
      </div>
    </div>
  );
}

export default App;
