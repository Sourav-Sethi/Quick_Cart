import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name, email, password
      });
      if (data.success) {
        navigate('/');
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={e => e.stopPropagation()}
        className="relative flex flex-col gap-6 items-start p-8 py-10 w-[90vw] max-w-sm rounded-2xl shadow-2xl border border-gray-100 bg-white transition-all"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl font-bold transition"
          aria-label="Close"
        >
          &times;
        </button>
        <p className="text-3xl font-extrabold m-auto mb-2 text-primary">
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <label htmlFor="na" className="block mb-1 font-semibold text-gray-700">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type your name"
              className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-black transition"
              type="text"
              id="na"
              required
            />
          </div>
        )}
        <div className="w-full">
          <label htmlFor="em" className="block mb-1 font-semibold text-gray-700">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type your email"
            className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-black transition"
            type="email"
            id="em"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="pass" className="block mb-1 font-semibold text-gray-700">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type your password"
            className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-black transition"
            type="password"
            id="pass"
            required
          />
        </div>
        <div className="w-full text-center">
          {state === "register" ? (
            <span className="text-sm text-gray-700">
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary font-semibold cursor-pointer underline underline-offset-2"
              >
                Login here
              </span>
            </span>
          ) : (
            <span className="text-sm text-gray-700">
              New here?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary font-semibold cursor-pointer underline underline-offset-2"
              >
                Create an account
              </span>
            </span>
          )}
        </div>
        <button
          className="mt-2 bg-primary text-white font-bold text-lg w-full py-3 rounded-xl shadow-lg transition-all hover:bg-primary-dull active:scale-95 cursor-pointer"
          id="cr"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
