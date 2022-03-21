import { useSelector } from "react-redux";
const UserList = () => {
  const userList = useSelector((state) => state.usersListReducer.users);

  return (
    <div className="chat-userList">
      <p className="chat-userList__header">Онлайн: {userList.length}</p>
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
