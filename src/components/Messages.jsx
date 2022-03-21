import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Messages = () => {
  const messagesRef = useRef(null);
  const [modalImage, setModalImage] = useState("");
  const userName = useSelector((state) => state.userReducer.name);
  const userPhoto = useSelector((state) => state.userReducer.photo);
  const messageList = useSelector((state) => state.messagesReducer.messages);
  useEffect(() => {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }, [messageList]);
  const imageHandler = (e) => {
    setModalImage(e.target.src);
  };

  const modalBlockHandler = (e) => {
    setModalImage("");
  };

  return (
    <>
      {modalImage && (
        <div onClick={modalBlockHandler} className="modalImage">
          <img className="modalImage-img" src={modalImage} />
        </div>
      )}
      <div ref={messagesRef} className="chat-messages">
        <div className="messages">
          {messageList && messageList.map((message, index) => (
            <div
              key={message.userName + index}
              className={
                message.userName === userName && message.userPhoto === userPhoto
                  ? "my-message"
                  : "message"
              }
            >
              <div className="message-user">
                <img className="message-user__photo" src={message.userPhoto} />
                <p className="message-user__name">{message.userName}</p>
              </div>
              <div className="message-content">
                <p className="message-content__text">{message.text}</p>
                {message.img && (
                  <img
                    onClick={imageHandler}
                    className="message-content__img"
                    src={message.img}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Messages;
