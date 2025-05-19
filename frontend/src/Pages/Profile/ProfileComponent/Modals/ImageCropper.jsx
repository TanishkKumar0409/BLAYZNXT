import { useRef } from "react";
import { Cropper } from "react-advanced-cropper";
import { API } from "../../../../context/API";
import { useParams } from "react-router-dom";
import { Image, X } from "lucide-react";

export default function ImageCropper({
  image,
  setShowCropper,
  setImage,
  originalFileName,
}) {
  const { username } = useParams();
  const cropperRef = useRef(null);

  const handleSave = async () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append("profile", blob, originalFileName);

          try {
            await API.patch(`/user/profile/${username}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            window.location.reload();
          } catch (error) {
            console.error(error.message);
          }
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-modal-appear">
        <div className="bg-green-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-xl font-semibold text-green-700">
              Change Profile
            </h2>
          </div>
          <button
            onClick={() => {
              setShowCropper(false);
              setImage(null);
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="relative w-full aspect-square rounded-md overflow-hidden border">
            <Cropper
              ref={cropperRef}
              src={image}
              stencilProps={{
                aspectRatio: 1,
              }}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-green-50 flex justify-end gap-3">
          <button
            onClick={() => {
              setShowCropper(false);
              setImage(null);
            }}
            className="px-4 py-2 text-green-700 hover:bg-green-100 border-2 border-green-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Save
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
