import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../hooks/useAuth';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, ChevronDownIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <nav className="sticky top-0 z-40 w-full glass border-b border-white/40 transition-all duration-500">
            <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
                <div className="flex items-center">
                    <div className="transform hover:scale-105 transition-all duration-300">
                        <Logo size="12rem" />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {user && (
                        <Menu as="div" className="relative ml-4">
                            <div>
                                <Menu.Button className="group flex items-center gap-3 rounded-2xl p-2 text-base outline-none transition-all duration-300 hover:bg-white/40">
                                    <span className="sr-only">Open user menu</span>
                                    {user.role === 'admin' ? (
                                        <ShieldCheckIcon className="h-9 w-9 text-accent transition-all duration-300 bg-accent/10 p-1.5 rounded-xl" />
                                    ) : (
                                        <UserCircleIcon className="h-9 w-9 text-slate-500 transition-all duration-300 bg-slate-100 p-1.5 rounded-xl dark:bg-slate-800" />
                                    )}
                                    <span className="hidden sm:block font-heading font-bold text-slate-900 dark:text-white">{user.name}</span>
                                    <ChevronDownIcon className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:rotate-180" />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-300"
                                enterFrom="transform opacity-0 scale-95 translate-y-2"
                                enterTo="transform opacity-100 scale-100 translate-y-0"
                                leave="transition ease-in duration-200"
                                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                                leaveTo="transform opacity-0 scale-95 translate-y-2"
                            >
                                <Menu.Items className="absolute right-0 mt-4 w-56 origin-top-right rounded-3xl bg-white dark:bg-slate-900 py-3 shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden border border-slate-100 dark:border-slate-800">
                                    <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800/50 mb-2 bg-slate-50/50 dark:bg-slate-800/50">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{user.email}</p>
                                    </div>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-bold transition-all duration-200 ${active ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'text-slate-600 dark:text-slate-400'
                                                    }`}
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