package com.student_management_system.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.student_management_system.dtos.StudentRequestDto;
import com.student_management_system.dtos.StudentResponseDto;
import com.student_management_system.services.IStudentServices;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.PATCH, RequestMethod.DELETE,
		RequestMethod.POST })
@RequiredArgsConstructor
public class StudentContoller {

	// Service layer dependency for student operations
	private final IStudentServices studentServices;

	// Register a new student
	@PostMapping
	public ResponseEntity<StudentResponseDto> registerStudentHandler(@RequestBody StudentRequestDto requestDto) {

		StudentResponseDto registerdstudent = this.studentServices.registerStudent(requestDto);

		return new ResponseEntity<>(registerdstudent, HttpStatus.CREATED);
	}

	// Retrieve all students
	@GetMapping
	public ResponseEntity<List<StudentResponseDto>> getAllStudentsHandler() {

		List<StudentResponseDto> studentList = this.studentServices.getAllStudents();

		return new ResponseEntity<>(studentList, HttpStatus.OK);
	}

	// Retrieve a student by ID
	@GetMapping("/{id}")
	public ResponseEntity<StudentResponseDto> getStudentByIdHandler(@PathVariable Long id) {

		StudentResponseDto student = this.studentServices.getStudentById(id);

		return new ResponseEntity<>(student, HttpStatus.OK);
	}

	// Update student details using partial update (PATCH)
	@PatchMapping("/{id}")
	public ResponseEntity<StudentResponseDto> updateStudentHandler(@PathVariable Long id,
			@RequestBody StudentRequestDto requestDto) {

		StudentResponseDto updatedStudent = this.studentServices.updateStudent(id, requestDto);

		return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
	}

	// Delete a student by ID
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteStudentByIdHandler(@PathVariable Long id) {

		this.studentServices.deleteStudentById(id);

		return new ResponseEntity<>("Student with " + id + " is deleted successfully", HttpStatus.OK);
	}

	// Search students using a keyword
	@GetMapping("/search")
	public ResponseEntity<List<StudentResponseDto>> searchStudentsHandler(@RequestParam String keyword) {

		return ResponseEntity.ok(this.studentServices.searchStudents(keyword));
	}

}
