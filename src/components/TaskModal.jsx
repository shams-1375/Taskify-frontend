import React, { useEffect, useState, useCallback } from 'react'
import { X, PlusCircle, Save, AlignLeft, Flag, Calendar, CheckCircle } from 'lucide-react'
import { DEFAULT_TASK, baseControlClasses, priorityStyles } from '../assets/dummy'
import { toast } from 'react-toastify'


const API_BASE = 'https://taskify-backend-1-mrva.onrender.com/api/tasks'
const API_USERS = 'https://taskify-backend-1-mrva.onrender.com/api/users'


const TaskModal = ({ isOpen, onClose, taskToEdit, onSave, onLogout }) => {


  const [users, setUsers] = useState([]);
  const [taskData, setTaskData] = useState(DEFAULT_TASK)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!isOpen)
      return;
    if (taskToEdit) {
      const normalized = taskToEdit.completed === 'Yes' || taskToEdit.completed === true ? 'Yes' : 'No';
      setTaskData({
        ...DEFAULT_TASK,
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority?.toLowerCase() || 'low',
        dueDate: taskToEdit.dueDate?.split('T')[0] || '',
        completed: normalized,
        assignedTo: taskToEdit.assignedTo || '',
        id: taskToEdit._id,
      });
    }
    else {
      setTaskData(DEFAULT_TASK)
    }
    setError(null)
  }, [isOpen, taskToEdit])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  }, [])

  const getHeaders = useCallback(() => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No auth Token Found')
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (taskData.dueDate < today) {
      setError('Due date cannot be in the past.');
      return;
    }
    setLoading(true)
    setError(null)
    try {
      const isEdit = Boolean(taskData.id);
      const url = isEdit ? `${API_BASE}/${taskData.id}/gt` : `${API_BASE}/gt`;
      const resp = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...taskData,
          assignedTo: taskData.assignedTo || null
        })
      });
      if (!resp.ok) {
        if (resp.status === 401) return onLogout?.();
        const err = await resp.json();
        throw new Error(err.message || 'Failed to save task')
      }
      const saved = await resp.json();
      onSave?.(saved);
      onClose();
    }
    catch (err) {
      console.log(err)
      setError(err.message || 'An Unexpected error occurred')
    }
    finally {
      setLoading(false)
    }
  }, [taskData, today, getHeaders, onLogout, onSave, onClose])

  useEffect(() => {
    if (!isOpen) return;

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch(API_USERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [isOpen]);


  if (!isOpen) return null;

  console.log('USERS STATE:', users);


  return (
    <div className=' fixed inset-0 backdrop-blur-sm  bg-black/20 z-50 flex items-center justify-center p-4'>
      <div className='  bg-white border  border-cyan-100 rounded-xl max-w-md w-full shadow-lg relative p-6 animate-fadeIn'>
        <div className=' flex justify-between items-center mb-6'>
          <h2 className=' text-2xl font-bold  text-gray-800 flex items-center gap-2'>
            {taskData.id ? <Save className=' text-cyan-500 w-5 h-5' /> :
              <PlusCircle className=' text-cyan-500 w-5 h-5' />}
            {taskData.id ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className=' p-2  hover:bg-cyan-100 rounded-lg transition-colors  text-gray-500  hover:text-cyan-700'>
            <X className=' w-5 h-5' />
          </button>
        </div>
        <form onSubmit={handleSubmit} className=' space-y-4'>
          {error && <div className=' text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100'>{error}</div>}
          <div>
            <label className=' block text-sm font-medium text-gray-700 mb-1'>
              Task Title
            </label>
            <div className=' flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 transition-all duration-200'>
              <input type="text" name='title' required value={taskData.title}
                onChange={handleChange} className=' w-full focus:outline-none text-sm'
                placeholder='Enter task title' />
            </div>
          </div>
          <div>
            <label className=' flex items-center gap-1 text-sm font-medium text-gray-700 mb-1'>
              <AlignLeft className=' w-4 h-4 text-cyan-500' /> Description
            </label>

            <textarea name="description" rows="3"
              onChange={handleChange} value={taskData.description}
              className={baseControlClasses} placeholder='Add details about your task' />
          </div>

          <div className=' grid grid-cols-2 gap-4'>
            <div>
              <label className=' flex items-center gap-1 text-sm font-medium text-gray-700 mb-1'>
                <Flag className=' w-4 h-4 text-cyan-500' /> Priority
              </label>
              <select name='priority' value={taskData.priority} onChange={handleChange}
                className={` ${baseControlClasses} ${priorityStyles[taskData.priority]}`}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>

              </select>
            </div>
            <div>
              <label className=' flex items-center gap-1 text-sm font-medium text-gray-700 mb-1'>
                <Calendar className=' w-4 h-4 text-cyan-500' /> Due Date
              </label>
              <input type="date" name='dueDate' required min={today} value={taskData.dueDate}
                onChange={handleChange} className={baseControlClasses} />
            </div>
          </div>
          <div>
            <label className=' flex items-center gap-1 text-sm font-medium text-gray-700 mb-2'>
              <CheckCircle className=' w-4 h-4 text-cyan-500' /> Status
            </label>
            <div className=' flex gap-4'>
              {[{ val: 'Yes', label: 'Completed' }, { val: 'No', label: 'In Progress' }].map(({ val, label }) => (
                <label key={val} className=' flex items-center'>
                  <input type='radio' name='completed' value={val} checked={taskData.completed === val}
                    onChange={handleChange} className=' h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded' />
                  <span className=' ml-2 text-sm text-gray-700'>{label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Assign To
            </label>
            <select
              name="assignedTo"
              value={taskData.assignedTo || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
             bg-white text-gray-900 text-sm 
             focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" className="text-gray-500">
                Select user
              </option>

              {users.map(user => (
                <option
                  key={user._id}
                  value={user._id}
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button type='submit' disabled={loading}
            className=' w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-md transition-all duration-200'>
            {loading ? 'Saving...' : (taskData.id ? <>
              <Save className=' w-4 h-4' /> Update Task
            </> : <>
              <PlusCircle className=' w-4 h-4' /> Create Task
            </>)}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskModal