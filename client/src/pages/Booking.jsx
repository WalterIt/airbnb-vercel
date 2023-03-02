import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/pages/AddressLink";
import BookingDates from "../components/pages/BookingDates";
import PlaceGallery from "../components/pages/PlaceGallery";

export default function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        setBooking(foundBooking);
      });
    }
  }, [id]);

  if (!booking) return;

  return (
    <div className="my-8">
      <h1 className="text-3xl mb-3">{booking.place.title} </h1>
      <AddressLink>{booking.place.address} </AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">
            Your Booking Information:
          </h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <p className="font-bold">Total Price: </p>{" "}
          <p className="text-3xl">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(booking.price)}
          </p>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
