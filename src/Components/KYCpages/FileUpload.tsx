import React, { useState } from "react";
import Icon from "../../Assets/SvgImagesAndIcons";

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, error }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    onChange(null);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col mb-4">
      {!file ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2">
            <Icon type="cloudUpload" className="w-14 h-14 mr-4" />
          </div>
          <p className="text-gray-600">{label}</p>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="mt-2 text-teal-500 cursor-pointer"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
              {file.type.includes("image") ? (
                <Icon type="imageUploadIcon" className="h-14 w-14 text-green-500" />
              ) : (
                <Icon type="pdfUploadIcon" className="h-14 w-14 text-green-500" />
              )}
            </div>
            <div className="ml-2">
              <p className="font-semibold">
                {file.name.length > 15 ? `${file.name.slice(0, 15)}...` : file.name}
              </p>
              <p className="text-gray-500">{(file.size / 1024).toFixed(0)} KB - 100% uploaded</p>
            </div>
          </div>
          <button onClick={handleRemoveFile} className="text-gray-500 hover:text-red-500">
            <Icon type="deleteIcon" className="h-14 w-14" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
