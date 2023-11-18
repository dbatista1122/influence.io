import { FaVideo } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { dummyData } from "@/pages/dashboard/youtube";

const RecentVideos = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll shadow-md">
      <h1>Recent Videos</h1>

      <ul>
        {dummyData.map((video, index) => (
          <li
            key={video.id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer shadow-md"
          >
            <div className="bg-blue-100 rounded-lg p-3 shadow-sm">
              <FaVideo className="text-blue-500" />
            </div>

            <div className="pl-4">
              <p className="text-gray-800 font-bold w-72 truncate ..."> {video.title}</p>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">{video.totalViews}</span> views
              </p>
            </div>

            <div className="absolute right-10 text-sm text-gray-600 grid grid-row-3 lg:hidden xl:block ">
              <p>
                <span className="font-semibold">{video.totalComments}</span> comments
              </p>
              <p className="flex items-center">
                <span className="font-semibold">{video.totalLikes}</span>{" "}
                <AiOutlineLike size={18} />
              </p>
              <p className="flex items-center">
                <span className="font-semibold">{video.totalDislikes}</span>
                <AiOutlineDislike size={18} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentVideos;
