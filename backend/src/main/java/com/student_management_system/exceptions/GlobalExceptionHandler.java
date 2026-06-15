package com.student_management_system.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// Handle Global Exception
	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleRunTimeException(Exception ex) {

		return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// Handle ResourceNotFoundException Exception
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {

		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}

	// Handle StudentAlreadyExistsException Exception
	@ExceptionHandler(StudentAlreadyExistsException.class)
	public ResponseEntity<String> handleStudentAlreadyExistsException(StudentAlreadyExistsException ex) {

		return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
	}
}
