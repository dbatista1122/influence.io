import { useState } from "react";
import { useRouter } from "next/router";
import RootLayout from "@/components/RootLayout";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const router = useRouter();

  const { data: session, update } = useSession();
  const user = session?.token;

  async function handleSubmit(evnt) {
    evnt.preventDefault();

    await fetch("/api/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        emailAddress,
        currentEmailAddress: user.email,
      }),
    });

    update();
    location.reload();
    
    router.push("/");
  }

  return (
    <RootLayout>
      <div className="flex flex-col content-center max-w-[80%] mx-auto py-10">
          {session && user && (
          <Image
            className="mx-auto rounded-full border border-gray-600"
            loader={({ src }) => src}
            src={user.picture || "/static/DefaultPfp.png"}
            width={200}
            height={200}
            alt="Profile Picture"
            unoptimized
            priority={true}
            style={{
              objectFit: "cover",
            }}
          />
        )}
        <div className="flex flex-col mx-auto pt-2">
          <h3 className="text-3xl md:text-4xl font-bold p-2">
            {user ? `${user.name}` : "Loading..."}
          </h3>
        </div>
        <div className="content-start pt-20">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row items-center px-5 py-5">
              <label
                htmlFor="first_name"
                className="basis-1/4 mb-2 text-md font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className="basis-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder= {user ? `${user.name.split(" ")[0]}` : "First Name"}
                value={firstName}
                onChange={(evnt) => setFirstName(evnt.target.value)}
                required
              />
            </div>
            <div className="flex flex-row items-center px-5 py-5">
              <label
                htmlFor="last_name"
                className="basis-1/4 mb-2 text-md font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="basis-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder= {user ? `${user.name.split(" ")[1]}` : "Last Name"}
                value={lastName}
                onChange={(evnt) => setLastName(evnt.target.value)}
                required
              />
            </div>
            <div className="flex flex-row items-center px-5 py-5">
              <label
                htmlFor="email"
                className="basis-1/4 mb-2 text-md font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="basis-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder= {user ? `${user.email}` : "Email Address"}
                value={emailAddress}
                onChange={(evnt) => setEmailAddress(evnt.target.value)}
                required
              />
            </div>
            <div className="flex justify-end p-10">
              <button
                type="submit"
                className="text-white hover:bg-gray-1000 focus:ring-10 focus:outline-none focus:bg-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile;
