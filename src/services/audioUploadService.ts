import axios from "axios";
import {
  CLOUDINARY_AUDIO_URL,
  CLOUDINARY_AUDIO_UPLOAD_PRESET,
} from "../cloudinary";

export const uploadAudio = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_AUDIO_UPLOAD_PRESET || "");
  formData.append("resource_type", "auto");
  const response = await axios.post(CLOUDINARY_AUDIO_URL, formData);
  return response.data.secure_url;
};
