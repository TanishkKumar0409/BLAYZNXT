import { useCallback, useEffect, useState } from "react";
import { API } from "../../../context/API";
import {
  Image,
  FileText,
  File as FilePdf,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function Recents({ recents }) {
  const { username } = useParams();
  const [folders, setFolders] = useState([]);

  const getFolders = useCallback(async () => {
    if (username) {
      try {
        const response = await API.get(`/storage/all/${username}`);
        setFolders(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [username]);

  useEffect(() => {
    getFolders();
  }, [getFolders]);
  const getNameFormFolder = (id) => {
    const folderDetail = folders.find((item) => item.folderId === id);
    return folderDetail?.root || "Unknown";
  };

  const getFileIcon = (root) => {
    const ext = root?.split(".")?.[1];
    switch (ext) {
      case "jpg":
      case "png":
      case "gif":
      case "webp":
        return <Image className="w-12 h-12 text-blue-500" />;
      case "pdf":
        return <FilePdf className="w-12 h-12 text-red-500" />;
      case "xlsx":
        return <FileSpreadsheet className="w-12 h-12 text-green-600" />;
      case "mp4":
      case "mkv":
        return <FileVideo className="w-12 h-12 text-purple-500" />;
      case "mp3":
        return <FileAudio className="w-12 h-12 text-pink-500" />;
      default:
        return <FileText className="w-12 h-12 text-gray-500" />;
    }
  };

  if (!recents) {
    return;
  }
  return (
    <section className="py-16 md:px-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Files</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {recents?.recentFiles?.map((file, index) => (
            <Link
              key={index}
              to={`/main/${username}/file/view/${file?.folderId}`}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 py-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center">
                {getFileIcon(getNameFormFolder(file?.folderId))}
                <p className="mt-5">{getNameFormFolder(file?.folderId)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
