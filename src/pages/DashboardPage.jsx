import { useState, useEffect } from 'react'
import { PlusIcon } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { mockProjects } from '../lib/mockData'

const DashboardPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - in production, this would fetch from Supabase
    const fetchProjects = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        setProjects(mockProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <button className="group inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-soft text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-0.5">
          <PlusIcon className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-blue-600 font-bold text-lg">P</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-success-100 to-success-200 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-success-600 font-bold text-lg">✓</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold text-gray-900">
                {projects.filter(p => p.progress === 100).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-yellow-600 font-bold text-lg animate-bounce-gentle">⏳</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">
                {projects.filter(p => p.progress > 0 && p.progress < 100).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first project.</p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage