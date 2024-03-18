"use client";
import { isStrong, secondToDate, setCookie } from "@/utils/utils";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import { jwtDecode } from "node_modules/jwt-decode/build/cjs";
import { useState } from "react";
// import { toast } from "react-toastify";
// import ShortUniqueId from "short-unique-id";
import { firebaseAuth } from "@/firebase/auth";
import { activeUserState } from "@/lib/ui";
import { useHookstate } from "@hookstate/core";
import * as Yup from "yup";
import commonData from "../../../common.json";
import PasswordInput from "./passwordInput";
// form validation
const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .test(
      "strong-password",
      "Password should be minimum 8 character and at least 1 symbol 1 uppercase  1 lowercase letters and a number.",
      (value) => isStrong(value)
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .test(
      "is-match-to-password",
      "Confirm password should math with password",
      (value, context) => {
        return context.parent.password === value;
      }
    ),
});

// form
function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCPassVisible, setIsCPassVisible] = useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleCPassVisibility = () => setIsCPassVisible(!isCPassVisible);
  const authState = useHookstate(firebaseAuth);
  const [resError, setErrors] = useState({ error: "" });
  const activeUserStateRef = useHookstate(activeUserState);

  const submitHandler = async (values) => {
    const { signup } = authState.get({ noproxy: true }).auth;

    signup(values.fullName, values.email, values.password)
      .then((value) => {
        if (value?.user) {
          const data = {
            ...value.user,
            ...value._tokenResponse,
          };
          const expiresIn = secondToDate(data.expiresIn);

          const tokens = {
            accessToke: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: expiresIn,
            uid: data.uid,
          };

          setCookie(
            commonData.auth_cookie_name,
            tokens.accessToken,
            tokens.refreshToken,
            expiresIn,
            tokens.uid
          );

          const user = {
            displayName: data.displayName,
            email: data.email,
            uid: data.uid,
            photoURL: data.photoURL,
            emailVerified: data.emailVerified,
          };

          localStorage.setItem(
            "__usr__",
            JSON.stringify({
              user,
            })
          );

          activeUserStateRef.set({ user: user, tokens: tokens });

          router.push("/");
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setErrors({ error: "Email already used!" });
        } else {
          console.log(err);
          setErrors({ error: "There is an error! try again" });
        }
      });
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        await submitHandler(values);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full   mx-auto gap-8">
              <Input
                label="Full Name"
                variant="underlined"
                name="fullName"
                type="text"
                value={values.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="relative text-red-400 text-small top-[-25px]">
                  {errors.fullName}
                </span>
              )}

              <Input
                label="Email"
                variant="underlined"
                isRequired
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="relative text-red-400 text-small top-[-25px]">
                  {errors.email}
                </span>
              )}

              <PasswordInput
                label="Password"
                variant="underlined"
                isRequired
                name="password"
                onChange={handleChange}
                value={values.password}
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}
                type={isVisible ? "text" : "password"}
              />
              {errors.password && (
                <span className="relative text-red-400 text-small top-[-25px]">
                  {errors.password}
                </span>
              )}
              <PasswordInput
                label="Confirm Password"
                variant="underlined"
                isRequired
                isVisible={isCPassVisible}
                type={isCPassVisible ? "text" : "password"}
                name="confirmPassword"
                toggleVisibility={toggleCPassVisibility}
                onChange={handleChange}
                value={values.confirmPassword}
              />
            </div>
            {errors.confirmPassword && (
              <span className="relative text-red-400 text-small top-[5px]">
                {errors.confirmPassword}
              </span>
            )}

            <div className=" mt-6">
              {resError?.error && (
                <span className="relative text-red-400 text-small block my-4">
                  {resError.error}
                </span>
              )}
              <Button
                type="submit"
                className="w-full bg-black  text-white text-lg rounded-[5px]"
              >
                Login
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default RegisterForm;
