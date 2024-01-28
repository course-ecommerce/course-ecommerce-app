package com.programming.courseservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.programming.courseservice.domain.persistent.entity.Description;
import com.programming.courseservice.domain.persistent.entity.Section;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContentDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    @JsonManagedReference
    private List<SectionDto> sections;

    private DescriptionDto description;

    private CourseDto course;
}
