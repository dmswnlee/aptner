interface Tab {
  name: string;
  icon: JSX.Element;
}

export interface TabsProps {
  tabs: Tab[];
  onTabChange: (tabName: string) => void;
  activeTab: string;
}