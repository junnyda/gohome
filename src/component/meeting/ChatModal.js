// import { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import io from "socket.io-client";

// const socket = io("http://localhost:3001");

// function ChatModal({ show, handleClose, messages }) {
//   const [message, setMessage] = useState("");

//   const handleSendMessage = () => {
//     socket.emit("chat message", message);
//     setMessage("");
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>채팅</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {messages.map((msg, idx) => (
//           <p key={idx}>{msg}</p>
//         ))}
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <Button onClick={handleSendMessage}>전송</Button>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default ChatModal;
