import { BadgeInfo, LogOut, Smile, LayoutPanelLeft, SignpostBig, UserRoundCog } from 'lucide-react';


export const navLinks = [

 {
  name : 'Dashboard',
  link : '/dashboard',
  icon: <LayoutPanelLeft color='#5c5c5c' />,
 },
 {
  name : 'Habits',
  link : '/my-habits',
  icon: <Smile color='#5c5c5c'/>,
 },
 {
  name : 'Habit Trackers',
  link : '/',
  icon: <SignpostBig  color='#5c5c5c'/>,
 },
 {
  name : 'Profile',
  link : '/',
  icon: <UserRoundCog color='#5c5c5c'/>,
 },
 {
  name : 'Logout',
  link : '/',
  icon : <LogOut color='#5c5c5c'/>,
 },

]