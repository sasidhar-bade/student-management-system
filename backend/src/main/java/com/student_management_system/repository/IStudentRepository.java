package com.student_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student_management_system.entity.Student;

@Repository
public interface IStudentRepository extends JpaRepository<Student, Long> {

	boolean existsBySemail(String semail);

	List<Student> findBySnameIgnoreCase(String sname);
}
