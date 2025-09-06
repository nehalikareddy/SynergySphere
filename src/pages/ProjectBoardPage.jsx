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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Project Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Members */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">Team:</span>
              <div className="flex -space-x-2">
                {project.members.map((member) => (
                  <div
                    key={member.id}
                    className="w-8 h-8 bg-primary-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-primary-700"
                    title={member.name}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Progress:</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  column.id === 'To Do' ? 'bg-gray-400' :
                  column.id === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                  {tasksByStatus[column.id].length}
                </span>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded">
                <PlusIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {tasksByStatus[column.id].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {tasksByStatus[column.id].length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
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