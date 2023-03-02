import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/pages/AddressLink";
import BookingWidget from "../components/form/BookingWidget";
import PlaceGallery from "../components/pages/PlaceGallery";

export default function Place() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return;

  return (
    <div className="mt-8  bg-gray-100 -mx-8 px-8  py-8">
      <h1 className="text-3xl">{place.title} </h1>
      <AddressLink> {place.address} </AddressLink>
      <PlaceGallery place={place} />

      <div className="my-6 -mx-8 py-6 px-8 bg-white ">
        <h2 className="font-semibold text-2xl my-3 ">Description:</h2>
        <p className="">{place.description} </p>
      </div>
      <div className="grid gap-8 mt-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="">
          <div className="my-2 text-sm text-gray-700 leading-4">
            <h4 className="mb-1">
              <b>Extra Informations: </b>
            </h4>
            <p>{place.extraInfo} </p>
          </div>
          <p className="mt-6">
            <b>Check-in: </b> {place.checkIn}
          </p>
          <p>
            <b>Check-out: </b> {place.checkOut}
          </p>
          <p>
            <b>Max number of Guests: </b> {place.maxGuests}
          </p>
        </div>

        <BookingWidget place={place} />
      </div>
    </div>
  );
}
