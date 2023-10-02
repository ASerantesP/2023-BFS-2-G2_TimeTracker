import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'users', name: 'USERS', route: '/main/users', icon: 'people' },
  { id: 'projects', name: 'PROJECTS', route: '/main/projects', icon: 'people' },
  { id: 'tasks', name: 'TASKS', route: '/main/tasks', icon: 'people' },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' }
];