// component/ConfermationMsg.js
import MyButton from "./MyButton";

export default function ConfermationMsg({ onCancel, onConfirm }) {
  return (
    <div>
      <div
        className="bg-black opacity-70 fixed inset-0 z-10"
        onClick={onCancel}
      ></div>

      <div className="bg-white fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 flex flex-col items-center rounded-lg shadow-xl min-w-[300px]">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#333]">Are you sure?</h1>
        </div>

        <div className="flex gap-3">
          <MyButton onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Yes
          </MyButton>
          <MyButton
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600"
          >
            No
          </MyButton>
        </div>
      </div>
    </div>
  );
}
