import { Twitter, Linkedin, Github } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-black pt-12 dark:text-white drop-shadow-[0_10px_50px_rgba(255,255,255,0.2)] text-white py-12 px-6 md:px-12 lg:px-24 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-40">
            <img src="/icon.svg" alt="Logo" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Empowering developers with cutting-edge insights, community-driven
            tools, and a vibrant ecosystem built for the future of technology.
          </p>
          <p className="text-sm text-gray-500">
            © 2023 ByteStack. All rights reserved.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Discussions
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Premium Access
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Bookmarks
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center mt-12 pt-8 border-t border-gray-800">
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Help Center
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
