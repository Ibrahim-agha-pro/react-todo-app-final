// component/Notification.js
export default function Notification({ children }) {
  return (
    <div className="fixed bottom-4 right-4 bg-[#ae7dea] text-white p-4 rounded-lg shadow-lg">
      {children}
    </div>
  );
}
