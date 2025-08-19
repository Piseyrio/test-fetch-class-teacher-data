import { User, Users, BookOpen } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function Page() {
    const student = await prisma.student.findMany();
    const teacher = await prisma.teacher.findMany();
    const classes = await prisma.class.findMany();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-3xl font-bold text-indigo-700 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <DashboardCard
                    title="All Students"
                    count={student.length}
                    icon={<Users className="h-10 w-10 text-blue-500" />}
                    color="bg-blue-100"
                    names={student.map(s => s.firstname)}
                />
                <DashboardCard
                    title="All Teachers"
                    count={teacher.length}
                    icon={<User className="h-10 w-10 text-green-500" />}
                    color="bg-green-100"
                    names={teacher.map(t => t.firstname)}
                />
                <DashboardCard
                    title="All Classes"
                    count={classes.length}
                    icon={<BookOpen className="h-10 w-10 text-purple-500" />}
                    color="bg-purple-100"
                    names={classes.map(c => c.name)}
                />
            </div>
        </div>
    );
}

type DashboardCardProps = {
    title: string;
    count: number;
    icon: React.ReactNode;
    color: string;
    names: string[];
};

function DashboardCard({ title, count, icon, color, names }: DashboardCardProps) {
    return (
        <div className={`rounded-xl shadow-lg p-6 flex flex-col items-center ${color}`}>
            <div className="mb-4">{icon}</div>
            <div className="text-xl font-semibold text-gray-700">{title}</div>
            <div className="text-4xl font-bold text-indigo-800 mt-2">{count}</div>
            <ul className="mt-4 w-full text-left text-gray-600 text-sm max-h-40 overflow-auto">
                {names.map((name, idx) => (
                    <li key={idx} className="truncate">{name}</li>
                ))}
            </ul>
        </div>
    );
}
