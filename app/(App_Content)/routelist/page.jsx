'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import RouteListDropDown from "@/app/ui/routelist/RouteListDropDown";
import RouteStats from "@/app/ui/routelist/RouteStats";

export default function RouteListPage() {
    userAuthentication();

    return (
        <>
            <div className="min-h-full w-full flex flex-col items-center">
                <div className="mt-5 ml-5 w-full sm:w-1/3">
                    <RouteListDropDown />
                </div>
                <div className="mt-5 ml-5 mr-5 w-full">
                    <RouteStats />
                </div>
            </div>
        </>
    )
}