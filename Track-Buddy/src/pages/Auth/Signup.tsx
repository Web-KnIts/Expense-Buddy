import React, { useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import type { isignupCredential, iUserResponse } from "../types";
import z from "zod";
import ProfileAvatar from "../../components/Input/ProfileAvatar";
import { API_PATH } from "../../services/apiPath";
import axiosInstance from "../../services/axiosInstance";
import { useUserContext } from "../../context/userContext";
import uploadImage from "../../services/uploadImage";

const zodSchemaValidationForSignUp = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    confirmPassword: z
      .string()
      .min(8, "Cofirm Password must be at least 8 char"),
    password: z
      .string()
      .min(8, "Password must be at least 8 char")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number",
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Password must contain at least one special character",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const [signupCredentials, setSignupCredentials] = useState<isignupCredential>(
    {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    }
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { updateUser } = useUserContext();
  const navigate = useNavigate();
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let profileUrl = "";
    const validationResult =
      zodSchemaValidationForSignUp.safeParse(signupCredentials);
    if (!validationResult.success) {
      setSignupCredentials((prev) => ({
        ...prev,
        error: validationResult.error.errors[0]?.message || "Validation Error",
      }));
      return;
    }
    setSignupCredentials((prev) => ({
      ...prev,
      error: "",
    }));
    try {
      if (profileImage) {
        const imageUploadResponse = await uploadImage(profileImage);
        const { imageUrl } = imageUploadResponse as { imageUrl: string };
        profileUrl = imageUrl;
      }
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        ...signupCredentials,
        profileImageUrl: profileUrl,
      });
      const { user, token } = response.data as iUserResponse;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.log(
        API_PATH.AUTH.REGISTER,
        " --------------------------------------------------"
      );
      console.log("Error : ", err);
      console.log(
        "-------------------------------------------------------------------------"
      );
      if (err.response && err.response?.data?.message) {
        setSignupCredentials((prev) => ({
          ...prev,
          error: err.response?.data?.message || "Validation Error",
        }));
      } else {
        setSignupCredentials((prev) => ({
          ...prev,
          error: err.response?.data?.message || "Only .jpeg, .jpg and .png formats are allowed",
        }));
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[80%] md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today to tack your income and expenses
        </p>
        <form onSubmit={handleSignup}>
          <ProfileAvatar image={profileImage} setImage={setProfileImage} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <Input
              value={signupCredentials.fullname}
              label="Full Name"
              onChange={({ target }) =>
                setSignupCredentials((prev) => ({
                  ...prev,
                  fullname: target.value,
                }))
              }
              placeholder="Track Buddy"
              type="text"
            />
            <Input
              value={signupCredentials.email}
              label={"Email address"}
              onChange={({ target }) =>
                setSignupCredentials((prev) => ({
                  ...prev,
                  email: target.value,
                }))
              }
              placeholder={"hello@gmail.com"}
              type="text"
            />
            <div className="md:col-span-2">
              <Input
                value={signupCredentials.password}
                label={"Password"}
                onChange={({ target }) =>
                  setSignupCredentials((prev) => ({
                    ...prev,
                    password: target.value,
                  }))
                }
                placeholder={"Min 8 character"}
                type="password"
              />
            </div>
            <div className="md:col-span-2">
              <Input
                value={signupCredentials.confirmPassword}
                label={"Confirm Password"}
                onChange={({ target }) =>
                  setSignupCredentials((prev) => ({
                    ...prev,
                    confirmPassword: target.value,
                  }))
                }
                placeholder={"Min 8 character"}
                type="password"
              />
            </div>
          </div>
          {signupCredentials.error && (
            <p className="text-red-950 text-xs pb-2.5">
              {signupCredentials.error}
            </p>
          )}
          <button type="submit" className="btn-primary">
            SIGNUP
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Have an account ?{" "}
            <Link className="font-medium text-red-600 underline" to="/Login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
