import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../accountNav/AccountNav";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";

export default function PlacesForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [price, setPrice] = useState(50);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}: </h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    // console.log(placeData);

    try {
      if (
        !title ||
        !address ||
        !description ||
        !checkIn ||
        !maxGuests ||
        !price
      ) {
        return toast.error("All fields are required!");
      }

      if (addedPhotos.length === 0) {
        return toast.error("You must add photos of your place!");
      }

      if (id) {
        // Update Place
        await axios.put("/places", { id, ...placeData });
        setRedirect(true);
      } else {
        // Add New Place
        await axios.post("/places", placeData);
        setRedirect(true);
      }
    } catch (error) {
      if (error) {
        return toast.error(
          "Adding a New Place Failed! Please, try again later."
        );
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="">
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "The Title for your place should be short and catchy as in advertisements."
        )}
        <input
          type="text"
          placeholder="Title, for example: My lovely apt"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        {preInput("Address", "Add an Address to this place")}

        <input
          type="text"
          placeholder="Address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "More = Better!")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Describe this place.")}

        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {preInput("Perks", "Select all the perks of your place.")}
        <Perks selected={perks} onChange={setPerks} />

        {preInput("Extra Informations", "Place rules, etc...")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        ></textarea>

        {preInput(
          "Check In & Check Out Times",
          "Add check in & check out times. Remember to have some time window for cleaning the room between guests."
        )}

        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check In Time:</h3>
            <input
              type="text"
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check Out Time:</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Maximum number of Guests:</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="1"
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per Night:</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="US$ 50"
              required
            />
          </div>
        </div>
        <div>
          <button className="primary my-6">Save</button>
        </div>
      </form>
    </div>
  );
}
