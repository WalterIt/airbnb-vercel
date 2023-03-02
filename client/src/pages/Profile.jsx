import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/accountNav/AccountNav";
import Places from "./Places";
import { UserContext } from "../UserContext";

export default function Profile() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  //   console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-sm mx-auto">
          Logged in as{" "}
          <b>
            {user.name} - {user.email}
          </b>
          <br />
          <button onClick={logout} className="primary max-w-sm mt-3">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <Places />}
    </div>
  );
}
