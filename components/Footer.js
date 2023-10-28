const Footer = () => {
  return (
   <footer className="bg-gray-600 text-white py-8">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div className="mb-4 md:mb-0">
        <h3 className="text-2xl font-semibold">Influence.io</h3>
        <p className="text-sm">123 Example Street</p>
        <p className="text-sm">Gainesville, FL</p>
        <p className="text-sm">Email: info@company.com</p>
      </div>
      <p>&copy; {new Date().getFullYear().toString()} by Influence.io</p>
    </div>
</footer>

  );
};

export default Footer;
