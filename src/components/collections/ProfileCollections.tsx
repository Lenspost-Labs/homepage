"use client";
import Tabs from "@/ui/Tabs";
import React, { useState } from "react";
import Collections from "@/components/collections";
import { CollectionsData } from "@/lib/data";

interface Props {
  tabs: string[];
}


function ProfileCollections({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState("Gallery");

  return (
    <>
      <div className="flex flex-col space-y-4 lg:space-y-6 py-5 w-full">
        <div className="flex flex-row space-x-4 mb-2 items-center">
          <Tabs
            tabs={["Gallery", "Rewards"]}
            active={activeTab}
            setActive={setActiveTab}
            className="!text-lg !lg:text-2xl"
          />
        </div>
        <div className="flex flex-1 h-full w-full">
          {activeTab === "Gallery" && (
            <Collections
              withTabs={true}
              tabs={tabs}
              data={CollectionsData}
              isTabStyle={false}
            />
          )}
         {activeTab === "Rewards" && (
          <div className="flex flex-col mx-auto items-center justify-center h-full">
            <Collections withTabs={false} tabs={tabs} data={CollectionsData} isTabStyle={false} />
            <p className="text-center font-bold text-xl lg:text-2xl gradient-text">Coming Soon</p>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default ProfileCollections;
