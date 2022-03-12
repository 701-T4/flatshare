import React from 'react';
import TopAction from './TopAction';

interface QuickAccessPanelProps {}

const QuickAccessPanel: React.FC<QuickAccessPanelProps> = () => {
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-2 flex flex-col gap-4">
      <TopAction
        // https://unsplash.com/photos/PCDlE94JjcI
        img="https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
        title="Bill Splitting"
        twGradientStart="from-emerald-400"
        twGradientEnd="to-green-800"
        twOpacity="opacity-80"
        description="Split bills with your flatmates."
      />
      <TopAction
        // https://unsplash.com/photos/SnKfmC1I9fU
        img="https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        title="Chores"
        twGradientStart="from-blue-700"
        twGradientEnd="to-green-800"
        twOpacity="opacity-80"
        description="Decide who should do what chores."
      />
      <TopAction
        // https://unsplash.com/photos/u_RiRTA_TtY
        img="https://images.unsplash.com/photo-1582043568773-a7a2b57239f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        title="Manage Flat"
        twGradientStart="from-purple-700"
        twGradientEnd="to-yellow-800"
        twOpacity="opacity-80"
        description="Manage your flat's members and settings."
      />
      <TopAction
        // https://unsplash.com/photos/Vq1FQ_uNppw
        img="https://images.unsplash.com/photo-1580934174026-8142803ebb5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
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
