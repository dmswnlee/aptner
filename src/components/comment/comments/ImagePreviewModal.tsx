import React from 'react';

interface ImagePreviewModalProps {
  image: File | null;
  onClose: () => void;
}

const ImagePreviewModal = ({ image, onClose }: ImagePreviewModalProps) => {
  if (!image) return null;

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
      <div className="bg-white p-4 rounded">
        {/* <button onClick={onClose} className="ml-2 bg-red-500 text-black rounded">Close</button> */}
        <img src={URL.createObjectURL(image)} alt="미리보기 이미지" className="max-w-full max-h-full" />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
