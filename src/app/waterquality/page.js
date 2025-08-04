"use client";
import Navbar from '../components/Navbar';
import Header from '../components/waterquality/Header';
import Box from '../components/waterquality/Box';
import Table from '../components/waterquality/Table';

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col p-6 gap-6 ml-[250px] bg-gray-50">
        <Header />
        <Box />
        <Table />
      </div>
    </div>
  );
}
