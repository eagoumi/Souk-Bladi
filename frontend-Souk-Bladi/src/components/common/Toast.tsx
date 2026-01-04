import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onClose: (id: string) => void;
    duration?: number;
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
};

const bgColors = {
    success: 'bg-white border-green-100',
    error: 'bg-white border-red-100',
    info: 'bg-white border-blue-100'
};

export const Toast: React.FC<ToastProps> = ({ id, message, type, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center gap-3 p-4 pr-12 rounded-lg shadow-lg border ${bgColors[type]} pointer-events-auto relative min-w-[300px] max-w-sm overflow-hidden backdrop-blur-sm`}
        >
            <div className="flex-shrink-0">
                {icons[type]}
            </div>
            <p className="text-sm font-medium text-gray-800">{message}</p>
            <button
                onClick={() => onClose(id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
            >
                <X size={16} />
            </button>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-1 ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
            />
        </motion.div>
    );
};

export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // We render this into a portal to ensure it's always on top
    const portalRoot = document.getElementById('root') || document.body;

    return createPortal(
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {children}
            </AnimatePresence>
        </div>,
        portalRoot
    );
};
