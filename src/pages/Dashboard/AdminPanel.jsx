import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { getAllUsers } from "../../services/operations/adminAPI"
import {
  getAllCourses,
  deleteCourse,
} from "../../services/operations/courseDetailsAPI"

export default function AdminPanel() {
  const { token } = useSelector((state) => state.auth)
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("courses")

  const fetchData = async () => {
    setLoading(true)
    const [userData, courseData] = await Promise.all([
      getAllUsers(token),
      getAllCourses(),
    ])
    setUsers(userData)
    setCourses(courseData)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Delete this course? This cannot be undone.")) return
    await deleteCourse({ courseId }, token)
    fetchData()
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-20 text-richblack-100">
        Loading...
      </div>
    )
  }

  return (
    <div className="text-richblack-5">
      <h1 className="mb-6 text-3xl font-semibold">Admin Panel</h1>

      <div className="mb-6 flex gap-4 border-b border-richblack-700">
        <button
          className={`px-4 py-2 ${
            tab === "courses"
              ? "border-b-2 border-yellow-25 text-yellow-25"
              : "text-richblack-300"
          }`}
          onClick={() => setTab("courses")}
        >
          Courses ({courses.length})
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "users"
              ? "border-b-2 border-yellow-25 text-yellow-25"
              : "text-richblack-300"
          }`}
          onClick={() => setTab("users")}
        >
          Users ({users.length})
        </button>
      </div>

      {tab === "courses" && (
        <table className="w-full text-left text-sm">
          <thead className="text-richblack-300">
            <tr>
              <th className="pb-2">Course Name</th>
              <th className="pb-2">Instructor</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="border-t border-richblack-700">
                <td className="py-2">{course.courseName}</td>
                <td className="py-2">
                  {course.instructor?.firstName} {course.instructor?.lastName}
                </td>
                <td className="py-2">Rs. {course.price}</td>
                <td className="py-2">{course.status}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="rounded bg-pink-700 px-3 py-1 text-xs text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === "users" && (
        <table className="w-full text-left text-sm">
          <thead className="text-richblack-300">
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Account Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-richblack-700">
                <td className="py-2">
                  {u.firstName} {u.lastName}
                </td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.accountType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}