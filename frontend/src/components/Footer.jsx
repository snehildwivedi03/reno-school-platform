import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto text-center text-gray-500">
        <p className="flex items-center justify-center text-sm">
          Made with
          <FaHeart className="text-red-500 mx-1.5" />
          by Snehil
        </p>
      </div>
    </footer>
  );
};

export default Footer;
