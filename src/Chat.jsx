import Header from "./components/Header";
import Messages from "./components/Messages";
import SendingMessage from "./components/SendingMessage";
import UserList from "./components/UserList";

const Chat = () => {
  return (
    <div className="chat">
      <Header />
      <UserList />
      <Messages />
      <SendingMessage />
    </div>
  );
};

export default Chat;
