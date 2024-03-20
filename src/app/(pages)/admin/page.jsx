import ECommerce from "@/src/components/admin/Dashboard/E-commerce";
import DefaultLayout from "@/src/components/admin/Layouts/DefaultLayout";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
