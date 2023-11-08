package com.programming.userservice.controller;

import com.main.progamming.common.controller.BaseApiImpl;
import com.main.progamming.common.response.DataResponse;
import com.main.progamming.common.service.BaseService;
import com.programming.userservice.domain.dto.CourseAccessDto;
import com.programming.userservice.domain.persistent.entity.CourseAccess;
import com.programming.userservice.service.CourseAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/courses/course-access")
public class CourseAccessController extends BaseApiImpl<CourseAccess, CourseAccessDto> {
    private final CourseAccessService courseAccessService;
    @Override
    protected BaseService<CourseAccess, CourseAccessDto> getBaseService() {
        return courseAccessService;
    }

    @Override
    public DataResponse<String> delete(String id) {
        return super.delete(id);
    }

    @GetMapping("/has-access-to-course")
    public DataResponse<Boolean> hasAccessToCourse(@RequestParam("userId") String userId,
                                                   @RequestParam("courseId") String courseId) {
        return courseAccessService.hasAccessToCourse(userId, courseId);
    }
}
