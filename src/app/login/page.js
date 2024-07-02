export default function Login() {
  return (
    <>
      <div className="bg-neutral-900 w-full h-dvh flex justify-center items-center">
        <form className="bg-violet-500 flex flex-col w-2/3 h-auto p-10 rounded-2xl">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 rounded-md p-2"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
