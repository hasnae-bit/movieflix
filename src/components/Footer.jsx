const Footer = () => {
  return (
    <footer className="bg-black py-6 mt-10 border-t border-netflix-red">
      <div className="container mx-auto px-4 text-center">
        <p className="text-netflix-red font-bold text-lg tracking-wider">
          MovieManager &copy; {new Date().getFullYear()} - Inspiré par Netflix
        </p>
      </div>
    </footer>
  );
};

export default Footer;