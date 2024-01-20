import React from 'react'
import Home from './components/home';
import Get from './components/get';
import Update from './components/update';
import Entry from './components/entry';
import Delete from './components/delete';
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom';
function AnimatedRoutes() {
    const location = useLocation();
    return (
        <div>
            <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Entry />} />
                <Route path="/get" element={<Get />} />
                <Route path="/update" element={<Update />} />
                <Route path="/delete" element={<Delete />} />
            </Routes>
        </AnimatePresence>
        </div>
    )
}

export default AnimatedRoutes
