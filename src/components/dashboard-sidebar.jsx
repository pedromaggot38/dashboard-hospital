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
import { Link, useLocation } from 'react-router-dom';

const items = [
  {
    title: 'Início',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: Users,
  },
  {
    title: 'Notícias',
    url: '/articles',
    icon: Newspaper,
  },
  {
    title: 'Médicos',
    url: '/doctors',
    icon: Stethoscope,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar({ user }) {
  const location = useLocation();

  return (
    <Sidebar variant='inset' collapsible='offcanvas'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hospital de Maracaí</SidebarGroupLabel>
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
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
