import React from 'react';
import TopAction from './TopAction';
import house from '../../res/dashboard/house.webp';
import cleaning from '../../res/dashboard/cleaning.webp';
import cogs from '../../res/dashboard/cogs.webp';
import repair from '../../res/dashboard/repair.webp';
import notes from '../../res/dashboard/post-notes.webp';
import { useNavigate } from 'react-router';

interface QuickAccessPanelProps {}

const QuickAccessPanel: React.FC<QuickAccessPanelProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2">
      <TopAction
        // https://unsplash.com/photos/PCDlE94JjcI
        img={house}
        title="Bill Splitting"
        twGradientStart="from-emerald-400"
        twGradientEnd="to-green-800"
        twOpacity="opacity-80"
        onClick={() => navigate('/bills')}
        description="Split bills with your flatmates."
      />
      <TopAction
        // https://unsplash.com/photos/SnKfmC1I9fU
        img={cleaning}
        title="Chores"
        twGradientStart="from-blue-700"
        twGradientEnd="to-green-800"
        twOpacity="opacity-80"
        description="Decide who should do what chores."
      />
      <TopAction
        // https://unsplash.com/photos/u_RiRTA_TtY
        img={cogs}
        title="Manage Flat"
        twGradientStart="from-purple-700"
        twGradientEnd="to-yellow-800"
        twOpacity="opacity-80"
        description="Manage your flat's members and settings."
      />
      <TopAction
        // https://unsplash.com/photos/Vq1FQ_uNppw
        img={notes}
        title="Notes"
        twGradientStart="from-yellow-400"
        twGradientEnd="to-red-700"
        twOpacity="opacity-80"
        description="Miscellaneous notes about your flat."
        onClick={() => navigate('/notes')}
      />
      <TopAction
        // https://unsplash.com/photos/cGXdjyP6-NU
        img={repair}
        title="Maintenance Issues"
        twGradientStart="from-blue-700"
        twGradientEnd="to-green-800"
        twOpacity="opacity-80"
        onClick={() => navigate('/issues')}
        description="Keep track of issues around the flat."
      />
    </div>
  );
};

export default QuickAccessPanel;
