import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface MotionProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
}

export const FadeIn: React.FC<MotionProps> = ({ children, delay = 0, duration = 0.5, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const SlideUp: React.FC<MotionProps> = ({ children, delay = 0, duration = 0.5, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const SlideInLeft: React.FC<MotionProps> = ({ children, delay = 0, duration = 0.5, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const StaggerContainer: React.FC<MotionProps & { staggerDelay?: number }> = ({ children, staggerDelay = 0.1, className, ...props }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem: React.FC<MotionProps> = ({ children, className, ...props }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
