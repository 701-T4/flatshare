import React from 'react';
import TopAction from './TopAction';
import house from '../../res/dashboard/house.webp';
import cleaning from '../../res/dashboard/cleaning.webp';
import cogs from '../../res/dashboard/cogs.webp';
import notes from '../../res/dashboard/post-notes.webp';

interface QuickAccessPanelProps {}

const QuickAccessPanel: React.FC<QuickAccessPanelProps> = () => {
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-2 flex flex-col gap-4">
      <TopAction
        // https://unsplash.com/photos/PCDlE94JjcI
        img={house}
        title="Bill Splitting"
        twGradientStart="from-emerald-400"
        twGradientEnd="to-green-800"
        twOpacity="opacity-80"
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
      />
    </div>
  );
};

export default QuickAccessPanel;
