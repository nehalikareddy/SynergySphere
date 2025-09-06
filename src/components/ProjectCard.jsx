import { Link } from 'react-router-dom'
import { MoreHorizontalIcon } from 'lucide-react'

const ProjectCard = ({ project }) => {
  const { id, name, description, members = [], progress = 0 } = project

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 hover:shadow-soft-lg hover:border-primary-200/60 transition-all duration-300 hover:-translate-y-1 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link 
            to={`/project/${id}`}
            className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors duration-200 hover:underline decoration-primary-300 underline-offset-2"
          >
            {name}
          </Link>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110">
          <MoreHorizontalIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>

      {/* Members */}
      <div className="flex items-center mb-5">
        <div className="flex -space-x-2 hover:space-x-1 transition-all duration-300">
          {members.slice(0, 4).map((member, index) => (
            <div
              key={member.id}
              className="w-9 h-9 bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-white rounded-full flex items-center justify-center text-xs font-semibold text-primary-700 shadow-soft hover:scale-110 transition-transform duration-200 cursor-pointer"
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
        <span className="ml-4 text-sm text-gray-500 font-medium">
          {members.length} member{members.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">Progress</span>
          <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-full text-xs">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full transition-all duration-500 shadow-sm relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard