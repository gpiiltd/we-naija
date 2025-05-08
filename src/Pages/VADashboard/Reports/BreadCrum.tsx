import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

const Breadcrumb = () => {
  const location = useLocation();
  const [crumb, setCrumb] = useState<Record<string, string | boolean>[]>([]);

  useEffect(() => {
    const breadCrumb = localStorage.getItem("breadcrumb");
    if (breadCrumb) {
      try {
        let crumbData = JSON.parse(breadCrumb) as Record<
          string,
          string | boolean
        >[];
        const crumbIndex = crumbData.findIndex(
          (crumb) => crumb.path === location.pathname,
        );

        // If no matching path is found, return early
        if (crumbIndex === -1) {
          return;
        }

        // Slice the array up to the current path
        crumbData = crumbData.slice(0, crumbIndex + 1);

        // Only set active if we have items in the array
        if (crumbData.length > 0) {
          // Reset all items to not active
          crumbData = crumbData.map((item) => ({ ...item, active: false }));
          // Set the last item as active
          crumbData[crumbData.length - 1].active = true;
        }

        setCrumb(crumbData);
        localStorage.setItem("breadcrumb", JSON.stringify(crumbData));
      } catch (error) {
        console.error("Error processing breadcrumb:", error);
        // If there's an error parsing the breadcrumb, reset it
        localStorage.removeItem("breadcrumb");
        setCrumb([]);
      }
    }
  }, [location.pathname]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2">
        {crumb.map((items, index) => {
          return (
            <li key={index} className="flex items-center gap-1">
              <span
                className={`${
                  items.active ? "text-primary_green" : "text-dark_gray"
                }`}
              >
                {items.label}
              </span>
              {index < crumb.length - 1 && (
                <span className="text-gray-500">
                  <IoChevronForward />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
