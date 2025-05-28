import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Folder,
  Download,
  Trash2,
  FolderPlus,
  ArrowLeft,
  Image,
  FileText,
  File as FilePdf,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
} from "lucide-react";
import StorageSize from "./StorageComponents/StorageSize";
import { handleDownload } from "../../context/CallBacks";
import { API } from "../../context/API";
import UploadFileButton from "./StorageComponents/ExplorerButtons/UploadFile";
import CreateFolderModal from "./StorageComponents/ExplorerModals/CreateFolder";
import DeleteModal from "./StorageComponents/ExplorerModals/DeleteModal";
import { useNavigate } from "react-router-dom";

const Storage = () => {
  const redirector = useNavigate();
  const [profile, setProfile] = useState("");
  const [folderData, setFolderData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [folderStactRoots, setFolderStackRoots] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(1);
  const [folderStack, setFolderStack] = useState([]);

  const getProfile = useCallback(async () => {
    try {
      const response = await API.get(`/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const currentFolder = folderData.find(
    (item) => item.folderId === currentFolderId
  );
  const currentChildren =
    currentFolder?.children
      .map((id) => folderData.find((item) => item.folderId === id))
      .filter(Boolean)
      .sort((a, b) => {
        if (a.type === "folder" && b.type !== "folder") return -1;
        if (a.type !== "folder" && b.type === "folder") return 1;

        const nameA = a.root || "";
        const nameB = b.root || "";
        return nameA.localeCompare(nameB);
      }) || [];

  const getAllFolders = useCallback(async () => {
    if (profile) {
      try {
        const response = await API.get(`/storage/all/${profile?.username}`);
        setFolderData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [profile]);

  useEffect(() => {
    getAllFolders();
  }, [getAllFolders]);

  const getFileIcon = (type, root) => {
    if (type === "folder")
      return <Folder className="w-12 h-12 text-yellow-500" />;

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

  const handleFolderClick = async (folder) => {
    try {
      setSelectedItem(null);
      if (folder.type === "folder") {
        setFolderStack([...folderStack, currentFolderId]);
        setFolderStackRoots([...folderStactRoots, folder?.root]);
        setCurrentFolderId(folder.folderId);
      } else {
        redirector(`/main/${profile?.username}/file/view/${selectedItem}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  let touchCounter = 0;
  let touchTimeout;

  const handleTouchStart = (e, folder) => {
    touchCounter += 1;

    if (touchCounter === 2) {
      clearTimeout(touchTimeout);
      handleFolderClick(folder);
      touchCounter = 0;
    } else {
      touchTimeout = setTimeout(() => {
        touchCounter = 0;
      }, 500);
    }
  };

  const handleBack = () => {
    try {
      const previousFolderId = folderStack.pop();
      setCurrentFolderId(previousFolderId);
      setFolderStackRoots((prev) => prev.slice(0, -1));
      setFolderStack([...folderStack]);
      setSelectedItem(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <StorageSize profile={profile} />
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              disabled={folderStack.length === 0}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-15"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <nav className="text-gray-400 text-sm">
                <ol className="flex items-center space-x-2 capitalize">
                  <li className="flex items-center">
                    <span
                      className={`hover:text-purple-600 transition-colors duration-200 ${
                        folderStactRoots.length === 0 && "text-gray-700"
                      }`}
                    >
                      dashboard
                    </span>
                  </li>
                  {folderStactRoots.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <span
                        className={`hover:text-purple-600 transition-colors duration-200 ${
                          folderStactRoots?.length === index + 1 &&
                          "text-purple-700"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors"
            onClick={() => setShowCreateFolder(true)}
          >
            <FolderPlus className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-medium">New Folder</span>
          </motion.button>

          <UploadFileButton
            userData={profile}
            currentFolderId={currentFolderId}
            getData={getAllFolders}
            getProfile={getProfile}
          />
          {selectedItem &&
            folderData.find((item) => item.folderId === selectedItem)?.type ===
              "file" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-purple-50 transition-colors"
                onClick={() => handleDownload("Tanishk", selectedItem)}
              >
                <Download className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">Download</span>
              </motion.button>
            )}
          {selectedItem && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-red-50 transition-colors"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="w-5 h-5 text-red-600" />
              <span className="text-gray-700 font-medium">Delete</span>
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {currentChildren.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer ${
                selectedItem === item.folderId ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedItem(item.folderId)}
              onDoubleClick={() => handleFolderClick(item)}
              onTouchStart={(e) => handleTouchStart(e, item)}
            >
              <div className="flex flex-col items-center">
                {getFileIcon(item.type, item.root)}
                <span className="mt-2 text-sm text-gray-700 text-center truncate w-full">
                  {item.root}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modals */}
        <CreateFolderModal
          isOpen={showCreateFolder}
          setIsOpen={setShowCreateFolder}
          onClose={getAllFolders}
          userData={profile}
          currentFolderId={currentFolderId}
        />
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={getAllFolders}
          selectedItem={selectedItem}
          userData={profile}
          getProfile={getProfile}
          setIsOpen={setShowDeleteModal}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </div>
  );
};

export default Storage;
