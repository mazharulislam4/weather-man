"use client";
import { signIn } from "@/firebase/auth";
import { activeUserState } from "@/lib/ui";
import { secondToDate } from "@/utils/utils";
import { useHookstate } from "@hookstate/core";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
// form validation
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function LoginForm() {
  const [resError, setErrors] = useState({ error: "" });
  const router = useRouter();
  const activeUserStateRef = useHookstate(activeUserState);

  const submitHandler = async (values) => {
    try {
      const res = await signIn(values.email, values.password);

      if (res?.user) {
        const data = {
          ...res.user,
          ...res._tokenResponse,
        };
        const expiresIn = secondToDate(data.expiresIn);

        const tokens = {
          accessToke: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: expiresIn,
          data: data.uid,
        };

        const user = {
          displayName: data.displayName,
          email: data.email,
          uid: data.uid,
          photoURL: data.photoURL,
          emailVerified: data.emailVerified,
        };

        sessionStorage.setItem(
          "__usr__",
          JSON.stringify({
            user,
          })
        );

        activeUserStateRef.set({ user: user, tokens: tokens });

        router.push("/");
      }
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setErrors({ error: "Wrong credential!" });
      } else {
        console.log(err);
        setErrors({ error: "There is an error! try again" });
      }
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={submitHandler}
      validationSchema={SignupSchema}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full   mx-auto gap-8">
            <Input
              label="Email"
              name="email"
              value={values.email}
              variant="underlined"
              isRequired
              type="email"
              onChange={handleChange}
            />
            {errors.email && (
              <span className="relative text-red-400 text-small top-[-25px]">
                {errors.email}
              </span>
            )}
            <Input
              label="Password"
              variant="underlined"
              isRequired
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="relative text-red-400 text-small top-[-25px]">
                {errors.password}
              </span>
            )}
          </div>
          {resError?.error && (
            <span className="relative text-red-400 text-small block my-4">
              {resError.error}
            </span>
          )}
          <Button
            type="submit"
            className="w-full mt-8 bg-black text-white rounded-[5px]"
          >
            Login
          </Button>

          <div className="mt-3 text-center">
            <Link href={"/forget-password"} className="text-gray text-small">
              Forget password ?
            </Link>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
