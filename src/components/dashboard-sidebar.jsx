import { Home, Newspaper, Settings, Stethoscope, Users } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user.jsx';
import { useLocation } from 'react-router-dom';

const items = [
  {
    title: 'Início',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Usuários',
    url: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Notícias',
    url: '/dashboard/articles',
    icon: Newspaper,
  },
  {
    title: 'Médicos',
    url: '/dashboard/doctors',
    icon: Stethoscope,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar({ user }) {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size='md'
                    className='text-base [&_svg]:size-8'
                    isActive={location.pathname === item.url}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
