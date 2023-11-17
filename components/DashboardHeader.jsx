function DashboardHeader({ currentPage }) {
  return (
    <div className="flex justify-between px-4 pt-4">
      <h2>{currentPage} Dashboard</h2>
      <h2>Welcome back, Person</h2>
    </div>
  );
}

export default DashboardHeader;
