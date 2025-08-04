import Image from "next/image";
import Navbar from "../components/Navbar"
import User from "../components/settings/user";

export default function Home() {
  return (
    <div>
      <Navbar/> 
      <User/>
    </div>
  );
}
