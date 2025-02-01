import React, { useState, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface TabButtonProps {
  tabName: string;
  isActive: boolean;
  onSelect: (tabName: string) => void;
}

interface TabContainerProps {
  initialTabName: string;
  children: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
  className?: string;
}

interface TabPanelProps {
  tabName: string;
  children?: React.ReactNode;
  className?: string;
}

export function TabContainer({
  initialTabName,
  children,
  className,
}: TabContainerProps) {
  const [activeTabName, setActiveTabName] = useState<string>(initialTabName);

  // Validate that all children are TabPanel components
  const validTabPanels = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabPanelProps> => {
      if (React.isValidElement(child) && child.type === TabPanel) {
        return true;
      }
      console.warn(
        "TabContainer component only accepts TabPanel components as children",
      );
      return false;
    },
  );

  const activeTabPanel = validTabPanels.find(
    (panel) => panel.props.tabName === activeTabName,
  );

  return (
    <div className={cn("flex gap-6", className)}>
      <div className="bg-sidebar flex flex-col gap-2 rounded-lg p-4">
        {validTabPanels.map((panel) => (
          <TabButton
            key={panel.props.tabName}
            isActive={activeTabName === panel.props.tabName}
            tabName={panel.props.tabName}
            onSelect={setActiveTabName}
          />
        ))}
      </div>
      {activeTabPanel}
    </div>
  );
}

function TabButton({ tabName, isActive, onSelect }: TabButtonProps) {
  const handleClick = () => {
    onSelect(tabName);
  };

  return (
    <button
      className={cn(
        "text-sidebar-accent-foreground flex items-center justify-between rounded-lg p-2 text-sm font-medium",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "hover:bg-sidebar-accent text-sidebar-accent-foreground",
      )}
      onClick={handleClick}
    >
      {tabName}
    </button>
  );
}

export function TabPanel({ tabName, children, className }: TabPanelProps) {
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

TabPanel.displayName = "TabPanel";
