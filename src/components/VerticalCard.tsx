import { useState } from 'react';
import HoverPopup from './HoverPopup'; // Import HoverPopup component
import DiveDeeperModal from './DiveDeeperModal'; // Import DiveDeeperModal component
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VerticalCardProps {
    title: string;
    icon: React.ReactNode;
    value: string;
    change: string;
    color: string;
    onDiveDeeper: () => void;
    popupContent: string[];
    diveDeeperContent: string[]; // Content for the modal
}

const VerticalCard: React.FC<VerticalCardProps> = ({
    title,
    icon,
    value,
    change,
    color,
    popupContent,
    diveDeeperContent
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDiveDeeperClick = () => {
        setIsModalOpen(true); // Open the modal on button click
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div
            className={`relative group h-full w-full bg-gradient-to-br ${color} border-none transition-all duration-300 hover:shadow-xl rounded-md`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-gray-800 dark:text-gray-200 text-lg font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent className="pt-2">
                <div className="text-xl font-bold text-gray-800 dark:text-gray-200">{value}</div>
                <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-700 dark:text-gray-400">{change}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-100"
                        onClick={handleDiveDeeperClick} // Open modal on click
                    >
                        Dive Deeper
                    </Button>
                </div>
            </CardContent>

            {/* Show popup on hover */}
            {isHovered && <HoverPopup popupContent={popupContent} />}

            {/* Show the Dive Deeper Modal */}
            <DiveDeeperModal isOpen={isModalOpen} onClose={handleCloseModal} content={diveDeeperContent} />
        </div>
    );
};

export default VerticalCard;