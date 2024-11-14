import React, { useState } from "react";
import { FaTimes, FaPen } from "react-icons/fa"; // Import the pencil icon
import { Button } from "@/components/ui/button"; // Adjust this import based on your button component

interface DiveDeeperModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string[]; // Array of content to display in the modal (bullet points)
}

const DiveDeeperModal: React.FC<DiveDeeperModalProps> = ({ isOpen, onClose, content }) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 flex items-end justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-96 p-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
        >
          <FaTimes className="h-5 w-5" />
        </Button>

        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">AI Assistant</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Fixed Input Box */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask me anything"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <FaPen className="text-gray-500 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiveDeeperModal;
