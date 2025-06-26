import React, { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { API_PATH } from "../services/apiPath";
import type { User } from "../pages/types";

type iGetInformation = {
  id: string;
  message: string;
  user: User;
};

const useUserInformation = () => {
  const { user, updateUser, clearUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;
    let isMounted = true;
    const fetchUserInformation = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          const value = response.data as iGetInformation;
          updateUser(value.user);
        }
      } catch (err) {
        console.error("Faild to fetch user information :  ", err);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInformation();

    return () => {
      isMounted = false;
    };
  }),
    [updateUser, clearUser, navigate];
};

export default useUserInformation;
