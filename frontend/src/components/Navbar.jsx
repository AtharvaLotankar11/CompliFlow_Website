import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../hooks/useAuth';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, ChevronDownIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/90">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <div className="transform hover:scale-105 transition-transform duration-200">
                        <Logo size="10rem" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {user && (
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="group flex items-center gap-2 rounded-full p-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 transition-all duration-200">
                                    <span className="sr-only">Open user menu</span>
                                    {/* Different icons for admin vs user - removed violet background */}
                                    {user.role === 'admin' ? (
                                        <ShieldCheckIcon className="h-8 w-8 text-indigo-600 hover:text-indigo-700 transition-colors duration-200" />
                                    ) : (
                                        <UserCircleIcon className="h-8 w-8 text-gray-600 hover:text-gray-700 transition-colors duration-200" />
                                    )}
                                    <span className="hidden sm:block font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">{user.name}</span>
                                    <ChevronDownIcon className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180" />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95 translate-y-1"
                                enterTo="transform opacity-100 scale-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                                leaveTo="transform opacity-0 scale-95 translate-y-1"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none backdrop-blur-sm">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={`${active ? 'bg-red-50 text-red-700 transform scale-105' : ''
                                                    } block w-full px-4 py-2 text-left text-sm text-gray-700 transition-all duration-150 hover:text-red-600`}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;