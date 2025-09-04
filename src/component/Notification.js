export default function Notification({ children }) {
  return (
    <div className="fixed bottom-4 right-4 bg-[#ae7dea] text-white p-4 rounded-lg shadow-lg z-50 animate-fadeIn">
      <div className="flex items-center">
        <span className="mr-2">✅</span>
        {children}
      </div>
    </div>
  );
}
