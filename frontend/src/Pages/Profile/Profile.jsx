import { useState, useCallback, useEffect } from "react";
import ProfileHeader from "./ProfileComponent/ProfileHeaders";
import ProfileInformation from "./ProfileComponent/ProfileInformation";
import ProfileActions from "./ProfileComponent/ProfileActions";
import ImageCropper from "./ProfileComponent/Modals/ImageCropper";
import { API } from "../../context/API";

function Profile() {
  const [profile, setProfile] = useState("");
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState(null);
  const [originalFileName, setOriginalFileName] = useState("");

  const getProfile = useCallback(async () => {
    try {
      const response = await API.get(`/profile`);
      setProfile(response.data);
      setOriginalFileName("");
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setOriginalFileName(file.name);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="max-w-5xl mx-auto shadow-sm rounded-2xl overflow-hidden">
        <ProfileHeader profile={profile} handleFileChange={handleFileChange} />
        <ProfileInformation profile={profile} />
        <ProfileActions profile={profile} />
      </div>

      {showCropper && (
        <ImageCropper
          originalFileName={originalFileName}
          image={image}
          setImage={setImage}
          getProfile={getProfile}
          setShowCropper={setShowCropper}
        />
      )}
    </div>
  );
}

export default Profile;
