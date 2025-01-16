import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SavingsIcon from '@mui/icons-material/Savings';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DevicesIcon from '@mui/icons-material/Devices';
import CategoryIcon from '@mui/icons-material/Category';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export const habitCategories = [
 {
  cat_key: 'HEALTH_FITNESS',
  cat_name: 'Health and Fitness',
  cat_icon: <FitnessCenterIcon style={{ color: '#4CAF50' }} />,
 },
 {
  cat_key: 'PERSONAL_GROWTH',
  cat_name: 'Personal Growth and Learning',
  cat_icon: <DevicesIcon style={{ color: '#2196F3' }} />,
 },
 {
  cat_key: 'PRODUCTIVITY',
  cat_name: 'Productivity and Work',
  cat_icon: <LightbulbIcon style={{ color: 'yellowgreen' }} />,
 },
 {
  cat_key: 'MENTAL_WELLBEING',
  cat_name: 'Mental and Emotional Well-being',
  cat_icon: <SelfImprovementIcon style={{ color: '#9C27B0' }} />,
 },
 {
  cat_key: 'RELATIONSHIPS',
  cat_name: 'Relationships and Social Connections',
  cat_icon: <Diversity3Icon style={{ color: '#E91E63' }} />,
 },
 {
  cat_key: 'FINANCES',
  cat_name: 'Finances and Money Management',
  cat_icon: <SavingsIcon style={{ color: '#4CAF50' }} />,
 },
 {
  cat_key: 'SUSTAINABILITY',
  cat_name: 'Sustainability and Environment',
  cat_icon: <RecyclingIcon style={{ color: '#8BC34A' }} />,
 },
 {
  cat_key: 'OTHER',
  cat_name: 'Other',
  cat_icon: <CategoryIcon style={{ color: '#9E9E9E' }} />,
 },
];
