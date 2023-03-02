import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/form/Image";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, i) => (
          <Link key={i} to={"/place/" + place._id} className="">
            <div className="bg-gray-500 rounded-2xl mb-2 flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold ">{place.address} </h2>
            <h3 className="text-sm  text-gray-500"> {place.title} </h3>
            <div className="mt-1">
              <span className="font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(place.price)}
              </span>{" "}
              per Night
            </div>
          </Link>
        ))}
    </div>
  );
}
