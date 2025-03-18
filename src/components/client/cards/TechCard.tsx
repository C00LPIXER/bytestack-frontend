interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const TechCard: React.FC<TechCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md border border-gray-200 dark:border-[#fff]">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};
