import { motion } from "framer-motion";
import { JSX } from "react";

export default function DashboardRight(): JSX.Element {
    return (
        <motion.div 
            className="flex-1 h-full p-6 overflow-hidden bg-neutral-50 dark:bg-dark-primary/30 border-l-[1px] border-t-[1px] border-neutral-300 dark:border-neutral-700 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            
        </motion.div>
    );
}
