import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function SharedResponse({ showLink }) {
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Text copied to clipboard!"))
      .catch((err) => console.error(error.message));
  };

  return (
    <div className="container mx-auto px-4">
      <div className=" mx-auto rounded-xl p-4 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Files Shared Successfully!
          </h2>
          <p className="text-gray-600 text-center break-words px-4">
            You shared {showLink.fileName.length} file
            {showLink.fileName.length !== 1 ? "s" : ""} with{" "}
            {showLink.receiverEmail}
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow-xs p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white w-full overflow-x-auto">
                <span className="text-gray-600 break-all">
                  {`${import.meta.env.VITE_API_URL}/${showLink._id}`}
                </span>
              </div>
              <button
                onClick={() =>
                  handleCopy(`${import.meta.env.VITE_API_URL}/${showLink._id}`)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showLink.message && (
            <div className="bg-white shadow-xs p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <p className="text-gray-600 break-words">{showLink.message}</p>
            </div>
          )}

          <div className="bg-white shadow-xs p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <p className="text-gray-600">
              Link will expire on{" "}
              {new Date(showLink.downloadLinkExpiry).toLocaleString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
