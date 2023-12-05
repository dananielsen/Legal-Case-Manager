// side navigation bar with buttons: Dashboard, Calendar, Cases, Tasks, Contacts, Documents, Communications, Reports, Settings
// each button has a different color and icon

import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen">
    <div className="bg-gray-800 py-6 px-4 flex flex-col justify-start items-center flex-shrink-0">
        <SidebarButton text="Dashboard" icon="dashboard" color="bg-blue-500" />
        <SidebarButton text="Calendar" icon="calendar" color="bg-green-500" />
        <SidebarButton text="Cases" icon="case" color="bg-yellow-500" />
        <SidebarButton text="Tasks" icon="tasks" color="bg-red-500" />
        <SidebarButton text="Contacts" icon="contacts" color="bg-indigo-500" />
        <SidebarButton text="Documents" icon="documents" color="bg-purple-500" />
        <SidebarButton text="Communications" icon="communications" color="bg-pink-500" />
        <SidebarButton text="Reports" icon="reports" color="bg-gray-500" />
      </div>
      <div className="flex-grow">
        <SidebarButton text="Settings" icon="settings" color="bg-white text-black" />
      </div>
    </div>
  );
};

const SidebarButton = ({ text, icon, color }) => {
  return (
    <button className={`flex items-center justify-start text-white rounded py-2 px-4 ${color}`}>
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default Sidebar;
