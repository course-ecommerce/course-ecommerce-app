"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import CustomButton from "../CustomButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(10, "Email must contain at least 10 character(s)")
    .max(30)
    .email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 character(s)"),
});

function LoginForm() {
  const route = useRouter();
  const [openEye, setOpenEye] = useState(false);

  const toggle = () => {
    setOpenEye(!openEye);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 h-4/5 xs:h-3/5 xs:w-4/5 min-h-[400px] bg-gray-100 rounded-3xl xl:flex"
      >
        <div className="h-1/2 p-5 my-1 w-full lg:w-1/2 2xs:text-[10px] xl:text-sm ">
          <div className="font-mono mb-2 flex-center flex-col ">
            <div className="text-3xl mb-2 "> LOGIN</div>
            <p>If you have account member</p>
            <p> Please Login</p>
          </div>
          <div className="mb-2 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-black">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field}></Input>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute text-2xl right-1 cursor-pointer mt-2">
                        {openEye === false ? (
                          <AiOutlineEyeInvisible onClick={toggle} />
                        ) : (
                          <AiOutlineEye onClick={toggle} />
                        )}
                      </div>
                      <Input
                        type={openEye === false ? "password" : "text"}
                        placeholder="password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full hover:scale-110 transition duration-700 gap-2 mt-1"
          >
            <FiLogIn />
            Login
          </Button>
          <div className="grid grid-cols-3 gap-3 m-2 items-center">
            <hr className="border-gray-400" />
            <h3 className="text-center">OR</h3>
            <hr className="border-gray-400" />
          </div>
          <CustomButton
            title="Login with Google"
            icon="FcGoogle"
            iconStyles="mr-2 xl:text-2xl "
            containerStyles="xs:text-[10px] bg-white border py-1 w-full rounded-xl mt-2 flex justify-center items-center text-sm font-bold hover:scale-110 duration-300 "
          />
          <div className="text-[12px] mt-2 flex-between xs:text-[10px]">
            <p>Dont have an account?</p>
            <Link href={"/signup"}>
              <CustomButton
                title="Register"
                type="button"
                containerStyles="xs:text-[10px] py-1 px-4 bg-white border rounded-xl hover:scale-110 duration-300"
              />
            </Link>
          </div>
        </div>
        <div className="w-1/2 lg:block hidden">
          <div className="bg-login bg-center bg-cover h-full rounded-r-3xl w-full"></div>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
