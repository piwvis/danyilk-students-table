// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9999' }),
    tagTypes: ['Students'],
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => `/students`,
            providesTags: ['Students'],
        }),
        addNewStudent: builder.mutation({
            query: initialStudent => ({
                url: '/addStudent',
                method: 'POST',
                // Include the entire post object as the body of the request
                body: initialStudent
            }),
            invalidatesTags: ['Students'],
        }),
        deleteAllStudents: builder.mutation({
            query: initialStudent => ({
                url: '/deleteStudents',
                method: 'DELETE',
            }),
            invalidatesTags: ['Students'],
        }),
        editStudent: builder.mutation({
            query(data) {
                console.log(data)
                const id = data._id
                const body = data
                return {
                    url: `/editStudent/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['Students'],
        }),
        deleteStudent: builder.mutation({
            query(data) {
                return {
                    url: `/deleteStudent/${data}`,
                    method: 'POST',
                    body: { _id: data},
                }
            },
            invalidatesTags: ['Students'],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetStudentsQuery, useAddNewStudentMutation, useDeleteAllStudentsMutation, useEditStudentMutation, useDeleteStudentMutation} = studentsApi