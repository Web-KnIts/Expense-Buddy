import { API_PATH } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async(profileImage : File) : Promise<any> =>{
 const formData = new FormData();
 formData.append('image',profileImage);
 try{
    const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    return response.data;
 }
 catch(err)
 {
     console.log("-----------------------------------")
     console.log('Error uploading Image')
     console.error(err)
     console.log("-----------------------------------")
    throw err
 }
    
}
export default uploadImage;