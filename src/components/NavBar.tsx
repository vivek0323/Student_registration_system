
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, BookText, GraduationCap, Home, Users } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Course Types", path: "/course-types", icon: BookText },
    { name: "Courses", path: "/courses", icon: BookOpen },
    { name: "Offerings", path: "/offerings", icon: GraduationCap },
    { name: "Registrations", path: "/registrations", icon: Users },
  ];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Student Registration System</h1>
          </div>
          <div className="hidden md:flex">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100",
                      location.pathname === item.path
                        ? "bg-gray-100 text-primary"
                        : "text-gray-600"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t">
        <div className="grid grid-cols-5 text-xs">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-gray-600"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
