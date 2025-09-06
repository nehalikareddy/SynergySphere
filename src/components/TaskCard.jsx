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
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900 flex-1 pr-2">
          {title}
        </h4>
        <button className="p-1 hover:bg-gray-100 rounded flex-shrink-0">
          <MoreHorizontalIcon className="w-3 h-3 text-gray-400" />
        </button>
      </div>
      
      {assignee_id && (
        <div className="flex items-center">
          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary-700">
              {getAssigneeInitials(assignee_id)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskCard