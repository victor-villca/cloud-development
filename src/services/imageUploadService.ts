import axios from "axios";
import {
  CLOUDINARY_IMAGE_URL,
  CLOUDINARY_IMAGE_UPLOAD_PRESET,
} from "../cloudinary";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_IMAGE_UPLOAD_PRESET || "");
  const response = await axios.post(CLOUDINARY_IMAGE_URL, formData);
  return response.data.secure_url;
};
