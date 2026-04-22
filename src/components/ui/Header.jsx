import { IoIosArrowDropleft } from "react-icons/io";
import headerImage from "../../assets/headerImage.jpg";
import { useNavigate } from "react-router-dom";

export const Header = ({ breadcrumbs }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[320px]">
      {/* Background Image */}
      <img
        src={headerImage}
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Breadcrumb Navigation */}
      <div className="absolute inset-0 flex items-end px-4 sm:px-6 md:px-8 lg:px-12 pb-4 sm:pb-6 md:pb-8">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-white flex-wrap">
          {breadcrumbs.map((breadcrumb, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 md:gap-4"
            >
              <span
                className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
                  breadcrumb.path
                    ? "cursor-pointer hover:text-secondary transition-colors"
                    : ""
                }`}
                onClick={() => breadcrumb.path && navigate(breadcrumb.path)}
              >
                {breadcrumb.label}
              </span>
              {index < breadcrumbs.length - 1 && (
                <IoIosArrowDropleft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
