import HomePage from "@/components/Home";
import Image from "next/image";
import EffectMood from "@/components/Gemini";
import Footer from "@/components/Footer";
import Waves from "@/components/Waves"
import MovinfCrads from "@/components/Movingcard"



export default function Home() {
  return (
    <>
    <HomePage/>
    <Waves/>
    <MovinfCrads/>
    <EffectMood/>
    <Footer/>
    </>
   
  );
}
