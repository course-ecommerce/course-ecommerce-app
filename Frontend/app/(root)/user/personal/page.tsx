"use client";
import PersonalForm from "@/components/form/PersonalForm";
import { AuthState } from "@/redux/features/authSlice";
// import { useGetByUserNameQuery } from "@/redux/services/authApi";
import { User } from "@/types/user.type";
import React, { Suspense } from "react";
import Loading from "./loading";
import { useGetByUserNameQuery } from "@/redux/services/userApi";

function PagePersonal() {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data, error, isLoading } = useGetByUserNameQuery("tranchimy2508");

  if (isLoading) return <Loading />;

  return (
    <div className="mt-10 mr-28 w-full">
      <div className="sticky top-[80px] bg-white h-10">
        <div className="font-bold"> Thông Tin Cá Nhân </div>
        <hr />
      </div>
      <PersonalForm userInfor={data?.data as User} />
    </div>
  );
}

export default PagePersonal;
