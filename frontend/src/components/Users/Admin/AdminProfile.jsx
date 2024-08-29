import { useQuery } from "@tanstack/react-query";
import { AdminProfileAPI } from "../../../services/User/admin/adminServices";
import bg_image from "../../../Resources/cybersecurity-fotor.jpg";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminProfile() {
  const { data, refetch, isError, isPending, isSuccess } = useQuery({
    queryFn: AdminProfileAPI,
    queryKey: ["admin-profile"],
  });

  if (isSuccess && data) {
    return (
      <>
        <div className="my-8 h-80 flex items-center justify-center">
          <img
            src={bg_image}
            alt="Entrepreneur Background"
            className="object-contain"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>

        <div className="mx-4 flex">
          {/* Left Div (30% width) */}
          <div className="w-1/3 flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-md">
            <div className="text-9xl mb-4">
              <MdAdminPanelSettings />
            </div>
            <p className="text-lg font-semibold mb-2">Admin</p>
            <p className="text-xl font-semibold">{data.name}</p>
          </div>

          <div className="w-2/3 p-8 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

            <p>
              <strong>Name:</strong> {data.name}
            </p>

            <p>
              <strong>Email:</strong> {data.email_id}
            </p>
          </div>
        </div>
      </>
    );
  }
}
