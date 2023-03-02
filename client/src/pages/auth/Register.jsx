import { useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    try {
      if (!name || !email || !password) {
        return toast.error("All fields are required!");
      }

      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters!");
      }

      const success = await axios.post("/register", { name, email, password });
      if (success) {
        setRedirect(true);
        return toast.success("Registration Successful. Now you can log in!");
      }
    } catch (error) {
      if (error) {
        return toast.error("Registration Failed! Please, try again later.");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-6 mt-8">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black font-semibold" to={"/login"}>
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
