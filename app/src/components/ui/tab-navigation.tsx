import React, { useState, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface TabNavigationProps {
  initialTabName: string;
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  className?: string;
}

export function TabNavigation({
  initialTabName,
  children,
  className,
}: TabNavigationProps) {
  const [activeTabName, setActiveTabName] = useState<string>(initialTabName);

  // Validate that all children are TabSection components
  const validTabPanels = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> => {
      if (React.isValidElement(child) && child.type === Tab) {
        return true;
      }
      console.warn(
        "TabNavigation component only accepts TabSection components as children",
      );
      return false;
    },
  );

  const activeTabPanel = validTabPanels.find(
    (panel) => panel.props.tabName === activeTabName,
  );

  return (
    <div className={cn("flex gap-6", className)}>
      <TabSidebar>
        {validTabPanels.map((panel) => (
          <TabViewButton
            key={panel.props.tabName}
            isActive={activeTabName === panel.props.tabName}
            tabName={panel.props.tabName}
            onSelect={setActiveTabName}
          />
        ))}
      </TabSidebar>
      {activeTabPanel}
    </div>
  );
}

interface TabSidebarProps {
  children:
    | ReactElement<TabViewButtonProps>
    | ReactElement<TabViewButtonProps>[];
}

function TabSidebar({ children }: TabSidebarProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-sidebar p-4">
      {children}
    </div>
  );
}

interface TabViewButtonProps {
  tabName: string;
  isActive: boolean;
  onSelect: (tabName: string) => void;
}

function TabViewButton({ tabName, isActive, onSelect }: TabViewButtonProps) {
  const handleClick = () => {
    onSelect(tabName);
  };

  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-between rounded-lg p-2 text-sm font-medium text-sidebar-accent-foreground",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-accent-foreground hover:bg-sidebar-accent",
      )}
      onClick={handleClick}
    >
      {tabName}
    </button>
  );
}

interface TabProps {
  tabName: string;
  children?: React.ReactNode;
  className?: string;
}

export function Tab({ tabName, children, className }: TabProps) {
  return (
    <div className={cn("flex-1", className)}>
      <div className="mb-6 w-full space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">{tabName}</h2>
        <Separator />
      </div>
      {children}
    </div>
  );
}

Tab.displayName = "Tab";
