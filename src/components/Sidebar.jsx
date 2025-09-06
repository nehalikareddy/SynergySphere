import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  HomeIcon, 
  FolderIcon, 
  CheckSquareIcon, 
  LogOutIcon,
  UserIcon
} from 'lucide-react'

const Sidebar = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Projects', href: '/projects', icon: FolderIcon },
    { name: 'My Tasks', href: '/tasks', icon: CheckSquareIcon },
  ]

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200/60 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center px-6 py-5 border-b border-gray-200/60">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft transform hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-base">SS</span>
          </div>
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            SynergySphere
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-soft border-r-2 border-primary-500'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 hover:text-gray-900 hover:shadow-soft'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 transition-transform duration-200 ${
                isActive ? 'text-primary-600' : 'group-hover:scale-110'
              }`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200/60 p-4 bg-gradient-to-r from-gray-50/50 to-transparent">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-soft">
            <UserIcon className="w-5 h-5 text-gray-600" />
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.email || 'User'}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 hover:text-red-700 rounded-xl transition-all duration-200 hover:shadow-soft"
        >
          <LogOutIcon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Sidebar