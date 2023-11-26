package com.programming.courseservice.service;

import com.main.progamming.common.dto.SearchKeywordDto;
import com.main.progamming.common.error.exception.ResourceNotFoundException;
import com.main.progamming.common.model.BaseMapper;
import com.main.progamming.common.repository.BaseRepository;
import com.main.progamming.common.response.DataResponse;
import com.main.progamming.common.response.ResponseMapper;
import com.main.progamming.common.service.BaseServiceImpl;
import com.programming.courseservice.domain.dto.CourseProgressDto;
import com.programming.courseservice.domain.mapper.CourseProgressMapper;
import com.programming.courseservice.domain.persistent.entity.CourseProgress;
import com.programming.courseservice.repository.CourseProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseProgressService extends BaseServiceImpl<CourseProgress, CourseProgressDto> {
    private final CourseProgressRepository courseProgressRepository;
    private final CourseProgressMapper courseProgressMapper;
    @Override
    protected BaseRepository<CourseProgress> getBaseRepository() {
        return courseProgressRepository;
    }

    @Override
    protected BaseMapper<CourseProgress, CourseProgressDto> getBaseMapper() {
        return courseProgressMapper;
    }

    @Override
    protected Page<CourseProgressDto> getPageResults(SearchKeywordDto searchKeywordDto, Pageable pageable) {
        return null;
    }

    @Override
    protected List<CourseProgressDto> getListSearchResults(String keyword) {
        return null;
    }

    public DataResponse<CourseProgressDto> getByUserIdAndCourseId(String userId, String courseId) {
        Optional<CourseProgress> courseProgressOptional = courseProgressRepository.findByUserIdAndCourseId(userId, courseId);
        if(courseProgressOptional.isPresent()) {
            return ResponseMapper.toDataResponseSuccess(courseProgressMapper.entityToDto(courseProgressOptional.get()));
        } else {
            throw new ResourceNotFoundException("Data doesn't exists");
        }
    }

    @Override
    public DataResponse<CourseProgressDto> create(CourseProgressDto dto) {
        return super.create(dto);
    }

    public DataResponse<CourseProgressDto> updateCurrentProgress(String userId, String courseId) {
        Optional<CourseProgress> courseProgressOptional = courseProgressRepository.findByUserIdAndCourseId(userId, courseId);
        if(courseProgressOptional.isPresent()) {
            CourseProgress courseProgress = courseProgressOptional.get();
            if(courseProgress.getCurrentProgress() < courseProgress.getTotalAmountOfLecture()) {
                courseProgress.setCurrentProgress(courseProgress.getCurrentProgress() + 1);
            }
            CourseProgress savedCourseProgress = courseProgressRepository.save(courseProgress);
            return ResponseMapper.toDataResponseSuccess(courseProgressMapper.entityToDto(savedCourseProgress));
        } else {
            throw new ResourceNotFoundException("Data doesn't exists");
        }
    }
}
