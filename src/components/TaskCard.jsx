import { MoreHorizontalIcon } from 'lucide-react'

const TaskCard = ({ task }) => {
  const { title, assignee_id } = task

  // Get assignee initials (in a real app, you'd fetch user data)
  const getAssigneeInitials = (assigneeId) => {
    // This is a simplified version - in production you'd look up the actual user
    const userMap = {
      'user-1': 'JD',
      'user-2': 'JS',
      'user-3': 'MJ',
      'user-4': 'SW',
      'user-5': 'AC',
      'user-6': 'ED'
    }
    return userMap[assigneeId] || 'U'
  }

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/60 p-4 hover:shadow-soft hover:border-primary-200/60 transition-all duration-200 cursor-pointer hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900 flex-1 pr-2 leading-relaxed">
          {title}
        </h4>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110">
          <MoreHorizontalIcon className="w-3 h-3 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
      
      {assignee_id && (
        <div className="flex items-center">
          <div className="w-7 h-7 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform duration-200">
            <span className="text-xs font-semibold text-primary-700">
              {getAssigneeInitials(assignee_id)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskCard