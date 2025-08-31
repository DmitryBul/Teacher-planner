import { useState } from "react";

export function useFileSystem() {
  const [files, setFiles] = useState([]); // [{ id, name, content }]
  const [selectedFile, setSelectedFile] = useState(null);

  const createFile = (name) => {
    const newFile = { id: Date.now(), name, content: "<p>Новый документ</p>" };
    setFiles((prev) => [...prev, newFile]);
    setSelectedFile(newFile);
  };

  const updateFileContent = (id, newContent) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, content: newContent } : file
      )
    );
    if (selectedFile?.id === id) {
      setSelectedFile((prev) => ({ ...prev, content: newContent }));
    }
  };

  const deleteFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    if (selectedFile?.id === id) setSelectedFile(null);
  };

  return {
    files,
    selectedFile,
    createFile,
    updateFileContent,
    deleteFile,
    setSelectedFile,
  };
}
