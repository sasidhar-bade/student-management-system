package com.student_management_system.exceptions;

public class StudentAlreadyExistsException extends RuntimeException {

	public StudentAlreadyExistsException(String message) {

		super(message);
	}
}
