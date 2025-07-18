import { motion } from "framer-motion";
import { JSX } from "react";

interface DashboardLeftProps {
    isExpanded: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export default function DashboardLeft({ 
    isExpanded, 
    onMouseEnter, 
    onMouseLeave 
}: DashboardLeftProps): JSX.Element {
    return (
        <motion.div 
            className="h-full border-r-[1px] border-neutral-300 dark:border-neutral-700 bg-light-base dark:bg-dark-base/10 shrink-0"
            initial={{ width: "68px" }}
            animate={{ 
                width: isExpanded ? "300px" : "68px",
            }}
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            
        </motion.div>
    );
}
