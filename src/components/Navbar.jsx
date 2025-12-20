import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ClipboardCheck, LogOut, Settings } from 'lucide-react';

const Navbar = ({ onLogout, user = {} }) => {

    const menuref = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuref.current && !menuref.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    },[])

    const handleMenuToggle = () => setMenuOpen((prev) => !prev)

    const handleLogOut = () => {
        setMenuOpen(false)
        onLogout()
    }

    return (
        <header className=' sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 font-sans'>
            <div className='flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto'>
                <div className='flex items-center gap-2 cursor-pointer group'
                    onClick={() => navigate('/')}>
                    <div className='relative w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br from-teal-500 via-cyan-500 to-blue-600 shadow-md group-hover:shadow-blue-400/40 group-hover:scale-105 transition-all duration-300 '>
                        <ClipboardCheck className='h-6 w-6 text-white' />
                    </div>
                    <span className='text-2xl font-black bg-linear-to-r from-teal-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent tracking-wide'>
                        TASKIFY
                    </span>
                </div>
                <div className='flex items-center gap-4'>
                    <button className='p-2 text-gray-600 hover:text-cyan-500 transitions-colors duration-300 hover:bg-cyan-50 rounded-full' onClick={() => navigate('/profile')}>
                        <Settings className='w-5 h-5 ' />
                    </button>
                    <div ref={menuref} className="relative">
                        <button
                            onClick={handleMenuToggle}
                            className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-cyan-50 transition-colors duration-300 border border-transparent hover:border-cyan-200"
                        >
                            <div className="relative">
                                {(
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-linear-to-br from-teal-500 to-cyan-600 text-white font-semibold shadow-md">
                                        {user.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                )}
                                <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse' />
                            </div>
                            <div className='text-left hidden md:block'>
                                <p className='text-sm font-medium text-gray-800'>{user.name}</p>
                                <p className='text-xs font-normal text-gray-500'>{user.email}</p>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''} `} />
                        </button>
                        {menuOpen && (
                            <ul className='absolute top-14 right-0 bg-white rounded-2xl shadow-xl z-50 overflow-hidden animate-fadeIn border-cyan-100'>
                                <li className='p-2'>
                                    <button onClick={() => {
                                        setMenuOpen(false)
                                        navigate('/profile')
                                    }}
                                        className=' w-full px-4 py-2.5 text-left  hover:bg-purple-50 text-sm rounded-lg text-gray-700 transition-colors flex items-center gap-2 group' role='menuitem'>
                                        <Settings className=' w-4 h-4  text-gray-700' />
                                        Profile Setting
                                    </button>
                                </li>
                                <li className='p-2'>
                                    <button onClick={handleLogOut} className=' flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm  hover:bg-red-50  text-red-600'>
                                        <LogOut className=' w-4 h-4' />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Navbar
