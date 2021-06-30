import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin';
import { auth } from './firebase';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) { setFirebaseUser(user) }
      else { setFirebaseUser(user) }
    })
  }, [])


  return (
    <>
      <Router>

        <Navbar firebaseUser={firebaseUser} />

        <div >
          <Switch>
            <Route path="/" exact> <Home />       </Route>


            {!firebaseUser && <Route path="/login"><Login /></Route>}
            <Route path="/admin"><Admin /></Route>

          </Switch>
        </div>

      </Router>
      <Footer />
    </>
  );
}

export default App;
