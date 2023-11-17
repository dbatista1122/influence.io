const TopCard = ({ colSpanSize, value, trackedDataName, positiveOrNegative, percentageChange }) => {
  const cardStyle = `lg:col-span-${colSpanSize} col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg`;

  return (
    <div className={cardStyle}>
      {/* TODO: Dummy data, need to update to real data. All data should calculated outside and
      passed in. */}
      <div className="flex flex-col w-full pb-4 ">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-gray-600">{trackedDataName}</p>
      </div>
      {/* // Change type can either be positive or negative */}
      <p
        className={
          positiveOrNegative === "positive"
            ? "bg-green-200 flex justify-center items-center p-2 rounded-lg"
            : "bg-red-200 flex justify-center items-center p-2 rounded-lg"
        }
      >
        <span
          className={
            positiveOrNegative === "positive" ? "text-green-700 text-lg" : "text-red-700 text-lg"
          }
        >
          {percentageChange}%
        </span>
      </p>
    </div>
  );
};

export default TopCard;
