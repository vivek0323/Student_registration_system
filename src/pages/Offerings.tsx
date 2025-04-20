
import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Offerings = () => {
  const { courses, courseTypes, offerings, addOffering, updateOffering, deleteOffering } = useData();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCourseId, setEditingCourseId] = useState("");
  const [editingCourseTypeId, setEditingCourseTypeId] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourseId && selectedCourseTypeId) {
      addOffering(selectedCourseId, selectedCourseTypeId);
      setSelectedCourseId("");
      setSelectedCourseTypeId("");
      setIsAddDialogOpen(false);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId && editingCourseId && editingCourseTypeId) {
      updateOffering(editingId, editingCourseId, editingCourseTypeId);
      setEditingId(null);
      setEditingCourseId("");
      setEditingCourseTypeId("");
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteOffering(deletingId);
      setDeletingId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (id: string, courseId: string, courseTypeId: string) => {
    setEditingId(id);
    setEditingCourseId(courseId);
    setEditingCourseTypeId(courseTypeId);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Offerings</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Offering
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course Offering</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="courseType">Course Type</Label>
                <Select
                  value={selectedCourseTypeId}
                  onValueChange={setSelectedCourseTypeId}
                >
                  <SelectTrigger id="courseType">
                    <SelectValue placeholder="Select a course type" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={selectedCourseId}
                  onValueChange={setSelectedCourseId}
                >
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={!selectedCourseId || !selectedCourseTypeId}
              >
                Create Offering
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {offerings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No course offerings available. Create one!</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Type</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offerings.map((offering) => (
                <TableRow key={offering.id}>
                  <TableCell>{offering.courseTypeName}</TableCell>
                  <TableCell className="font-medium">{offering.courseName}</TableCell>
                  <TableCell>{formatDate(new Date(offering.createdAt))}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openEditDialog(
                            offering.id,
                            offering.courseId,
                            offering.courseTypeId
                          )
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(offering.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Offering</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="editCourseType">Course Type</Label>
              <Select
                value={editingCourseTypeId}
                onValueChange={setEditingCourseTypeId}
              >
                <SelectTrigger id="editCourseType">
                  <SelectValue placeholder="Select a course type" />
                </SelectTrigger>
                <SelectContent>
                  {courseTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="editCourse">Course</Label>
              <Select
                value={editingCourseId}
                onValueChange={setEditingCourseId}
              >
                <SelectTrigger id="editCourse">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!editingCourseId || !editingCourseTypeId}
            >
              Update Offering
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this course offering? This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Offerings;
