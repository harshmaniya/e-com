import ECommerce from "@/src/components/admin/Dashboard/E-commerce";
// import { Metadata } from "next";
import DefaultLayout from "@/src/components/admin/Layouts/DefaultLayout";

// export const metadata = {
//   title: "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
