import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../../UserContext";

export default function BookingWidget({ place }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberGuests, setNumberGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  let numberNights = 0;

  if (checkIn && checkOut && user) {
    numberNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace(e) {
    e.preventDefault();
    const formData = {
      place: place._id,
      checkIn,
      checkOut,
      numberGuests,
      name,
      email,
      phone,
      price: numberNights * place.price,
    };

    try {
      if (!user) {
        setRedirectToLogin("/login");
        return toast.error("You must log in in order to make a reservation!");
      }

      if (!name || !phone) {
        return toast.error("All fields are required!");
      }
      if (phone.length < 6) {
        return toast.error(
          "Phone Number Invalid. Please, enter a valid number!"
        );
      }

      const response = await axios.post("/bookings", formData);
      const bookingId = response.data._id;
      // console.log(bookingId);
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      if (error) {
        return toast.error(
          "Booking Reservation Failed! Please, try again later."
        );
      }
    }
  }

  if (redirectToLogin) {
    return <Navigate to={redirectToLogin} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="">
      <div className="bg-white shadow p-4 rounded-2xl">
        <p className="text-xl text-center">
          <b>
            Price:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(place.price)}
          </b>{" "}
          per Night
        </p>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4 ">
              <label>
                <b> Check in: </b>
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l ">
              <label>
                <b>Check out: </b>
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="py-3 px-4 border-t ">
            <label>
              <b>Number of Guests: </b>
            </label>
            <input
              type="number"
              value={numberGuests}
              onChange={(e) => setNumberGuests(e.target.value)}
            />
          </div>
          {numberNights > 0 && (
            <div className="py-3 px-4 border-t ">
              <label>
                <b>Your Full Name: </b>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>
                <b>Your Email: </b>
              </label>
              <input
                type="text"
                // value={email}
                disabled
                placeholder={email}
                // onChange={(e) => setName(e.target.value)}
                required
              />

              <label>
                <b>Your Phone Number: </b>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-2">
          Book this Place
          {checkIn && checkOut && (
            <span className=""> - $ {numberNights * place.price}</span>
          )}
        </button>
      </div>
    </div>
  );
}
