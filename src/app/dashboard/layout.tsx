import NavSidebar from "@/components/nav-sidebar";


export default function Layout(
  { children }: 
  { children: React.ReactNode }) 
  {
  return (
    <div className="flex ">
      <NavSidebar />
      {children}
    </div>
  );
}
