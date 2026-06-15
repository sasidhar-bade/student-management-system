package com.student_management_system.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "student")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "student_id")
	private Long sid;

	@Column(name = "student_name", nullable = false)
	private String sname;

	@Column(name = "student_email", unique = true, nullable = false)
	private String semail;

	@Column(name = "student_fee")
	private Double sfee;

	@Column(name = "student_course")
	private String scourse;

	@Column(name = "student_address")
	private String saddress;

}
