
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, BookText, GraduationCap, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Student Registration System</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Manage course types, courses, offerings, and student registrations efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all hover:translate-y-[-4px] group bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-blue-600">
              <BookText className="h-6 w-6" />
              <span>Course Types</span>
            </CardTitle>
            <CardDescription>Manage different types of courses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Create, edit, and delete course types like Individual, Group, and Special.</p>
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link to="/course-types">Manage Course Types</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all hover:translate-y-[-4px] group bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-blue-600">
              <BookOpen className="h-6 w-6" />
              <span>Courses</span>
            </CardTitle>
            <CardDescription>Manage available courses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Create, edit, and delete courses like Hindi, English, and Urdu.</p>
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link to="/courses">Manage Courses</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all hover:translate-y-[-4px] group bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-blue-600">
              <GraduationCap className="h-6 w-6" />
              <span>Course Offerings</span>
            </CardTitle>
            <CardDescription>Manage course offerings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Create and manage offerings by associating courses with course types.</p>
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link to="/offerings">Manage Offerings</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all hover:translate-y-[-4px] group bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-blue-600">
              <Users className="h-6 w-6" />
              <span>Student Registration</span>
            </CardTitle>
            <CardDescription>Register for courses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Register students for available course offerings and view registrations.</p>
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link to="/registrations">Student Registration</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
