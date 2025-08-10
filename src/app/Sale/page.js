"use client";
import Navbar from '../components/Navbar';
import Header from '../components/sales/Header';
import Salestable from '../components/sales/Salestable';
import Graph from '../components/sales/Graph';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      <div className="flex-grow flex flex-col p-6 gap-6 ml-[250px] ">
            <Header />
            <Graph />
            <Salestable />           
      </div>
    </div>
  );
}

