export const extractInitials = (name: string | undefined | null): string => {
    if (!name) {
      return "";
    }
    const names = name.split(" ");
    let initials = "";
    for (const n of names) {
      if (n && n.length > 0) {
        initials += n.charAt(0).toUpperCase();
      }
    }
    return initials;
  };