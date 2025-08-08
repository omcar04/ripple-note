import React, {useState} from 'react';


function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div
            className="w-full bg-gradient-to-r from-white via-[#048998]/30 to-white border-b border-gray-200 shadow-sm">
            <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center w-full">
                <h1 className="text-2xl font-funnel text-[#048998] tracking-wide">
                    ripple<span className="text-2xl">ꕀ</span>note
                </h1>

                {/* Desktop buttons */}
                <div className="hidden md:flex gap-4 text-sm text-gray-700">
                    <button className="hover:font-bold">Workflow</button>
                    <button className="hover:font-bold">Settings</button>
                </div>

                {/* Mobile hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#048998]">
                        ☰
                    </button>
                </div>
            </nav>
            {menuOpen && (
                <div className="md:hidden flex flex-col px-6 py-2 bg-white shadow-sm border-t">
                    <button className="py-1 text-gray-700 hover:font-bold">Workflow</button>
                    <button className="py-1 text-gray-700 hover:font-bold">Settings</button>
                </div>
            )}
        </div>
    );
}

export default NavBar;