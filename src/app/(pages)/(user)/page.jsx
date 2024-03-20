import Button from "@/src/components/Client/Button";
import Navbar from "@/src/components/Client/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-around">
        <div className="w-1/2">
          <span>Design Your
            Comfort Zone</span>
          <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
          <Button
            title={"SHOP NOW"}
            className="bg-[#ab7a5f] text-white px-4 py-2 rounded-md shadow-md"
          />
        </div>

        <div className="w-1/2 flex justify-center">
          <Image src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg" alt="Hero Image" width={500} height={500} />
        </div>
      </div>
    </>
  );
}
