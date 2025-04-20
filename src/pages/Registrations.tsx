
import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { isValidEmail, isValidPhone, isValidRegistrationNumber } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

const Registrations = () => {
  const { students, courses, offerings, registrations, addStudent, registerStudent, deleteRegistration } = useData();
  const { toast } = useToast();
  
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [selectedOfferingId, setSelectedOfferingId] = useState("");
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleVerifyEmail = () => {
    if (!isValidEmail(studentEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate email verification (in a real app, this would send an email)
    setIsVerifyingEmail(true);
    setTimeout(() => {
      setIsVerifyingEmail(false);
      setEmailVerified(true);
      toast({
        title: "Email Verified",
        description: "Your email has been verified successfully"
      });
    }, 1500);
  };

  const handleVerifyPhone = () => {
    if (!isValidPhone(studentPhone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate phone verification (in a real app, this would send an SMS)
    setIsVerifyingPhone(true);
    setTimeout(() => {
      setIsVerifyingPhone(false);
      setPhoneVerified(true);
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully"
      });
    }, 1500);
  };

  const validateRegistrationNumber = (regNumber: string) => {
    if (!isValidRegistrationNumber(regNumber)) {
      toast({
        title: "Invalid Registration Number",
        description: "Registration number must be at least 6 characters long and contain only uppercase letters and numbers",
        variant: "destructive"
      });
      return false;
    }
    
    const exists = students.some(s => s.registrationNumber === regNumber);
    if (exists) {
      toast({
        title: "Registration Number Taken",
        description: "This registration number is already in use",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    let currentStudentId = studentId;
    
    if (!currentStudentId && studentName && studentEmail) {
      if (!emailVerified || !phoneVerified) {
        toast({
          title: "Verification Required",
          description: "Please verify both email and phone number before registering",
          variant: "destructive"
        });
        return;
      }

      if (!validateRegistrationNumber(registrationNumber)) {
        return;
      }

      const newStudent = addStudent(studentName, studentEmail, studentPhone, registrationNumber, emailVerified, phoneVerified);
      currentStudentId = newStudent.id;
    }
    
    if (currentStudentId && selectedOfferingId) {
      registerStudent(currentStudentId, selectedOfferingId);
      
      setStudentId("");
      setStudentName("");
      setStudentEmail("");
      setStudentPhone("");
      setRegistrationNumber("");
      setSelectedOfferingId("");
      setEmailVerified(false);
      setPhoneVerified(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Student Registration Management</h1>
      
      <Card className="mb-8 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle>Register Student</CardTitle>
          <CardDescription className="text-gray-100">Register a student for a course offering.</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleRegister} className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="student" className="font-medium text-gray-700">Student</label>
              <Select onValueChange={setStudentId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {!studentId && (
              <>
                <div className="grid gap-2">
                  <label htmlFor="name" className="font-medium text-gray-700">Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    value={studentName} 
                    onChange={e => setStudentName(e.target.value)} 
                    placeholder="Student Name" 
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="registrationNumber" className="font-medium text-gray-700">Registration Number</label>
                  <Input 
                    type="text" 
                    id="registrationNumber" 
                    value={registrationNumber} 
                    onChange={e => setRegistrationNumber(e.target.value.toUpperCase())} 
                    placeholder="Registration Number (e.g., STU2024001)" 
                    required
                    className="border-gray-300 uppercase"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                  <div className="flex gap-2">
                    <Input 
                      type="email" 
                      id="email" 
                      value={studentEmail} 
                      onChange={e => setStudentEmail(e.target.value)} 
                      placeholder="Student Email" 
                      disabled={emailVerified}
                      required
                      className="border-gray-300"
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyEmail}
                      disabled={!studentEmail || emailVerified || isVerifyingEmail}
                      className={emailVerified ? "bg-green-500" : ""}
                    >
                      {emailVerified ? "Verified" : isVerifyingEmail ? "Verifying..." : "Verify Email"}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="phone" className="font-medium text-gray-700">Phone</label>
                  <div className="flex gap-2">
                    <Input 
                      type="tel" 
                      id="phone" 
                      value={studentPhone} 
                      onChange={e => setStudentPhone(e.target.value)} 
                      placeholder="Student Phone" 
                      disabled={phoneVerified}
                      required
                      className="border-gray-300"
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyPhone}
                      disabled={!studentPhone || phoneVerified || isVerifyingPhone}
                      className={phoneVerified ? "bg-green-500" : ""}
                    >
                      {phoneVerified ? "Verified" : isVerifyingPhone ? "Verifying..." : "Verify Phone"}
                    </Button>
                  </div>
                </div>
              </>
            )}
            
            <div className="grid gap-2">
              <label htmlFor="offering" className="font-medium text-gray-700">Course Offering</label>
              <Select onValueChange={setSelectedOfferingId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a course offering" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {offerings.map(offering => (
                      <SelectItem key={offering.id} value={offering.id}>
                        {offering.courseTypeName} - {offering.courseName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle>Current Registrations</CardTitle>
          <CardDescription className="text-gray-100">List of all registered students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Student</TableHead>
                <TableHead className="font-semibold">Offering</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map(registration => (
                <TableRow key={registration.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{registration.studentName}</TableCell>
                  <TableCell>{registration.offeringName}</TableCell>
                  <TableCell>{registration.createdAt ? formatDate(registration.createdAt) : "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteRegistration(registration.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registrations;
