import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: '网络管理',
    items: [
      { title: '面板', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: '购买', path: paths.dashboard.two, icon: ICONS.ecommerce },
      { title: '订单', path: paths.dashboard.three, icon: ICONS.analytics },
    ],


  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'Group',
        path: paths.dashboard.group.root,
        icon: ICONS.user,
        children: [
          { title: 'My Orders', path: paths.dashboard.group.root },
          { title: 'Five', path: paths.dashboard.group.five },
          { title: 'Six', path: paths.dashboard.group.six },
        ],
      },
    ],
  },
];
