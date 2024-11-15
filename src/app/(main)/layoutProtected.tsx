import localFont from "next/font/local";
import "../../globals.scss";
import AuthGuard from "./(private)/guard/authGuard";
import SideBar from "@/ui/molecules/Sidebar";

export default function LayoutProtected({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <AuthGuard>
          {/* <SideBar/> */}
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
