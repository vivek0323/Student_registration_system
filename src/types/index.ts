export interface CourseType {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Course {
  id: string;
  name: string;
  createdAt: Date;
}

export interface CourseOffering {
  id: string;
  courseId: string;
  courseTypeId: string;
  courseName?: string;
  courseTypeName?: string;
  createdAt: Date;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
}

export interface Registration {
  id: string;
  studentId: string;
  courseOfferingId: string;
  studentName?: string;
  offeringName?: string;
  createdAt: Date;
}
