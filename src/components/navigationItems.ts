import { Building2, Factory, Home, Warehouse, Map, Hammer, PaintBucket, Wrench } from 'lucide-react';

export const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '#',
    subItems: [
      { name: 'Commercial Buildings', href: '/services/commercial', icon: Building2 },
      { name: 'Pre-fabricated Buildings', href: '/services/prefab', icon: Factory },
      { name: 'Residential Villas', href: '/services/residential', icon: Home },
      { name: 'Industrial Projects', href: '/services/industrial', icon: Factory },
      { name: 'Cold Storages & Godowns', href: '/services/storage', icon: Warehouse },
      { name: 'Renovations', href: '/services/renovation', icon: Hammer },
      { name: 'Roads and Buildings', href: '/services/infrastructure', icon: Map },
      { name: 'Interior & Exterior Works', href: '/services/interior', icon: PaintBucket },
      { name: 'Welding & Engineering', href: '/services/engineering', icon: Wrench }
    ]
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' }
];
