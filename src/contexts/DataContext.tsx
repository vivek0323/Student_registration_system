import { createContext, useContext, useEffect, useState } from "react";
import { Course, CourseOffering, CourseType, Registration, Student } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface DataContextType {
  courseTypes: CourseType[];
  courses: Course[];
  offerings: CourseOffering[];
  students: Student[];
  registrations: Registration[];
  addCourseType: (name: string) => void;
  updateCourseType: (id: string, name: string) => void;
  deleteCourseType: (id: string) => void;
  addCourse: (name: string) => void;
  updateCourse: (id: string, name: string) => void;
  deleteCourse: (id: string) => void;
  addOffering: (courseId: string, courseTypeId: string) => void;
  updateOffering: (id: string, courseId: string, courseTypeId: string) => void;
  deleteOffering: (id: string) => void;
  addStudent: (name: string, email: string, phone: string, registrationNumber: string, emailVerified: boolean, phoneVerified: boolean) => Student;
  registerStudent: (studentId: string, courseOfferingId: string) => void;
  deleteRegistration: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

const saveToLocalStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  
  const [courseTypes, setCourseTypes] = useState<CourseType[]>(() => 
    loadFromLocalStorage("courseTypes", [
      { id: uuidv4(), name: "Individual", createdAt: new Date() },
      { id: uuidv4(), name: "Group", createdAt: new Date() },
      { id: uuidv4(), name: "Special", createdAt: new Date() }
    ])
  );
  
  const [courses, setCourses] = useState<Course[]>(() => 
    loadFromLocalStorage("courses", [
      { id: uuidv4(), name: "Hindi", createdAt: new Date() },
      { id: uuidv4(), name: "English", createdAt: new Date() },
      { id: uuidv4(), name: "Urdu", createdAt: new Date() }
    ])
  );
  
  const [offerings, setOfferings] = useState<CourseOffering[]>(() => 
    loadFromLocalStorage("offerings", [])
  );
  
  const [students, setStudents] = useState<Student[]>(() => 
    loadFromLocalStorage("students", [])
  );
  
  const [registrations, setRegistrations] = useState<Registration[]>(() => 
    loadFromLocalStorage("registrations", [])
  );
  
  useEffect(() => {
    saveToLocalStorage("courseTypes", courseTypes);
  }, [courseTypes]);
  
  useEffect(() => {
    saveToLocalStorage("courses", courses);
  }, [courses]);
  
  useEffect(() => {
    saveToLocalStorage("offerings", offerings);
  }, [offerings]);
  
  useEffect(() => {
    saveToLocalStorage("students", students);
  }, [students]);
  
  useEffect(() => {
    saveToLocalStorage("registrations", registrations);
  }, [registrations]);
  
  const addCourseType = (name: string) => {
    const newCourseType: CourseType = {
      id: uuidv4(),
      name,
      createdAt: new Date()
    };
    setCourseTypes([...courseTypes, newCourseType]);
    toast({
      title: "Course Type Added",
      description: `${name} has been added successfully.`
    });
  };
  
  const updateCourseType = (id: string, name: string) => {
    setCourseTypes(
      courseTypes.map(ct => (ct.id === id ? { ...ct, name } : ct))
    );
    toast({
      title: "Course Type Updated",
      description: `Course type has been updated to ${name}.`
    });
  };
  
  const deleteCourseType = (id: string) => {
    const isInUse = offerings.some(o => o.courseTypeId === id);
    if (isInUse) {
      toast({
        title: "Cannot Delete",
        description: "This course type is in use by one or more offerings.",
        variant: "destructive"
      });
      return;
    }
    
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
    toast({
      title: "Course Type Deleted",
      description: "Course type has been deleted successfully."
    });
  };
  
  const addCourse = (name: string) => {
    const newCourse: Course = {
      id: uuidv4(),
      name,
      createdAt: new Date()
    };
    setCourses([...courses, newCourse]);
    toast({
      title: "Course Added",
      description: `${name} has been added successfully.`
    });
  };
  
  const updateCourse = (id: string, name: string) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, name } : c)));
    
    setOfferings(
      offerings.map(o => 
        o.courseId === id ? { ...o, courseName: name } : o
      )
    );
    
    toast({
      title: "Course Updated",
      description: `Course has been updated to ${name}.`
    });
  };
  
  const deleteCourse = (id: string) => {
    const isInUse = offerings.some(o => o.courseId === id);
    if (isInUse) {
      toast({
        title: "Cannot Delete",
        description: "This course is in use by one or more offerings.",
        variant: "destructive"
      });
      return;
    }
    
    setCourses(courses.filter(c => c.id !== id));
    toast({
      title: "Course Deleted",
      description: "Course has been deleted successfully."
    });
  };
  
  const addOffering = (courseId: string, courseTypeId: string) => {
    const course = courses.find(c => c.id === courseId);
    const courseType = courseTypes.find(ct => ct.id === courseTypeId);
    
    if (!course || !courseType) {
      toast({
        title: "Error",
        description: "Course or course type not found.",
        variant: "destructive"
      });
      return;
    }
    
    const newOffering: CourseOffering = {
      id: uuidv4(),
      courseId,
      courseTypeId,
      courseName: course.name,
      courseTypeName: courseType.name,
      createdAt: new Date()
    };
    
    setOfferings([...offerings, newOffering]);
    toast({
      title: "Offering Added",
      description: `${courseType.name} - ${course.name} has been added successfully.`
    });
  };
  
  const updateOffering = (id: string, courseId: string, courseTypeId: string) => {
    const course = courses.find(c => c.id === courseId);
    const courseType = courseTypes.find(ct => ct.id === courseTypeId);
    
    if (!course || !courseType) {
      toast({
        title: "Error",
        description: "Course or course type not found.",
        variant: "destructive"
      });
      return;
    }
    
    setOfferings(
      offerings.map(o => 
        o.id === id 
          ? { 
              ...o, 
              courseId, 
              courseTypeId, 
              courseName: course.name, 
              courseTypeName: courseType.name 
            } 
          : o
      )
    );
    
    toast({
      title: "Offering Updated",
      description: `Offering has been updated successfully.`
    });
  };
  
  const deleteOffering = (id: string) => {
    const isInUse = registrations.some(r => r.courseOfferingId === id);
    if (isInUse) {
      toast({
        title: "Cannot Delete",
        description: "This offering has student registrations.",
        variant: "destructive"
      });
      return;
    }
    
    setOfferings(offerings.filter(o => o.id !== id));
    toast({
      title: "Offering Deleted",
      description: "Offering has been deleted successfully."
    });
  };
  
  const addStudent = (
    name: string, 
    email: string, 
    phone: string, 
    registrationNumber: string,
    emailVerified: boolean,
    phoneVerified: boolean
  ): Student => {
    const newStudent: Student = {
      id: uuidv4(),
      name,
      email,
      phone,
      registrationNumber,
      emailVerified,
      phoneVerified,
      createdAt: new Date()
    };
    
    setStudents([...students, newStudent]);
    toast({
      title: "Student Added",
      description: `${name} has been added successfully.`
    });
    
    return newStudent;
  };
  
  const registerStudent = (studentId: string, courseOfferingId: string) => {
    const student = students.find(s => s.id === studentId);
    const offering = offerings.find(o => o.id === courseOfferingId);
    
    if (!student || !offering) {
      toast({
        title: "Error",
        description: "Student or offering not found.",
        variant: "destructive"
      });
      return;
    }
    
    const exists = registrations.some(
      r => r.studentId === studentId && r.courseOfferingId === courseOfferingId
    );
    
    if (exists) {
      toast({
        title: "Already Registered",
        description: "This student is already registered for this offering.",
        variant: "destructive"
      });
      return;
    }
    
    const newRegistration: Registration = {
      id: uuidv4(),
      studentId,
      courseOfferingId,
      studentName: student.name,
      offeringName: `${offering.courseTypeName} - ${offering.courseName}`,
      createdAt: new Date()
    };
    
    setRegistrations([...registrations, newRegistration]);
    toast({
      title: "Registration Successful",
      description: `${student.name} has been registered for ${offering.courseTypeName} - ${offering.courseName}.`
    });
  };
  
  const deleteRegistration = (id: string) => {
    setRegistrations(registrations.filter(r => r.id !== id));
    toast({
      title: "Registration Deleted",
      description: "Registration has been deleted successfully."
    });
  };
  
  const value = {
    courseTypes,
    courses,
    offerings,
    students,
    registrations,
    addCourseType,
    updateCourseType,
    deleteCourseType,
    addCourse,
    updateCourse,
    deleteCourse,
    addOffering,
    updateOffering,
    deleteOffering,
    addStudent,
    registerStudent,
    deleteRegistration
  };
  
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
