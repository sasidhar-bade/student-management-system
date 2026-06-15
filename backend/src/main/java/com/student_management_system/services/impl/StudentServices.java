package com.student_management_system.services.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student_management_system.dtos.StudentRequestDto;
import com.student_management_system.dtos.StudentResponseDto;
import com.student_management_system.entity.Student;
import com.student_management_system.exceptions.ResourceNotFoundException;
import com.student_management_system.exceptions.StudentAlreadyExistsException;
import com.student_management_system.repository.IStudentRepository;
import com.student_management_system.services.IStudentServices;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServices implements IStudentServices {

	// Repository for database operations
	private final IStudentRepository studentRepository;

	// ModelMapper for Entity <-> DTO conversion
	private final ModelMapper mapper;

	// Converts Student Entity to StudentResponseDto
	private StudentResponseDto mapToResponseDto(Student student) {

		StudentResponseDto responseDto = this.mapper.map(student, StudentResponseDto.class);

		return responseDto;
	}

	// Registers a new student
	@Override
	public StudentResponseDto registerStudent(StudentRequestDto requestDto) {

		// Check for duplicate email
		if (this.studentRepository.existsBySemail(requestDto.getSemail())) {

			throw new StudentAlreadyExistsException("Student already exists with email: " + requestDto.getSemail());
		}

		// Convert DTO to Entity
		Student student = this.mapper.map(requestDto, Student.class);

		// Save student in database
		Student savedStudent = this.studentRepository.save(student);

		return this.mapToResponseDto(savedStudent);
	}

	// Retrieves a student by ID
	@Override
	public StudentResponseDto getStudentById(Long studentId) {

		// Find student or throw exception if not found
		Student student = this.studentRepository.findById(studentId)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with id : " + studentId));

		return this.mapToResponseDto(student);
	}

	// Retrieves all students
	@Override
	public List<StudentResponseDto> getAllStudents() {

		// Fetch all students
		List<Student> students = this.studentRepository.findAll();

		// Convert Entity list to DTO list
		return students.stream().map(this::mapToResponseDto).toList();
	}

	// Updates an existing student
	@Override
	public StudentResponseDto updateStudent(Long studentId, StudentRequestDto requestDto) {

		// Find student or throw exception if not found
		Student student = this.studentRepository.findById(studentId)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with id : " + studentId));

		// Check email uniqueness if email is being changed
		if (requestDto.getSemail() != null && !requestDto.getSemail().equals(student.getSemail())
				&& this.studentRepository.existsBySemail(requestDto.getSemail())) {

			throw new StudentAlreadyExistsException("Student already exists with email: " + requestDto.getSemail());
		}

		// Map non-null DTO fields to existing entity
		this.mapper.map(requestDto, student);

		Student updatedStudent = this.studentRepository.save(student);

		return this.mapToResponseDto(updatedStudent);
	}

	// Deletes a student by ID.
	@Override
	public void deleteStudentById(Long studentId) {

		// Find student or throw exception if not found
		Student student = this.studentRepository.findById(studentId)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with id : " + studentId));

		this.studentRepository.delete(student);
	}

	// Searches students by name, email, or course.
	@Override
	public List<StudentResponseDto> searchStudents(String keyword) {

		List<Student> students = this.studentRepository.findBySnameIgnoreCase(keyword);

		return students.stream().map(this::mapToResponseDto).toList();
	}
}
