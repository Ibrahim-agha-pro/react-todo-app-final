// component/MyButton.js
export default function MyButton({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#ae7dea] rounded-xl text-white px-6 py-2 inline-block transition-colors duration-200 hover:bg-[#9b6bd1] ${className}`}
    >
      {children}
    </button>
  );
}
