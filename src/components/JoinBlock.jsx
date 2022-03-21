import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomName } from "../nameGenerator";
import {
  joined,
  loaderOff,
  loaderOn,
  messagesLoad,
  photoLoad,
  userJoin,
  userLoad,
} from "../redux/actions";
import axios from "axios";
import socket from "../socket";

const JoinBlock = () => {
  const dispatch = useDispatch();

  const photo = useSelector((state) => {
    return state.photoReducer.photo;
  });

  useEffect(() => {
    dispatch(photoLoad());
  }, []);

  async function onEnter() {
    dispatch(loaderOn());
    const name = randomName();
    const userObj = {
      name,
      photo,
    };
    dispatch(userJoin(name, photo));
    socket.emit("USER:JOIN", userObj);
    const { data } = await axios.get("/room");
    dispatch(userLoad(data.users));
    dispatch(messagesLoad(data.messages));
    dispatch(loaderOff());
    dispatch(joined());
  }

  return (
    <div className="joinBlock">
      <h1 className="joinBlock__header">Добро пожаловать в чат-флудилку!</h1>
      <img className="joinBlock__logo" src="chat.png" />
      <button onClick={onEnter} className="joinBlock__button">
        Войти
      </button>
    </div>
  );
};

export default JoinBlock;
