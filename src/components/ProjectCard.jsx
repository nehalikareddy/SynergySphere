import { Link } from 'react-router-dom'
import { MoreHorizontalIcon } from 'lucide-react'

const ProjectCard = ({ project }) => {
  const { id, name, description, members = [], progress = 0 } = project

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link 
            to={`/project/${id}`}
            className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
          >
            {name}
          </Link>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontalIcon className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Members */}
      <div className="flex items-center mb-4">
        <div className="flex -space-x-2">
          {members.slice(0, 4).map((member, index) => (
            <div
              key={member.id}
              className="w-8 h-8 bg-primary-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-primary-700"
              title={member.name}
            >
              {member.avatar}
            </div>
          ))}
          {members.length > 4 && (
            <div className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
              +{members.length - 4}
            </div>
          )}
        </div>
        <span className="ml-3 text-sm text-gray-500">
          {members.length} member{members.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectCard