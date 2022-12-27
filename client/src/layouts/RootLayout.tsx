import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
      <div className='rootLayout'>
          <header>
              <h1>Book Keeper</h1>
              {/* <NavLink to="/books">Home</NavLink> */}
          </header>

          <main>
              <Outlet />
          </main>

          <footer>
              <p>Book Keeper</p>
          </footer>
    </div>
  )
}
