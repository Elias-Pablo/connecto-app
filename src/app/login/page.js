export default function Login() {
  return (
    <>
      <h1 className="text-black">Login</h1>
      <div className="bg-slate-200 w-full h-screen flex justify-center items-center">
        <form className="bg-slate-200 flex flex-col w-2/3 h-5">
          <label htmlFor="email" className="text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <label htmlFor="password" className="text-black">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <button
            type="submit"
            className="text-black bg-blue-500 hover:bg-blue-700 rounded-md p-2"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
