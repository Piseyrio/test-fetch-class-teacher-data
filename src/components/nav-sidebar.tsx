export default function NavSidebar() {
  return (
    <nav className="flex flex-col h-full bg-gray-800 text-white p-4">
      <div className="mb-8 text-2xl font-bold">Dashboard</div>
      <ul className="space-y-4">
        <li>
          <a href="/dashboard" className="hover:bg-gray-700 rounded px-3 py-2 block">
            Home
          </a>
        </li>
        <li>
          <a
            href="/dashboard/students"
            className="hover:bg-gray-700 rounded px-3 py-2 block"
          >
            Students
          </a>
        </li>
        <li>
          <a
            href="/dashboard/class"
            className="hover:bg-gray-700 rounded px-3 py-2 block"
          >
            Classes
          </a>
        </li>
        <li>
          <a
            href="/dashboard/teacher"
            className="hover:bg-gray-700 rounded px-3 py-2 block"
          >
            Teachers
          </a>
        </li>
        <li>
          <a href="/dashboard/subject"
          
           className="hover:bg-gray-700 rounded px-3 py-2 block"
           >
            Subjects
           </a>
        </li>
      </ul>
    </nav>
  );
}
