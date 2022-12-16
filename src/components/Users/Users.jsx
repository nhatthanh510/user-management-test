import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import localForage from "localforage";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    // Init storage with default user
    const defaultUser = "defaultUser";
    localForage.keys().then((keys) => {
      if (!keys.includes(defaultUser)) {
        localForage.setItem(defaultUser, []);
      }
    });
  }, []);

  useEffect(() => {
    localForage.keys().then((keys) => {
      setUsers(keys);
    });
  }, []);

  const navigate = useNavigate();
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const username = e.target.value;
      const isExist = users.includes(username);

      if (!isExist) {
        await localForage.setItem(username, []);
        setUsers([username, ...users]);
        navigate(`/users/${username}`);
      } else {
        alert("This username is already existed");
      }
    }
  };

  const clearStorage = async () => {
    await localForage.clear();
    setUsers([]);
    navigate("/");
  };

  const renderUsers = () => {
    if (!users) return null;
    return (
      <ul>
        {users.map((user) => (
          <li
            key={user}
            className={`mt-2 hover:text-green-500 ${
              user === username ? "text-green-500" : ""
            }`}
          >
            <Link to={`/users/${user}`}>{user.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="w-1/4 border-r p-2 border-gray-700">
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="w-full border border-gray-400 bg-transparent rounded-sm py-2 px-3 text-sm text-black font-normal outline-none focus:border-gray-800"
      />
      {renderUsers()}

      <button
        type="button"
        className="mt-5 py-2 px-6 text-sm rounded-sm bg-red-600 hover:bg-red-600 text-white"
        onClick={clearStorage}
      >
        Clear Storage
      </button>
    </div>
  );
};

export default Users;
