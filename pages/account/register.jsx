import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaGoogle, FaFacebookF, FaTwitter, FaRegEnvelope, FaUserCircle } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex bg-white rounded-2xl shadow-2xl w-2/3 max-w-4xl overflow-hidden">
          <SignIn />
          <SignUp />
        </div>
      </main>
    </div>
  );
}

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleSubmit(evnt) {
    evnt.preventDefault();

    console.log(
      `First Name: ${firstName} Last Name: ${lastName} Email Address: ${emailAddress} Password: ${password}`
    );

    router.push("/");
  }

  return (
    <div className="w-3/5 p-5 ">
      <Link href={"/"}>
        <div className="text-right font-bold">
          <span className="text-purple-500">Influence</span>
          <span>.io</span>
        </div>
      </Link>

      <div className="py-10">
        <h2 className="text-3xl font-bold text-purple-500">Sign up for an account</h2>

        <div className="border-2 w-10 border-purple-500 inline-block mb-2"></div>

        <SocialMediaLogin />

        <p className="text-gray-500 my-3">Or use your email address</p>

        <AccountInput
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={emailAddress}
          setEmailAddress={setEmailAddress}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

function SocialMediaLogin() {
  return (
    <div className="flex justify-center my-2">
      <Link href={"/"} className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200">
        <FaGoogle className="text-sm" />
      </Link>
      <Link href={"/"} className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200">
        <FaFacebookF className="text-sm" />
      </Link>
      <Link href={"/"} className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200">
        <FaTwitter className="text-sm" />
      </Link>
    </div>
  );
}

function AccountInput({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmailAddress,
  password,
  setPassword,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col items-center">
        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-full">
          <FaUserCircle className="text-gray-400 m-2" />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="bg-gray-100 outline-none text-sm flex-1"
            value={firstName}
            onChange={(evnt) => setFirstName(evnt.target.value)}
            required
          />
        </div>

        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-full">
          <FaUserCircle className="text-gray-400 m-2" />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="bg-gray-100 outline-none text-sm flex-1"
            value={lastName}
            onChange={(evnt) => setLastName(evnt.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col items-center mb-5">
        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-full">
          <FaRegEnvelope className="text-gray-400 m-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-gray-100 outline-none text-sm flex-1"
            value={email}
            onChange={(evnt) => setEmailAddress(evnt.target.value)}
            required
          />
        </div>

        <div className="bg-gray-100 w-64 p-2 flex items-center rounded-full">
          <MdLockOutline className="text-gray-400 m-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-gray-100 outline-none text-sm flex-1"
            value={password}
            onChange={(evnt) => setPassword(evnt.target.value)}
            required
          />
        </div>
      </div>

      <button className="border-2 border-purple-500 text-purple-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-purple-500 hover:text-white">
        Sign Up
      </button>
    </form>
  );
}

function SignIn() {
  return (
    <div className="w-2/5 bg-purple-500 text-white py-36 px-12">
      <h2 className="text-3xl font-bold mb-2">Welcome to Influence.io</h2>
      <div className="border-2 w-10 border-white inline-block mb-2"></div>
      <p className="mb-5">Already have an account?</p>
      <Link
        href={"/account/login"}
        className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-purple-500"
      >
        Sign In
      </Link>
    </div>
  );
}

export default Register;
