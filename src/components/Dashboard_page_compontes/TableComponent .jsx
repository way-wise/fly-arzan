import React from "react";

const TableComponent = () => {
  // Sample data for the table
  const bookings = [
    {
      name: "John Doe",
      checkIn: "3 Jan 2025",
      checkOut: "7 Jan 2025",
      status: "Checked In",
    },
    {
      name: "Jane Smith",
      checkIn: "4 Jan 2025",
      checkOut: "8 Jan 2025",
      status: "Pending",
    },
    {
      name: "Michael Brown",
      checkIn: "5 Jan 2025",
      checkOut: "9 Jan 2025",
      status: "Cancel",
    },
    {
      name: "John Doe",
      checkIn: "3 Jan 2025",
      checkOut: "7 Jan 2025",
      status: "Checked In",
    },
    {
      name: "Jane Smith",
      checkIn: "4 Jan 2025",
      checkOut: "8 Jan 2025",
      status: "Pending",
    },
  ];

  return (
    <div className="table-container">
      <h3 className="table-title">Recent Bookings</h3>
      <div className="main-Recent-Bookings-box">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Check in</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.checkIn}</td>
                <td>{booking.checkOut}</td>
                <td>
                  <span className={`status ${booking.status.toLowerCase().replace(" ", "-")}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <div className="action-icons">
                    <div className="icon-box edit-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.2047 10.6201L6.08318 10.4491L9.61678 6.91233L7.91561 5.21052L4.37128 8.75485L4.2047 10.6201ZM8.76121 4.36544L10.4618 6.06598L11.6903 4.83553L9.99039 3.13562L8.76121 4.36544ZM3.06261 11.7629C2.9301 11.6304 2.86385 11.4462 2.88025 11.2594L3.1194 8.62811C3.14591 8.33974 3.27337 8.06778 3.47907 7.86207L9.15555 2.18559C9.59851 1.74074 10.4018 1.76282 10.8693 2.22913L12.597 3.95681L12.5977 3.95744C13.0804 4.44079 13.0999 5.20935 12.6406 5.66998L6.96346 11.3471C6.75838 11.5522 6.48642 11.6796 6.19742 11.7061L3.56615 11.9453C3.54722 11.9465 3.52829 11.9472 3.50873 11.9472C3.34278 11.9472 3.18187 11.8815 3.06261 11.7629ZM12.9737 13.8394C12.9737 14.1865 12.6898 14.4704 12.3427 14.4704H3.50875C3.16233 14.4704 2.87775 14.1865 2.87775 13.8394C2.87775 13.493 3.16233 13.2084 3.50875 13.2084H12.3427C12.6898 13.2084 12.9737 13.493 12.9737 13.8394Z"
                          fill="#6FB057"
                        />
                      </svg>
                    </div>
                    <div className="icon-box delete-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M4.78747 13.61C4.44042 13.61 4.14343 13.4865 3.8965 13.2396C3.64915 12.9922 3.52547 12.695 3.52547 12.348V4.14495H2.89447V2.88295H6.04947V2.25195H9.83547V2.88295H12.9905V4.14495H12.3595V12.348C12.3595 12.695 12.236 12.9922 11.9891 13.2396C11.7417 13.4865 11.4445 13.61 11.0975 13.61H4.78747ZM11.0975 4.14495H4.78747V12.348H11.0975V4.14495ZM6.04947 11.086H7.31147V5.40695H6.04947V11.086ZM8.57347 11.086H9.83547V5.40695H8.57347V11.086Z"
                          fill="#FF0000"
                        />
                      </svg>
                    </div>
                    <div className="icon-box view-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_261_2575)">
                          <path
                            d="M15.6774 7.75421C15.5421 7.56914 12.3186 3.22266 8.20157 3.22266C4.08455 3.22266 0.860881 7.56914 0.725738 7.75404C0.597605 7.92961 0.597605 8.16775 0.725738 8.34332C0.860881 8.52839 4.08455 12.8749 8.20157 12.8749C12.3186 12.8749 15.5421 8.52836 15.6774 8.34347C15.8057 8.16792 15.8057 7.92961 15.6774 7.75421ZM8.20157 11.8764C5.16894 11.8764 2.54237 8.99153 1.76485 8.04843C2.54137 7.1045 5.16244 4.22116 8.20157 4.22116C11.234 4.22116 13.8604 7.1055 14.6383 8.04911C13.8618 8.99301 11.2407 11.8764 8.20157 11.8764Z"
                            fill="#50ADD8"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TableComponent;
