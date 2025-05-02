// src/student/student.resolver.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Student, Class, Attendance, Grade } from 'generated/prisma';
import { LoginInput } from '../dto/login-student-input';
import { RegisterStudentInput } from '../dto/register-student-input';
import { UpdateStudentInput } from '../dto/update-student-profile.dto';
import { StudentResolver } from '../student.resolver';
import { StudentService } from '../student.service';

describe('StudentResolver', () => {
  let resolver: StudentResolver;
  let service: StudentService;

  const mockStudent: Student = {
    id: faker.number.int(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    dateOfBirth: faker.date.birthdate(),
    password: faker.internet.password(),
    enrollments: [],
    grades: [],
    parentLinks: [],
  };

  const mockClass: Class = {
    id: faker.number.int(),
    name: faker.word.words(2),
    subjectId: faker.number.int(),
    subject: null as any,
    enrollments: [],
    grades: [],
  };

  const mockAttendance: Attendance = {
    id: faker.number.int(),
    date: faker.date.recent(),
    status: faker.helpers.arrayElement(['Present', 'Absent']),
    studentId: mockStudent.id,
    classId: mockClass.id,
    class: mockClass,
    student: mockStudent,
  };

  const mockGrade: Grade = {
    id: faker.number.int(),
    value: faker.number.float({ min: 0, max: 100 }),
    studentId: mockStudent.id,
    classId: mockClass.id,
    gradedAt: faker.date.recent(),
    class: mockClass,
    student: mockStudent,
  };

  const mockService = {
    register: jest.fn().mockResolvedValue(mockStudent),
    login: jest.fn().mockResolvedValue(mockStudent),
    profile: jest.fn().mockResolvedValue(mockStudent),
    getStudentClasses: jest.fn().mockResolvedValue([mockClass]),
    getStudentAttendance: jest.fn().mockResolvedValue([mockAttendance]),
    getStudentGrades: jest.fn().mockResolvedValue([mockGrade]),
    updateProfile: jest.fn().mockResolvedValue({ ...mockStudent, firstName: 'UpdatedName' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentResolver,
        {
          provide: StudentService,
          useValue: mockService,
        },
      ],
    }).compile();

    resolver = module.get<StudentResolver>(StudentResolver);
    service = module.get<StudentService>(StudentService);
  });

  it('should register a student', async () => {
    const input: RegisterStudentInput = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate(),
      password: faker.internet.password(),
    };
    const result = await resolver.registerStudent(input);
    expect(result).toEqual(mockStudent);
    expect(service.register).toHaveBeenCalledWith(input);
  });

  it('should login a student', async () => {
    const input: LoginInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const result = await resolver.loginStudent(input);
    expect(result).toEqual(mockStudent);
    expect(service.login).toHaveBeenCalledWith(input);
  });

  it('should get student profile', async () => {
    const result = await resolver.studentProfile(String(mockStudent.id));
    expect(result).toEqual(mockStudent);
    expect(service.profile).toHaveBeenCalledWith(String(mockStudent.id));
  });

  it('should return student classes', async () => {
    const result = await resolver.studentClasses(mockStudent.id);
    expect(result).toEqual([mockClass]);
    expect(service.getStudentClasses).toHaveBeenCalledWith(mockStudent.id);
  });

  it('should return student attendance', async () => {
    const result = await resolver.studentAttendance(mockStudent.id);
    expect(result).toEqual([mockAttendance]);
    expect(service.getStudentAttendance).toHaveBeenCalledWith(mockStudent.id);
  });

  it('should return student grades', async () => {
    const result = await resolver.studentGrades(mockStudent.id);
    expect(result).toEqual([mockGrade]);
    expect(service.getStudentGrades).toHaveBeenCalledWith(mockStudent.id);
  });

  it('should update student profile', async () => {
    const input: UpdateStudentInput = {
      id: mockStudent.id,
      firstName: 'UpdatedName',
    };
    const result = await resolver.updateStudentProfile(input);
    expect(result.firstName).toBe('UpdatedName');
    expect(service.updateProfile).toHaveBeenCalledWith(input);
  });
});
