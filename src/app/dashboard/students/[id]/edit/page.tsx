// src/app/dashboard/students/[id]/edit/page.tsx
import { EditStudentForm } from "@/components/students/EditStudentForm";
import { getStudentById } from "@/lib/actions";
import { listClassesTeachersSubjects } from "@/lib/actions";



export default async function EditStudentPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const student = await getStudentById(id);
  if (!student) {
    return <div className="p-4">Student not found</div>;
  }

  const { classes, teachers,subjects } = await listClassesTeachersSubjects();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Student</h1>
      <EditStudentForm student={student} classes={classes} teachers={teachers} subjects={subjects}/>
    </div>
  );
}
