// // SuccessPopup.tsx
// 'use client';
// import {useEffect, useState} from "react";
//
// export default function SuccessPopup({message, onClose}: { message: string, onClose: () => void }) {
//     const [show, setShow] = useState(true);
//
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setShow(false);
//             onClose();
//         }, 10000); // auto-close in 2s
//         return () => clearTimeout(timer);
//     }, [onClose]);
//
//     if (!show) return null;
//
//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative flex items-center justify-center">
//                 <div className="absolute w-24 h-24 bg-[#048998] rounded-full animate-ping opacity-50"></div>
//                 <div className="absolute w-16 h-16 bg-[#048998] rounded-full animate-pulse">Reppled</div>
//             </div>
//         </div>
//     );
// }

'use client';
import {useEffect, useState} from "react";

export default function SuccessPopup({message, onClose}: { message: string, onClose: () => void }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose();
        }, 3000); // auto-close in 2s
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!show) return null;

    return (
        <div className="fixed bottom-6 right-6 bg-[#048998] text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            {message}
        </div>
    );
}

