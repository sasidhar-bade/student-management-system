package com.student_management_system.services;

import java.util.List;

import com.student_management_system.dtos.StudentRequestDto;
import com.student_management_system.dtos.StudentResponseDto;

public interface IStudentServices {

	StudentResponseDto registerStudent(StudentRequestDto requestDto);

	StudentResponseDto getStudentById(Long studentId);

	List<StudentResponseDto> getAllStudents();

	StudentResponseDto updateStudent(Long studentId, StudentRequestDto requestDto);

	void deleteStudentById(Long StudentId);

	List<StudentResponseDto> searchStudents(String keyword);
}
