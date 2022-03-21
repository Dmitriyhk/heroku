import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../socket";
const UserList = () => {
  let userList = useSelector((state) => state.usersListReducer.users);
  const [test, setTest] = useState([])
  useEffect(() => {
    socket.on("USER:JOINED", (name) => {
      setTest(name)
    });
  }, [])
  console.log('arr', test)
  console.log('userList', userList)
  
  console.log('userList >>>', userList)
  return (
    <div className="chat-userList">
      <p className="chat-userList__header">Онлайн: {userList && userList.length}</p>
      {userList && userList.map((user, index) => {
        return (
          <div key={user.name + index} className="userList-user">
            <img className="userList-user__photo" src={user.photo} />
            <span className="userList-user__name">{user.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
