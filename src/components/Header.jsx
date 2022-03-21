import { useSelector } from "react-redux";

const Header = () => {
  const userName = useSelector((state) => state.userReducer.name);
  const userPhoto = useSelector((state) => state.userReducer.photo);

  return (
    <div className="chat-header">
      <img className="chat-header__img" src={userPhoto} />
      <p className="chat-header__name">{userName}</p>
    </div>
  );
};

export default Header;
