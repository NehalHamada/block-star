export const Divider = ({ text = "" }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-light-gray"></div>
      {text && (
        <>
          <span className="text-sm text-light-gray">{text}</span>
          <div className="flex-1 h-px bg-light-gray"></div>
        </>
      )}
    </div>
  );
};
