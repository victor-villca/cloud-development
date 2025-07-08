import axios from "axios";
import { CLOUDINARY_URL, CLOUDINARY_AUDIO_UPLOAD_PRESET } from "../cloudinary";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_AUDIO_UPLOAD_PRESET || "");
  formData.append("resource_type", "video");
  const response = await axios.post(CLOUDINARY_URL, formData);
  return response.data.secure_url;
};
