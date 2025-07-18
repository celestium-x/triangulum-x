import { motion } from "framer-motion";
import { JSX } from "react";

export default function DashboardRight(): JSX.Element {
    return (
        <motion.div 
            className="flex-1 h-full p-6 overflow-hidden bg-neutral-50 dark:bg-dark-primary/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            
        </motion.div>
    );
}
