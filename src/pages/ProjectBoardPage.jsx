import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, PlusIcon } from 'lucide-react'
import TaskCard from '../components/TaskCard'
import { mockProjects, mockTasks } from '../lib/mockData'

const ProjectBoardPage = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API calls - in production, these would fetch from Supabase
    const fetchProjectData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Find project by ID
        const foundProject = mockProjects.find(p => p.id === id)
        setProject(foundProject)
        
        // Filter tasks for this project
        const projectTasks = mockTasks.filter(task => task.project_id === id)
        setTasks(projectTasks)
      } catch (error) {
        console.error('Error fetching project data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project not found</h2>
        <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    )
  }

  // Group tasks by status
  const tasksByStatus = {
    'To Do': tasks.filter(task => task.status === 'To Do'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Done': tasks.filter(task => task.status === 'Done')
  }

  const columns = [
    { id: 'To Do', title: 'To Do', color: 'bg-gray-100' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'Done', title: 'Done', color: 'bg-green-100' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-soft"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600 hover:text-gray-900" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">{project.name}</h1>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </div>
        </div>
        <button className="group inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-soft text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-0.5">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Project Info */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 shadow-soft mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Members */}
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-700 mr-4">Team:</span>
              <div className="flex -space-x-2 hover:space-x-1 transition-all duration-300">
                {project.members.map((member) => (
                  <div
                    key={member.id}
                    className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-white rounded-full flex items-center justify-center text-xs font-semibold text-primary-700 shadow-soft hover:scale-110 transition-transform duration-200 cursor-pointer"
                    title={member.name}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-gray-700">Progress:</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 shadow-sm relative overflow-hidden"
                    style={{ width: `${project.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-full">{project.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((column) => (
          <div key={column.id} className="bg-gradient-to-b from-gray-50/80 to-gray-100/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/40 shadow-soft">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  column.id === 'To Do' ? 'bg-gray-400' :
                  column.id === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <h3 className="font-bold text-gray-900">{column.title}</h3>
                <span className="bg-white/80 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow-soft">
                  {tasksByStatus[column.id].length}
                </span>
              </div>
              <button className="p-2 hover:bg-white/60 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-soft">
                <PlusIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              {tasksByStatus[column.id].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {tasksByStatus[column.id].length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-gray-400 text-sm">∅</span>
                  </div>
                  <p className="text-sm font-medium">No tasks in {column.title.toLowerCase()}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectBoardPage