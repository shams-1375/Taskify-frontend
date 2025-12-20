import React, { useState, useEffect } from 'react'
import { LINK_CLASSES, SIDEBAR_CLASSES, menuItems } from '../assets/dummy'
import { Sparkles, Menu, X } from 'lucide-react'
import { NavLink } from "react-router-dom";


const Sidebar = ({ user, tasks }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const totalTasks = tasks?.length || 0
  const completedTasks = tasks?.filter((t) => t.completed).length || 0

  const username = user?.name || "User"
  const initial = username.charAt(0).toUpperCase()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [mobileOpen])

  const renderMenuItems = (isMobile = false) => (
    <ul className='space-y-2 mt-6'>
      {menuItems.map(({ text, path, icon }) => (
        <li key={text}>
          <NavLink to={path} className={({ isActive }) => [
            LINK_CLASSES.base,
            isActive ? LINK_CLASSES.active : LINK_CLASSES.inactive,
            isMobile ? "justify-start" : "justify-center", "lg:justify-start"
          ].join(" ")} onClick={() => setMobileOpen(false)}>
            <span className={LINK_CLASSES.icon}>
              {icon}
            </span>
            <span className={`${isMobile ? "block" : "hidden lg:block"} ml-2 ${LINK_CLASSES.text}`} > {text} </span>
          </NavLink>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <div className={SIDEBAR_CLASSES.desktop} >
        <div className='p-5  border-b border-cyan-100 md:block hidden'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 aspect-square rounded-full bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md'>
              {initial}
            </div>
            <div className='lg:block hidden'>
              <h2 className='text-lg font-bold  text-gray-800'>Hey, {username}</h2>
              <p className='text-sm text-cyan-500 font-medium flex items-center gap-1'>
                <Sparkles className='w-3 h-3' /> Let's crush some tasks!
              </p>
            </div>
          </div>
          {renderMenuItems()}
        </div>
      </div>
      {/* MOBILE MENU */}
      {!mobileOpen && (
        <button onClick={() => setMobileOpen(true)}
          className={SIDEBAR_CLASSES.mobileButton}>
          <Menu className='w-5 h-5' />
        </button>
      )}

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className='fixed inset-0 z-40'>
          <div className={SIDEBAR_CLASSES.mobileDrawerBackdrop} onClick={() => setMobileOpen(false)} />

          <div className={SIDEBAR_CLASSES.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className='flex justify-between items-center mb-4 border-b pb-2'>
              <h2 className='text-lg font-bold text-cyan-600'>Menu</h2>
              <button onClick={() => setMobileOpen(false)} className='text-gray-700 hover:text-cyan-600'>
                <X className='w-5 h-5' />
              </button>
            </div>

            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 aspect-square rounded-full bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md'>
                {initial}
              </div>

              <div>
                <h2 className='text-lg font-bold mt-8 text-gray-800'>Hey, {username}</h2>
                <p className='text-sm text-cyan-500 font-medium flex items-center gap-1'>
                  <Sparkles className='w-3 h-3' /> Let's crush some tasks!
                </p>
              </div>
            </div>
            {renderMenuItems(true)}
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
