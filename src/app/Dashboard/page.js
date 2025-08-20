import Navbar from '../components/Navbar';
import Upper from '../components/dashboard/Upper';
import Bottom from '../components/dashboard/Bottom';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen ">
      <Navbar />
      <main className="ml-64 w-full p-8">
        <Upper />
        <Bottom/>
      </main>
    </div>
  );
}
