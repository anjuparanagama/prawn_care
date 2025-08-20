"use client";
import Navbar from "../components/Navbar"
import Header from '../components/ordlist/Header';
import Ordertable from '../components/ordlist/Ordertable';
import Graph from '../components/ordlist/Graph';


  export default function App() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col p-4 ml-[250px]">
        <Header/>
        <Ordertable />
        <Graph />
      </div>
    </div>
  );
}