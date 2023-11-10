import { DataResponse } from "@/types/response.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import {baseQueryWithToken } from "../baseQuery";
import { url } from "inspector";
import { Course } from "@/types/course.type";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQueryWithToken,
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    uploadCourseImage: builder.mutation<DataResponse, File>({
      query: (image: File) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file", image);
        return {
          url: "/api/courses/course/images",
          method: "POST",
          body: bodyFormData,
          formData: true,
          responseHandler: "content-type"
        };
      },
    }),
    uploadCourseVideo: builder.mutation<DataResponse, File>({
      query: (video: File) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file", video);
        return {
          url: "/api/courses/course/videos",
          method: "POST",
          body: bodyFormData,
          formData: true
        };
      },
    }),
    loadFileFromCloud: builder.query<string, string>({
      query: (path: string) => {
        return {
          url: "/api/courses/course/download",
          params: {
            path: path
          },
          responseHandler: "text"
        }
      }
    }),
    createCourse: builder.mutation<DataResponse, Course>({
      query: (data: Course) => {
        return {
          url: "/api/courses/course/add",
          method: "POST",
          body: data
        }
      }
    }),
    updateCourseById: builder.mutation<DataResponse, Course>({
       query: (data: Course) => {
         return {
           url: `/api/courses/course/update/${data.id}`,
           method: "PUT",
           body:data
         }
      },
      invalidatesTags: () => [{type: "Course", id: "course"}]
     }),
    getCourseById: builder.query<DataResponse, string>({
      query: (id: string) => {
         return {
           url: `/api/courses/course/get-by-id`,
           params: {
             id: id
           }
         }
      },
      providesTags() {
        return [{type: "Course", id: "course"}]
      }
     })
  }),

});

export const {
  useLoadFileFromCloudQuery,
  useUploadCourseImageMutation,
  useUploadCourseVideoMutation,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useUpdateCourseByIdMutation
} = courseApi;
