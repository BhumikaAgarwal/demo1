interface HoverPopupProps {
    popupContent: string[];
  }
  
  const HoverPopup: React.FC<HoverPopupProps> = ({ popupContent }) => (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 p-4 rounded-md shadow-lg text-gray-800 dark:text-gray-200 z-50 mb-2">
      <ul className="list-disc list-inside text-sm space-y-1">
        {popupContent.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
  
  export default HoverPopup;
  