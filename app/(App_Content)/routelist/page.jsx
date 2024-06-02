'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import RouteListDashboard from "@/app/ui/routelist/RouteListDashboard";
import RouteStats from "@/app/ui/routelist/RouteStats";

export default function RouteListPage() {
    userAuthentication();

    return (
        <>
            <div className="min-h-full w-full flex">
                <div className="mt-5 ml-5">
                    <RouteListDashboard />
                </div>
                <div className="mt-5 ml-5 mr-5 w-full">
                    <RouteStats />
                </div>
            </div>
        </>
    )
}