// Mock data for UI development
// This data structure matches the expected Supabase table schemas

export const mockProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    owner_id: 'user-1',
    created_at: '2024-01-15T10:00:00Z',
    members: [
      { id: 'user-1', name: 'John Doe', avatar: 'JD' },
      { id: 'user-2', name: 'Jane Smith', avatar: 'JS' },
      { id: 'user-3', name: 'Mike Johnson', avatar: 'MJ' }
    ],
    progress: 65
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native iOS and Android app for customer engagement',
    owner_id: 'user-1',
    created_at: '2024-01-20T14:30:00Z',
    members: [
      { id: 'user-1', name: 'John Doe', avatar: 'JD' },
      { id: 'user-4', name: 'Sarah Wilson', avatar: 'SW' }
    ],
    progress: 30
  },
  {
    id: '3',
    name: 'Database Migration',
    description: 'Migrate legacy database to modern cloud infrastructure',
    owner_id: 'user-1',
    created_at: '2024-02-01T09:15:00Z',
    members: [
      { id: 'user-1', name: 'John Doe', avatar: 'JD' },
      { id: 'user-5', name: 'Alex Chen', avatar: 'AC' },
      { id: 'user-6', name: 'Emma Davis', avatar: 'ED' }
    ],
    progress: 85
  }
]

export const mockTasks = [
  // Website Redesign tasks
  {
    id: '1',
    project_id: '1',
    title: 'Design homepage mockup',
    status: 'Done',
    assignee_id: 'user-2',
    created_at: '2024-01-16T10:00:00Z'
  },
  {
    id: '2',
    project_id: '1',
    title: 'Implement responsive navigation',
    status: 'In Progress',
    assignee_id: 'user-1',
    created_at: '2024-01-17T11:00:00Z'
  },
  {
    id: '3',
    project_id: '1',
    title: 'Set up contact form',
    status: 'To Do',
    assignee_id: 'user-3',
    created_at: '2024-01-18T09:30:00Z'
  },
  {
    id: '4',
    project_id: '1',
    title: 'Optimize images for web',
    status: 'To Do',
    assignee_id: 'user-2',
    created_at: '2024-01-19T14:00:00Z'
  },
  {
    id: '5',
    project_id: '1',
    title: 'Create about page',
    status: 'In Progress',
    assignee_id: 'user-1',
    created_at: '2024-01-20T16:00:00Z'
  },
  // Mobile App Development tasks
  {
    id: '6',
    project_id: '2',
    title: 'Set up React Native project',
    status: 'Done',
    assignee_id: 'user-1',
    created_at: '2024-01-21T10:00:00Z'
  },
  {
    id: '7',
    project_id: '2',
    title: 'Design app wireframes',
    status: 'In Progress',
    assignee_id: 'user-4',
    created_at: '2024-01-22T11:00:00Z'
  },
  {
    id: '8',
    project_id: '2',
    title: 'Implement user authentication',
    status: 'To Do',
    assignee_id: 'user-1',
    created_at: '2024-01-23T09:00:00Z'
  }
]

export const mockUser = {
  id: 'user-1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: 'JD'
}