import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import JoinBlock from "./components/JoinBlock";
import Spin from "./components/Spin";
import { newMessage, userLoad } from "./redux/actions";
import socket from "./socket";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("USER:JOINED", (name) => {
      dispatch(userLoad(name));
    });
    socket.on("ROOM:NEW_MESSAGE", (messages) => {
      const { userName, userPhoto, text, img } = messages;
      dispatch(newMessage(userName, userPhoto, text, img));
    });
  }, []);

  const loading = useSelector((state) => {
    return state.appReducer.loading;
  });

  const join = useSelector((state) => {
    return state.appReducer.join;
  });
  return <div>{loading ? <Spin /> : join ? <Chat /> : <JoinBlock />}</div>;
};

export default App;
