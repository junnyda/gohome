import React, { useState } from "react";
import Table from "react-bootstrap/Table";

function AttendanceList(props) {
  const [orders, setOrders] = useState(props.orders);

  function handleAttendance(orderIndex, attendeeIndex) {
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].attendance[attendeeIndex].check =
      !updatedOrders[orderIndex].attendance[attendeeIndex].check;
    setOrders(updatedOrders);
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {orders.map((order, orderIndex) => (
            <th key={orderIndex}>{order.no}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    // <div>
    //   {orders.map((order, orderIndex) => (
    //     <div key={order.no}>
    //       <h2>Order No. {order.order_num}</h2>
    //       <p>Date: {order.date}</p>
    //       <p>Location: {order.location}</p>
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>{order.order_num}</th>
    //             <th>Nick</th>
    //             <th>Check</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {order.attendance.map((attendee, attendeeIndex) => (
    //             <tr key={attendee.no}>
    //               <td>{attendee.no}</td>
    //               <td>{attendee.nick}</td>
    //               <td>
    //                 <button
    //                   onClick={() =>
    //                     handleAttendance(orderIndex, attendeeIndex)
    //                   }
    //                 >
    //                   {attendee.check ? "Checked" : "Check"}
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   ))}
    // </div>
  );
}

export default AttendanceList;
