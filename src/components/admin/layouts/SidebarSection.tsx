interface SidebarSectionProps {
  title: string;
  expanded: boolean;
  children: React.ReactNode;
}

export const SidebarSection = ({
  title,
  expanded,
  children,
}: SidebarSectionProps) => {
  return (
    <div className="mt-6 first:mt-0">
      {expanded && (
        <div className="mb-2 px-3">
          <h3
            className="text-xs uppercase font-semibold"
            style={{ color: "#A0AEC0" }}
          >
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-1 px-2">{children}</div>
    </div>
  );
};
