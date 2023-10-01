import ProfileFooter from "./ProfileFooter";

const OnlyFooterLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-4xl">
      <div className="flex-grow">
        <main>{children}</main>
      </div>
      <ProfileFooter />
    </div>
  );
};

export default OnlyFooterLayout;
