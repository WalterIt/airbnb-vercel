import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../App";
import AccountNav from "../components/accountNav/AccountNav";
import BookingDates from "../components/pages/BookingDates";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
      //   console.log(bookings);
    });
  }, []);

  return (
    <div className="">
      <AccountNav />
      <div className="">
        {!bookings?.length && (
          <p className="font-semibold">You don't have booking yet.</p>
        )}
        {bookings?.length > 0 &&
          bookings.map((booking, i) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={i}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-2"
            >
              {booking.place.photos.length > 0 && (
                <div className="w-48">
                  <img
                    className="object-cover"
                    src={url + booking.place.photos[0]}
                    alt=""
                  />
                </div>
              )}
              <div className="py-3">
                <h2 className="text-xl mb-3">{booking.place.title} </h2>
                <BookingDates booking={booking} />
                <p className="flex gap-1 mt-2"></p>
                <p className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <b> Total Price: </b>{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(booking.price)}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
