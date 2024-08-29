import { SharkSupportAPI } from "../../../services/User/admin/adminServices";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function SharkSupport() {
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: SharkSupportAPI,
    mutationKey: ["shark_support"],
  });

  const handleSendMessage = async () => {
    try {
      const data = await mutateAsync({ message });
      //console.log(data);
      setConfirmationMessage(
        "Your request is sent to the admins. They will connect with you shortly."
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">Shark Support</h2>
      </div>
      <div className="flex flex-col items-center">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your query here..."
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg resize-none h-32"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
          disabled={isPending} // Optionally disable the button while the request is pending
        >
          Send
        </button>
        {confirmationMessage && ( // Display confirmation message if available
          <p className="text-green-600 mt-4">{confirmationMessage}</p>
        )}
      </div>
    </div>
  );
}
