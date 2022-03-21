import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../socket";
const UserList = () => {
  let userList = useSelector((state) => state.usersListReducer.users);

  let length = userList
  
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
