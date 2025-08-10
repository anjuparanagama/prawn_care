"use client";
import Navbar from "../components/Navbar"
import Header from '../components/ordlist/Header';
import Searchbar from '../components/ordlist/Searchbar';
import Ordertable from '../components/ordlist/Ordertable';
import Graph from '../components/ordlist/Graph';


  export default function App() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col p-6 gap-6 ml-[250px]">
        <Header />
        <Searchbar />
        <Ordertable />
        <Graph />
      </div>
    </div>
  );
}