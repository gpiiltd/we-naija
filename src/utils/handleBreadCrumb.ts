export const handleBreadCrumbNavigate = (path:string, label:string,navigate:(n:string)=>void) => {
    const breadCrumb = localStorage.getItem("breadcrumb");
    const addBreadCrumb = JSON.parse(breadCrumb!);
    const task = {
      path,
      label,
      active: true,
    }
    addBreadCrumb[addBreadCrumb.length - 1].active = false
    addBreadCrumb.push(task);
    localStorage.setItem("breadcrumb", JSON.stringify(addBreadCrumb));
    navigate(path);
  };