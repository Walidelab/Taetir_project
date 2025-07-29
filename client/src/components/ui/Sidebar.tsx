import React from "react";
import {
  LayoutDashboard,
  Search,
  Users,
  MessageCircle,
  Calendar,
  Star,
  User,
  Settings,
} from "lucide-react";
import { MENU_ITEMS } from "../utils/constants";
import { NavLink } from "react-router-dom";

const iconMap = {
  LayoutDashboard,
  Search,
  Users,
  MessageCircle,
  Calendar,
  Star,
  User,
  Settings,
};

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({
  activeSection,
  onSectionChange,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-10">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-8">
          TAETIR
        </h1>

        <nav className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            return (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <IconComponent size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

{
  MENU_ITEMS.map((item) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
    return (
      <NavLink
        key={item.id}
        to={`/${item.id}`}
        className={({ isActive }) =>
          `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
            isActive
              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`
        }
      >
        <IconComponent size={20} />
        <span className="font-medium">{item.label}</span>
      </NavLink>
    );
  });
}
