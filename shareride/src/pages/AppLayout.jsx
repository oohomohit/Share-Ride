import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
// import Footer from "../components/Footer";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const sidebarRef = useRef(null);

  // Function to toggle sidebar visibility
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // Detect click outside sidebar to close it
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
  //       setIsSidebarOpen(false);
  //     }
  //   };

  //   // Attach the event listener for clicks
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // Cleanup event listener on component unmount
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [sidebarRef]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="w-full">
        <Header toggleSidebar={setIsSidebarOpen} />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64"
            // ref={sidebarRef}
          >
            <Sidebar
              // toggleSidebar={setIsSidebarOpen}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      {/* <Footer className="p-4 bg-gray-200 text-center" /> */}
    </div>
  );
};

export default AppLayout;
