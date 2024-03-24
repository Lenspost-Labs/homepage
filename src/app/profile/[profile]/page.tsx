"use client";
import UserAvatar from "@/components/UserAvatar";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { PiButterflyFill } from "react-icons/pi";
import ProfileCollections from "@/components/collections/ProfileCollections";
import CounterBox from "@/components/CounterBox";
import axios from "axios";
import { UserDetails } from "../../../../types/types";
import Cookies from "js-cookie";

interface PageProps {
  params: { profile: string };
}

function Profile({ params }: PageProps) {
  const { profile } = params;
  return (
    <>
      <div className="flex flex-col pt-28 lg:pt-36 pb-5 lg:pb-20 items-center px-5 lg:px-20">
        <ProfileInfo profileHandle={profile} />
      </div>
    </>
  );
}

interface ProfileInfoProps {
  profileHandle: string;
}

const ProfileInfo = ({ profileHandle }: ProfileInfoProps) => {
  const [responseData, setResponseData] = useState<UserDetails | null>(null);
  const jwtToken = Cookies.get("jwt");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<UserDetails>(
          "https://lenspost-development.up.railway.app/user/",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setResponseData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row lg:space-y-0 space-y-4 items-center justify-between border border-theme-light-purple rounded-[30px] p-4 lg:p-8">
        <div className="flex lg:w-full items-center space-x-5 lg:space-x-10">
          <UserAvatar isVerified size="xl" />
          <div className="flex flex-col space-y-1 lg:space-y-2">
            <p className="text-2xl lg:text-5xl font-bold lowercase">
              @{profileHandle}
            </p>
            <p className="text-xl lg:text-4xl font-semibold text-theme-light-purple">
              Pro Memoor
            </p>
          </div>
        </div>
        <div className="flex items-center lg:items-end flex-row lg:flex-col space-x-4 lg:space-x-0 space-y-0 lg:space-y-10">
          <button>
            <FaCog size={40} className="cursor-pointer" />
          </button>
          <div className="flex flex-row items-center space-x-4">
            <Link href="https://bsky.app/">
              <PiButterflyFill size={40} className="cursor-pointer" />
            </Link>
            <Link href="https://discord.com/">
              <FaDiscord size={40} className="cursor-pointer" />
            </Link>
            <Link href="https://x.com/">
              <FaXTwitter size={30} className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-10 py-4 lg:py-10">
        <CounterBox
          title="POSTER Tokens"
          count={responseData?.message.balance?.toString() || ""}
          percentage="23.8"
          week="this"
        />
        <CounterBox title="Posts" count="221" percentage="23" week="this" />
      </div>
      <ProfileCollections />
    </>
  );
};

export default Profile;
