package com.student_management_system.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentRequestDto {

	private String sname;

	private Double sfee;

	private String semail;

	private String scourse;

	private String saddress;
}
