// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
// import './App.css';

// function App() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(data => {
//         setUsers(data);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//         setIsLoading(false);
//       });
//   }, []);

//   const createUser = userData => {
//     fetch('https://jsonplaceholder.typicode.com/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     })
//       .then(response => response.json())
//       .then(newUser => {
//         setUsers([...users, newUser]);
//       })
//       .catch(error => console.error('Error creating user:', error));
//   };

//   const updateUser = (userId, updatedData) => {
//     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedData)
//     })
//       .then(response => response.json())
//       .then(updatedUser => {
//         setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
//         setSelectedUser(null);
//       })
//       .catch(error => console.error('Error updating user:', error));
//   };

//   const deleteUser = userId => {
//     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
//       method: 'DELETE'
//     })
//       .then(response => response.json())
//       .then(() => {
//         setUsers(users.filter(user => user.id !== userId));
//       })
//       .catch(error => console.error('Error deleting user:', error));
//   };

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <h1>User CRUD Application</h1>

//         {/* Create User Form */}
//         <div className="create-user-form">
//           <h2>Create User</h2>
//           <form onSubmit={e => {
//             e.preventDefault();
//             const newUser = {
//               name: e.target.name.value,
//               email: e.target.email.value,
//               phone: e.target.phone.value
//             };
//             createUser(newUser);
//             e.target.reset();
//           }}>
//             <label>Name:</label>
//             <input type="text" name="name" />
//             <label>Email:</label>
//             <input type="email" name="email" />
//             <label>Phone:</label>
//             <input type="tel" name="phone" />
//             <button type="submit">Create</button>
//           </form>
//         </div>

//         {/* User List */}
//         {isLoading ? (
//           <div className="loading-spinner">Loading...</div>
//         ) : (
//           <table className="user-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone}</td>
//                   <td>
//                     <button className="action-button" onClick={() => setSelectedUser(user)}>Edit</button>
//                     <button className="action-button" onClick={() => deleteUser(user.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* Update User Form */}
//         {selectedUser && (
//           <div className="update-user-form">
//             <h2>Edit User</h2>
//             <form onSubmit={e => {
//               e.preventDefault();
//               const updatedData = {
//                 name: e.target.name.value,
//                 email: e.target.email.value,
//                 phone: e.target.phone.value
//               };
//               updateUser(selectedUser.id, updatedData);
//             }}>
//               <label>Name:</label>
//               <input type="text" name="name" defaultValue={selectedUser.name} />
//               <label>Email:</label>
//               <input type="email" name="email" defaultValue={selectedUser.email} />
//               <label>Phone:</label>
//               <input type="tel" name="phone" defaultValue={selectedUser.phone} />
//               <button type="submit">Update</button>
//             </form>
//           </div>
//         )}
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';

function SkeletonLoader() {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      });
  }, []);

  const createUser = userData => {
    setIsLoading(true); // Start loading
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(newUser => {
        setUsers([...users, newUser]);
        setIsLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error creating user:', error);
        setIsLoading(false); // Stop loading
      });
  };

  const updateUser = (userId, updatedData) => {
    setIsLoading(true); // Start loading
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
        setSelectedUser(null);
        setIsLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error updating user:', error);
        setIsLoading(false); // Stop loading
      });
  };

  const deleteUser = userId => {
    setIsLoading(true); // Start loading
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
        setIsLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        setIsLoading(false); // Stop loading
      });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1>User CRUD Application</h1>

        {/* Create User Form */}
        <div className="create-user-form">
          <h2>Create User</h2>
          <form onSubmit={e => {
            e.preventDefault();
            const newUser = {
              name: e.target.name.value,
              email: e.target.email.value,
              phone: e.target.phone.value
            };
            createUser(newUser);
            e.target.reset();
          }}>
            <label>Name:</label>
            <input type="text" name="name" />
            <label>Email:</label>
            <input type="email" name="email" />
            <label>Phone:</label>
            <input type="tel" name="phone" />
            <button type="submit">Create</button>
          </form>
        </div>

        {/* User List */}
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4"><SkeletonLoader /></td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className="action-button" onClick={() => setSelectedUser(user)}>Edit</button>
                    <button className="action-button" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Update User Form */}
        {selectedUser && (
          <div className="update-user-form">
            <h2>Edit User</h2>
            <form onSubmit={e => {
              e.preventDefault();
              const updatedData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value
              };
              updateUser(selectedUser.id, updatedData);
            }}>
              {isLoading ? <SkeletonLoader /> : (
                <>
                  <label>Name:</label>
                  <input type="text" name="name" defaultValue={selectedUser.name} />
                  <label>Email:</label>
                  <input type="email" name="email" defaultValue={selectedUser.email} />
                  <label>Phone:</label>
                  <input type="tel" name="phone" defaultValue={selectedUser.phone} />
                  <button type="submit">Update</button>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
