"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StudentForm } from "../form/studentform";


type Option = { id: number; name: string };

export function NewStudentDialogClient() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<{classes: Option[]; teachers: Option[]} | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open || options) return;
    setLoading(true);
    fetch("/api/classes-teachers")
      .then(r => r.json())
      .then(setOptions)
      .finally(() => setLoading(false));
  }, [open, options]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>Add Student</Button></DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader><DialogTitle>Add New Student new haha</DialogTitle></DialogHeader>
        {loading && <div className="text-sm text-muted-foreground">Loading options…</div>}
        {options && <StudentForm classes={options.classes} teachers={options.teachers} />}
      </DialogContent>
    </Dialog>
  );
}
